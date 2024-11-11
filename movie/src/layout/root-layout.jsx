import React, { useState, useEffect } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import * as N from '../styles/components/navbarStyle';
import { IoSearch } from "react-icons/io5";
import { MdOutlineMovie } from "react-icons/md";
import api from '../api/axios-auth';

const RootLayout = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if (accessToken) {
      api.get('/user/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(response => {
        const email = response.data.email;
        const namePart = email.split('@')[0];
        setUserName(namePart);
        setIsLoggedIn(true);
      })
      .catch(async (error) => {
        if (error.response?.status === 401 && refreshToken) {
          // 토큰이 만료된 경우 refreshToken으로 새 accessToken 요청
          try {
            const tokenResponse = await api.post('/auth/refresh', { refreshToken });
            const newAccessToken = tokenResponse.data.accessToken;
            localStorage.setItem('accessToken', newAccessToken);

            // 새로운 토큰으로 원래 요청 재시도
            const retryResponse = await api.get('/user/me', {
              headers: {
                Authorization: `Bearer ${newAccessToken}`,
              },
            });
            const email = retryResponse.data.email;
            const namePart = email.split('@')[0];
            setUserName(namePart);
            setIsLoggedIn(true);
          } catch (refreshError) {
            console.error("토큰 갱신 실패:", refreshError);
            handleLogout(); // 갱신 실패 시 로그아웃 처리
          }
        } else {
          console.error("로그인 정보 확인 실패:", error);
          setIsLoggedIn(false);
        }
      });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setIsLoggedIn(false);
    setUserName('');
    navigate('/'); // 로그아웃 후 홈으로 이동
  };

  return (
    <div style={{ display: 'flex', padding: 0, margin: 0, height: '100vh', overflowY: 'auto' }}>
      <N.SideBar>
        <N.Title to="/"> YONGCHA </N.Title>
        <N.Text to="/search"><IoSearch />&nbsp; 찾기 </N.Text>
        <N.Text to="/category"><MdOutlineMovie /> &nbsp;영화 </N.Text>
      </N.SideBar>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <N.TopNavBar>
          <div>
            {isLoggedIn ? (
              <>
                <p style={{padding: '0', margin: '10px'}}>{userName}님 반갑습니다</p>
                <N.LoginButton onClick={handleLogout}>로그아웃</N.LoginButton>
              </>
            ) : (
              <>
                <Link to="/login">
                  <N.LoginButton>로그인</N.LoginButton>
                </Link>
                <Link to="/signup">
                  <N.LoginButton className="account">회원가입</N.LoginButton>
                </Link>
              </>
            )}
          </div>
        </N.TopNavBar>
        
        <div style={{ flex: 1, margin: '70px 0 0 100px', padding: '0', overflowY: 'auto' }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default RootLayout;
