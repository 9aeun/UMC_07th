import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import * as N from '../styles/components/navbarStyle';
import { IoSearch } from "react-icons/io5";
import { MdOutlineMovie } from "react-icons/md";
import api from '../api/axios-auth';
import { useQuery, useQueryClient } from 'react-query';

const RootLayout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const fetchUserInfo = async () => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if (!accessToken) return null;

    try {
      const response = await api.get('/user/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data; // 사용자 정보 반환
    } catch (error) {
      if (error.response?.status === 401 && refreshToken) {
        // 토큰 만료 시 refreshToken으로 새 accessToken 요청
        try {
          const tokenResponse = await api.post('/auth/refresh', { refreshToken });
          const newAccessToken = tokenResponse.data.accessToken;
          localStorage.setItem('accessToken', newAccessToken);

          // 새로운 accessToken으로 사용자 정보 재요청
          const retryResponse = await api.get('/user/me', {
            headers: {
              Authorization: `Bearer ${newAccessToken}`,
            },
          });
          return retryResponse.data;
        } catch (refreshError) {
          console.error("토큰 갱신 실패:", refreshError);
          handleLogout(); // 로그아웃 처리
        }
      } else {
        console.error("로그인 정보 확인 실패:", error);
        handleLogout();
      }
    }
  };

  const { data: userInfo, isLoading, isError } = useQuery(
    ['auth', 'user'], // queryKey를 명확하게 정의
    fetchUserInfo,
    {
      refetchOnWindowFocus: false, // 포커스 시 재요청 비활성화
    }
  );

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    queryClient.invalidateQueries(['auth', 'user']); // 사용자 정보 쿼리 무효화
    navigate('/'); // 로그아웃 후 홈으로 이동
    window.location.reload();
  };

  return (
    <div style={{ display: 'flex', padding: 0, margin: 0, overflowY: 'visible', backgroundColor: 'black'}}>
      <N.SideBar>
        <N.Title to="/"> YONGCHA </N.Title>
        <N.Text to="/search"><IoSearch />&nbsp; 찾기 </N.Text>
        <N.Text to="/category"><MdOutlineMovie /> &nbsp;영화 </N.Text>
      </N.SideBar>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <N.TopNavBar>
          <div style={{ backgroundColor: 'transpert' }}>
            {isLoading ? (
              <p>로딩 중...</p>
            ) : isError || !userInfo ? (
              <>
                <Link to="/login">
                  <N.LoginButton>로그인</N.LoginButton>
                </Link>
                <Link to="/signup">
                  <N.LoginButton className="account">회원가입</N.LoginButton>
                </Link>
              </>
            ) : (
              <>
                <p style={{ padding: '0', margin: '10px' }}>{userInfo.email.split('@')[0]}님 반갑습니다</p>
                <N.LoginButton onClick={handleLogout}>로그아웃</N.LoginButton>
              </>
            )}
          </div>
        </N.TopNavBar>
        <div style={{ backgroundColor: 'black', flex: 1, margin: '70px 0 0 100px', padding: '0', overflowY: 'auto' }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default RootLayout;
