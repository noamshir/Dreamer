import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import {
    socketService,
    SOCKET_EMIT_USER_ONLINE,
    SOCKET_EMIT_USER_OFFLINE,
    SOCKET_EMIT_JOIN_IS_CONNECTED,
    SOCKET_EMIT_LEAVE
} from "../../services/socket.service";

export function UserProfileImg({ user, isLink, closeMenu, toggleMenu, setIsOnline = false }) {
    const [connectedClass, setConnectedClass] = useState('')
    useEffect(() => {
        if (!user) return;
        setSockets();
        return () => {
            socketService.emit(SOCKET_EMIT_LEAVE, user._id)
        }
    }, [user])

    const setSockets = () => {

        socketService.on(SOCKET_EMIT_USER_ONLINE, (userId) => {
            if (setIsOnline) {
                setIsOnline(true);
                setConnectedClass('connection-dot')
            }
        })
        socketService.on(SOCKET_EMIT_USER_OFFLINE, () => {
            if (setIsOnline) {
                setIsOnline(false);
                setConnectedClass('');

            }
        })

        socketService.emit(SOCKET_EMIT_JOIN_IS_CONNECTED, user._id)

    }
    if (!isLink) {
        return (
            <div className="container-user-img" onClick={() => {
                if (toggleMenu) toggleMenu();
            }}>
                {user.imgUrl ?
                    <div className="user-img" style={{ backgroundImage: `url(${user.imgUrl})` }}>
                        <div className={connectedClass}></div>
                    </div>
                    : <div className="user-img">
                        <span className="spanclass">{user.fullname.charAt(0)}</span>
                        <div className={connectedClass}></div>
                    </div>}
            </div>
        )
    }
    return (
        <Link onClick={() => {
            if (closeMenu) closeMenu();
        }} className="clean-link" to={`/profile/${user._id}`}>
            {user.imgUrl ?
                <div className="user-img" style={{ backgroundImage: `url(${user.imgUrl})` }}>
                    <div className={connectedClass}></div>
                </div>
                : <div className="user-img">
                    <span>{user.fullname.charAt(0)}</span>
                    <div className={connectedClass}></div>
                </div>}
        </Link>
    )
}
