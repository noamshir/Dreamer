import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import { Link } from 'react-router-dom';

export function NotificationPreview({ notification, user, setNotificationMenu }) {


    console.log('notification', notification);
    return (
        <Link className='notification-link clean-link' onClick={() => {
            setNotificationMenu(false)
        }} to={`/dashboard/${user._id}`}>
            <div className="notification">
                <div className="notification-info">
                    <NotificationsOutlinedIcon />
                    <div className="paragraph">
                        <div>Found out about a <span className='type'>
                            {notification.type}
                        </span>
                        </div>
                        <div>That was made by <span className='username'>{notification.sender.username}</span></div>
                    </div>
                </div>
                <span className='date'>{new Date(notification.createdAt).toDateString()}</span>
            </div>
        </Link>
    )
}