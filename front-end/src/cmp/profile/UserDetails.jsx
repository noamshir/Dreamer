import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';

export function UserDetails({ user }) {
    var { createdAt } = user
    createdAt = new Date(user.createdAt)
    var month = createdAt.toLocaleString('default', { month: 'short' })
    var year = createdAt.getFullYear();

    return (
        <div className="profile-details-container">
            <div>online</div>
            <div className='img-container'>{user.imgUrl ? <img src={user.imgUrl} alt="" /> : user.fullname.charAt(0)}</div>
            <div className="fullname">{user.fullname}</div>
            <div className="user-stats-wrapper">
                <div className="user-stats">
                    <div className='origin'>
                        <div><LocationOnIcon /> From</div>
                        <div className='origin'> {user.sellerInfo.origin}</div>
                    </div>
                    <div className='member-since'>
                        <div><PersonIcon /> Member since</div>
                        <div className='date'>{month} {year}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}