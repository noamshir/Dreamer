import { UserProfileImg } from './UserProfileImg'

import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';

export function UserDetails({ user }) {
    var { createdAt } = user
    createdAt = new Date(user.createdAt)
    var month = createdAt.toLocaleString('default', { month: 'short' })
    var year = createdAt.getFullYear();

    return (
        <div className="user-details">
            <span className="online-status online">online</span>
            <UserProfileImg user={user} isLink={false} />
            <div className="fullname">{user.fullname}</div>
            <div className="user-stats-wrapper">
                <div className="user-stats">
                    {user.sellerInfo && <div className='origin'>
                        <div><LocationOnIcon /> From</div>
                        <div className='origin'> {user.sellerInfo.origin}</div>
                    </div>}
                    <div className='member-since'>
                        <div><PersonIcon /> Member since</div>
                        <div className='date'>{month} {year}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}