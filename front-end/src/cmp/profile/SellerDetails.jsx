import { Link } from 'react-router-dom'

export function SellerDetails({ user }) {


    return (
        <div className="seller-details-container">
            {user.sellerInfo.sellerDesc && <div className="description-wrapper">
                <h2>Description</h2>
                <p className="description">{user.sellerInfo.sellerDesc}</p>
            </div>}
            {user.sellerInfo.skills.length && <ul className="skills clean-list">
                {user.sellerInfo.skills.map((skill, idx) => {
                    return <li key={idx}><Link className="skill clean-link" to="/explore">{skill}</Link></li>
                })}
            </ul>}
        </div>
    )
}