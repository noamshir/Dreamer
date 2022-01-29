import React from "react";
import NotificationsOffOutlinedIcon from '@mui/icons-material/NotificationsOffOutlined';
import CampaignRoundedIcon from '@mui/icons-material/CampaignRounded';

import { NotificationList } from "./NotificationList";


export function NotificationMenu({ user,setNotificationMenu }) {

    return (
        <div className='notification-menu'>
            <header>
                <CampaignRoundedIcon />
                <h4>Notifications</h4>
                <span>{user?.notifications?.length ? `(${user?.notifications?.length})` : `(0)`}</span>
            </header>
            {user?.notifications ?
                <div className="main-container">
                    <NotificationList notifications={user.notifications} user={user} setNotificationMenu={setNotificationMenu} />
                </div> :
                <div className='no-notifications-msg'>
                    <NotificationsOffOutlinedIcon />
                    <h4>No Notifications</h4>
                    <span>Browse our amazing catalog of Gigs or offer your talent on Fiverr.</span>

                </div>
            }
        </div>
    )
}