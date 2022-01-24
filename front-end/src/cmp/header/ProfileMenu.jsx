import { NavLink } from "react-router-dom"


export function ProfileMenu({ onLogout, user, closeMenu }) {
    console.log("renderrr.")
    return <aside className="profile-menu">
        <div className="menu-pointer"></div>
        <ul className="clean-list">
            <li className="menu-item" onClick={() => closeMenu()}><NavLink className="clean-link" to={`/profile/${user._id}`}>Profile</NavLink></li>
            <li className="menu-item">Dashboard</li>
            <li className="menu-item logout" onClick={() => onLogout()}>Logout</li>
        </ul>
    </aside>
}