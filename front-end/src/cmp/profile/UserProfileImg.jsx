import React from 'react'

export function UserProfileImg({ user }) {
    console.log('user profile img', user.imgUrl);
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