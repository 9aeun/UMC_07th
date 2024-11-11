import { Link } from "react-router-dom";
import * as N from "../styles/components/navbarStyle";

const Navbar = () => {
    return (
        <N.TopNavBar>
            <h1>YONGCHA</h1>
            <div>
                {/* 로그인 버튼 */}
                <Link to="/login">
                    <button className="login">로그인</button>
                </Link>

                {/* 회원가입 버튼 */}
                <Link to="/account">
                    <button className="account">회원가입</button>
                </Link>
            </div>
        </N.TopNavBar>
    );
};

export default Navbar;
