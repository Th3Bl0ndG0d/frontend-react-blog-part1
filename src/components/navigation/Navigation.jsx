// import './Navigation.css';
// import logo from "../../assets/logo-medium.png";
//
// function Navigation() {
//     return (
//         <nav className="navigation">
//             <div className="nav-left">
//                 <img src={logo} className="nav-logo" alt="Company logo"  />
//             </div>
//             <ul className="nav-links">
//                 <li><a href="/">Home</a></li>
//                 <li><a href="/all-posts">Alle posts</a></li>
//                 <li><a href="/new-post">Nieuwe post maken</a></li>
//             </ul>
//         </nav>
//     );
// }
//
// export default Navigation;
import { NavLink } from "react-router-dom";
import './Navigation.css';
import logo from "../../assets/logo-medium.png";

function Navigation() {
    return (
        <nav className="navigation">
            <div className="nav-left">
                <img src={logo} className="nav-logo" alt="Company logo" />
            </div>
            <ul className="nav-links">
                <li>
                    <NavLink to="/" end className={({ isActive }) => isActive ? "active" : ""}>
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/AllPosts" className={({ isActive }) => isActive ? "active" : ""}>
                        Alle posts
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/NewPost" className={({ isActive }) => isActive ? "active" : ""}>
                        Nieuwe post maken
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default Navigation;
