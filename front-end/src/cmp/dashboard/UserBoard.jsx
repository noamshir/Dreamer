import { connect } from "react-redux";
import { BoardHeader } from "./BoardHeader"
import { UserProfileImg } from "../profile/UserProfileImg"
import { Logo } from "../Logo";
import img from "../../svg/photo.jpg"
function _UserBoard({ user }) {

    return <section className="user-board">
        <BoardHeader switchTo={"Seller"} user={user} />
        <div className="user-board-content max-width-container equal-padding flex">
            <aside className="user-aside flex">
                <div className="small-user-profile flex">
                    <UserProfileImg user={user} isLink={true} />
                    <div className="profile-actions">
                        <ul className="clean-list flex column">
                            <li>View My Sellers</li>
                            <li>Edit Profile</li>
                            {!user.sellerInfo && <li>Start Selling</li>}
                        </ul>
                    </div>
                </div>
                <div className="aside-info flex column">
                    <div className="dimerr-logo">
                        <Logo />
                    </div>
                    <h5>Freelance your mind...</h5>
                    <img src={img} alt="" />
                    <button className="btn">Join Us</button>
                </div>
            </aside>
            <main></main>
        </div>
    </section>
}

function mapStateToProps({ userModule }) {
    return { user: userModule.user }
}

export const UserBoard = connect(mapStateToProps)(_UserBoard);