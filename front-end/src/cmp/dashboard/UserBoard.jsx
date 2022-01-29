import { connect } from "react-redux";
import React, { useState, useEffect } from 'react'


import { BoardHeader } from "./BoardHeader"
import { UserInfoCard } from "../profile/UserInfoCard"
import { Orders } from "./Orders";
import { userService } from "../../services/user.service";

function _UserBoard({ user: currUser, switchToSeller }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (!currUser) return;
        onSetUser()
    }, [currUser._id])

    async function onSetUser() {
        const userToSet = await userService.getById(currUser._id)
        setUser(userToSet);
        return userToSet;
    }

    if (!user) return <React.Fragment></React.Fragment>;
    return <section className="user-board">
        <BoardHeader switchToSeller={switchToSeller} switchTo={"Seller"} user={user} />
        <div className="user-board-content max-width-container equal-padding">
            {/* <aside className="user-aside flex">
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
            </aside> */}
            <main className="user-main">
                <UserInfoCard showSellerStats={false} user={user} />
                <Orders user={user} type={'buyer'} />
            </main>
        </div>
    </section>
}

function mapStateToProps({ userModule }) {
    return { user: userModule.user }
}

export const UserBoard = connect(mapStateToProps)(_UserBoard);