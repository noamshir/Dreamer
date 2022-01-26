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

        setSockets();

        return () => {
            socketService.emit(SOCKET_EMIT_LEAVE, user._id)
            socketService.off(SOCKET_EMIT_USER_ONLINE)
            socketService.off(SOCKET_EMIT_USER_OFFLINE)
        }
    }, [])

    const setSockets = () => {
        console.log("I AM LISTENING")
        socketService.on(SOCKET_EMIT_USER_ONLINE, (userId) => {
            console.log("connection:", userId);
            if (setIsOnline) setIsOnline(true);
            else if (user?._id === userId) setConnectedClass('connection-dot')
        })
        socketService.on(SOCKET_EMIT_USER_OFFLINE, (userId) => {
            console.log("Disconnection:", userId);

            if (setIsOnline && user?._id === userId) setIsOnline(false);
            else if (user?._id === userId) setConnectedClass('');
        })
        console.log("I EMITING")

        socketService.emit(SOCKET_EMIT_JOIN_IS_CONNECTED, user._id)

    }
    if (!isLink) {
        console.log("RENDER PROFILE IMG")

        return (
            <div className="container-user-img" onClick={() => {
                if (toggleMenu) toggleMenu();
            }}>
                {user.imgUrl ?
                    <div className="user-img" style={{ backgroundImage: `url(${user.imgUrl})` }}>
                        <div className={connectedClass}></div>
                    </div>
                    : <div className="user-img">
                        <span className="spanclass">{user.username?.charAt(0)}</span>
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
                    <span>{user.username?.charAt(0)}</span>
                    <div className={connectedClass}></div>
                </div>}
        </Link>
    )
}
