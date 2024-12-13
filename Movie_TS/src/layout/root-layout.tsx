import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import * as N from '../styles/components/navbarStyle';
import { IoSearch } from "react-icons/io5";
import { MdOutlineMovie } from "react-icons/md";
import api from '../api/axios-auth';
import { useQuery, useQueryClient } from 'react-query';

// 사용자 정보 타입 정의
interface UserInfo {
    email: string;
}

const RootLayout: React.FC = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    // 사용자 정보를 가져오는 함수
    const fetchUserInfo = async (): Promise<UserInfo | null> => {
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');

        if (!accessToken) return null;

        try {
            const response = await api.get<UserInfo>('/user/me', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            return response.data;
        } catch (error: any) {
            if (error.response?.status === 401 && refreshToken) {
                try {
                    const tokenResponse = await api.post<{ accessToken: string }>('/auth/refresh', { refreshToken });
                    const newAccessToken = tokenResponse.data.accessToken;
                    localStorage.setItem('accessToken', newAccessToken);

                    const retryResponse = await api.get<UserInfo>('/user/me', {
                        headers: {
                            Authorization: `Bearer ${newAccessToken}`,
                        },
                    });
                    return retryResponse.data;
                } catch (refreshError) {
                    console.error("토큰 갱신 실패:", refreshError);
                    handleLogout();
                }
            } else {
                console.error("로그인 정보 확인 실패:", error);
                handleLogout();
            }
        }
        return null;
    };

    const { data: userInfo, isLoading, isError } = useQuery<UserInfo | null>(
        ['auth', 'user'],
        fetchUserInfo,
        {
            refetchOnWindowFocus: false,
        }
    );

    const handleLogout = (): void => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        queryClient.invalidateQueries(['auth', 'user']);
        navigate('/');
        window.location.reload();
    };

    return (
        <div style={{ display: 'flex', padding: 0, margin: 0, overflowY: 'visible', backgroundColor: 'black' }}>
            <N.SideBar>
                <N.Title to="/"> YONGCHA </N.Title>
                <N.Text to="/search"><IoSearch />&nbsp; 찾기 </N.Text>
                <N.Text to="/category"><MdOutlineMovie /> &nbsp;영화 </N.Text>
            </N.SideBar>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <N.TopNavBar>
                    <div style={{ backgroundColor: 'transparent' }}>
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
                                <p style={{ padding: '0', margin: '10px' }}>
                                    {userInfo.email.split('@')[0]}님 반갑습니다
                                </p>
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
