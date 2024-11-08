import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as N from "../styles/components/navbarStyle";
import api from '../api/axios-auth';

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        
        if (accessToken) {
            // 로그인 상태인 경우 /user/me로 이메일을 가져옵니다.
            api.get('/user/me', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then(response => {
                const email = response.data.email;
                const namePart = email.split('@')[0]; // 이메일의 '@' 앞 부분만 추출
                setUserName(namePart);
                setIsLoggedIn(true);
            })
            .catch(error => {
                console.error("유저 정보를 불러오는데 실패했습니다:", error);
                setIsLoggedIn(false);
            });
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    const handleLogout = () => {
        // 로그아웃 처리: 토큰 삭제 및 상태 업데이트
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setIsLoggedIn(false);
        setUserName('');
        navigate('/'); // 로그아웃 후 홈으로 이동
    };

    return (
        <N.TopNavBar>
            <h1>YONGCHA</h1>
            <div>
                {isLoggedIn ? (
                    <>
                        <span>{userName}님 반갑습니다</span>
                        <button className="logout" onClick={handleLogout}>로그아웃</button>
                    </>
                ) : (
                    <>
                        {/* 로그인 버튼 */}
                        <Link to="/login">
                            <button className="login">로그인</button>
                        </Link>

                        {/* 회원가입 버튼 */}
                        <Link to="/account">
                            <button className="account">회원가입</button>
                        </Link>
                    </>
                )}
            </div>
        </N.TopNavBar>
    );
};

export default Navbar;
