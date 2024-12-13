import { Link } from "react-router-dom";
import * as N from "../styles/components/navbarStyle";

const Navbar: React.FC = () => {
    return (
        <N.TopNavBar>
            <h1>YONGCHA</h1>
            <div>
                <Link to="/login">
                    <button className="login">로그인</button>
                </Link>
                <Link to="/account">
                    <button className="account">회원가입</button>
                </Link>
            </div>
        </N.TopNavBar>
    );
};

export default Navbar;
