import IconConfig from "../Icons/IconConfig";
import IconLogOut from "../Icons/LogOut";
import IconHome from "../Icons/IconHome";
import { Link } from "react-router-dom";
import '../Styles/Navbar.css';
export default function Navbar({company_name}) {
    const handleLogout = () => {
        localStorage.clear();
      };

  return (
    <div className="header">
        <h1>{company_name}</h1>
      <div>
        <button>
            <Link to="/home">
            <IconHome className="iconhome" color="white" width={20} height={20} />
            </Link>
        </button>
        <button>
          <Link to="/config">
            <IconConfig color="white" width={20} height={20} />
          </Link>
        </button>
        <button onClick={handleLogout}>
          <Link to="/">
            <IconLogOut
              className="iconlogout"
              color="white"
              width={20}
              height={20}
            />
          </Link>
        </button>
      </div>
    </div>
  );
}
