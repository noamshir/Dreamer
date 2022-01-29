import { NotificationPreview } from './NotificationPreview'


export function NotificationList({ notifications, user, setNotificationMenu }) {



    return (
        <div className="notification-container">
            {notifications.map(notification => <NotificationPreview key={notification._id} user={user} notification={notification} setNotificationMenu={setNotificationMenu} />)}
        </div>
    )
}