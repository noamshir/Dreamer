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
        console.log("did mount...");
        setSockets();
        return () => {
            socketService.off(SOCKET_EMIT_USER_ONLINE)
            socketService.off(SOCKET_EMIT_USER_OFFLINE)
        }
    }, [])

    const setSockets = () => {
        console.log(user._id, "is listening")
        socketService.emit('isUserConnected', user._id)
        socketService.on(SOCKET_EMIT_USER_OFFLINE, (userId) => {
            console.log("user loged out...", user)
            if (setIsOnline && user?._id === userId) setIsOnline(false);
            else if (user?._id === userId) setConnectedClass('');
        })
        socketService.on('user-connection', (id) => {
            console.log(user);
            if (id === user._id) {
                if (setIsOnline) setIsOnline(true);
                setConnectedClass('connection-dot')
            }
        })
        socketService.on("find-user", (id) => {
            if (id === user._id) {
                if (setIsOnline) setIsOnline(false);
                setConnectedClass('')
            }
        })
    }
    socketService.on(SOCKET_EMIT_USER_OFFLINE, (userId) => {
        console.log("user loged outside of func...", user)
        if (setIsOnline && user?._id === userId) setIsOnline(false);
        else if (user?._id === userId) setConnectedClass('');
    })
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
