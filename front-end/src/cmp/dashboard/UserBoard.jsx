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