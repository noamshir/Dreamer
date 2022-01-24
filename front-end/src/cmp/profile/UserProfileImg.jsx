import React from 'react'
import { Link } from 'react-router-dom';


export function UserProfileImg({ user, isLink, closeMenu, toggleMenu }) {

    if (!isLink) {
        return (
            <div className="container-user-img" onClick={() => {
                if (toggleMenu) toggleMenu();
            }}>
                {user.imgUrl ?
                    <div className="user-img" style={{ backgroundImage: `url(${user.imgUrl})` }}></div>
                    : <div className="user-img">
                        <span>{user.fullname.charAt(0)}</span>
                    </div>}
            </div>
        )
    }
    return (
        <Link onClick={() => {
            if (closeMenu) closeMenu();
        }} className="clean-link" to={`/profile/${user._id}`}>
            {user.imgUrl ?
                <div className="user-img" style={{ backgroundImage: `url(${user.imgUrl})` }}></div>
                : <div className="user-img">
                    <span>{user.fullname.charAt(0)}</span>
                </div>}
        </Link>
    )
}