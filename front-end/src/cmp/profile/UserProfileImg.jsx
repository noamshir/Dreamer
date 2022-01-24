import React from 'react'
import { Link } from 'react-router-dom';


export function UserProfileImg({ user, isLink, closeMenu }) {

    if (!isLink) {
        return (
            <React.Fragment>
                {user.imgUrl ?
                    <div className="user-img" style={{ backgroundImage: `url(${user.imgUrl})` }}></div>
                    : <div className="user-img">
                        <span>{user.fullname.charAt(0)}</span>
                    </div>}
            </React.Fragment>
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