import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import * as N from '../styles/components/navbarStyle';
import { IoSearch } from "react-icons/io5";
import { MdOutlineMovie } from "react-icons/md";

const RootLayout = () => {
  return (
    <div style={{ display: 'flex', padding: 0, margin: 0, height: '100vh', overflowY: 'auto'}}> {/* 높이를 100vh로 설정 */}
      {/* 고정된 SideBar */}
      <N.SideBar>
        <N.Title to="/"> YONGCHA </N.Title>
        <N.Text to="/search"><IoSearch />&nbsp;  찾기 </N.Text>
        <N.Text to="/category"><MdOutlineMovie /> &nbsp;영화 </N.Text>
      </N.SideBar>

      <div style={{ flex: 1 }}> {/* flex: 1 추가 */}
        <N.TopNavBar>
          <div>
            <Link to="/login">
              <N.LoginButton>로그인</N.LoginButton>
            </Link>
            <Link to="/signup">
              <N.LoginButton className="account">회원가입</N.LoginButton>
            </Link>
          </div>
        </N.TopNavBar>
        <div style={{ paddingTop: '70px', paddingLeft: '100px'}}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default RootLayout;
