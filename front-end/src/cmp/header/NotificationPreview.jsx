import Bell from '../../svg/bell-icon.svg'
import { Link } from 'react-router-dom';

export function NotificationPreview({ notification, user, setNotificationMenu }) {

    return (
        <Link className='notification-link clean-link' onClick={() => {
            setNotificationMenu(false)
        }} to={notification.type === 'review' ? `/explore/${notification.gigId}` : `/dashboard/${user._id}`}>
            <div className="notification">
                <div className="notification-info">
                    <img src={Bell} alt="" />
                    <div className="paragraph">
                        <div>{notification.type === 'rejected' || notification.type === 'active' ?
                            'Check out an order with status' :
                            'Check out a'}
                            <span className='type'> {notification.type}
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