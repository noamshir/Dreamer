import { connect } from "react-redux"
import React, { useState, useEffect } from 'react'

import { userService } from "../../services/user.service";

import { BoardHeader } from "./BoardHeader"
import { Orders } from "./Orders";
import { UserInfoCard } from "../profile/UserInfoCard";

function _SellerBoard({ user: currUser, switchToUser }) {
    const [user, setUser] = useState(null);
    const [ordersAmount, setOrdersAmount] = useState(0);
    const [ordersSum, setOrdersSum] = useState(0);

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
    return <section className="seller-board">
        <BoardHeader switchToUser={switchToUser} user={user} switchTo={"Buyer"} />
        <div className="user-board-content max-width-container equal-padding">
            <main className="user-main">
                <UserInfoCard showSellerStats={true} user={user} />
                <div className="seller-orders-containr">
                    <div className="order-count-header">{user.username}'s Orders - <span>{ordersAmount}</span> </div>
                    <Orders setOrdersAmount={setOrdersAmount} user={user} type={'seller'} />
                </div>
            </main>
        </div>
    </section>
}

function mapStateToProps({ userModule }) {
    return { user: userModule.user }
}

export const SellerBoard = connect(mapStateToProps)(_SellerBoard);