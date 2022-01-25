import { connect } from "react-redux";
import { useState, useEffect } from 'react';
import { UserBoard } from "../cmp/dashboard/UserBoard";
import { SellerBoard } from "../cmp/dashboard/SellerBoard";
import { setProfile, setDetails, setHome, setExplore, setBecomeSeller } from "../store/scss.action";


function _DashBoard({ currUser, setDetails, setExplore, setBecomeSeller, setProfile, setHome, isProfile }) {
    const [user, setUser] = useState(currUser);
    const [isInSeller, setIsSeller] = useState(true);
    useEffect(() => {
        onSetDashBoard();
        return () => {

        }
    }, [])
    const onSetDashBoard = () => {
        if (isProfile) return;
        setProfile(true)
        setHome(false)
        setExplore(false)
        setDetails(false)
        setBecomeSeller(false)
    }

    const switchDashboard = (isSeller) => {
        setIsSeller(isSeller);
    }
    return <section className="dashboard">
        <div className="dashboard-content">
            {(!user.sellerInfo || (!isInSeller)) && <UserBoard switchToSeller={switchDashboard} />}
            {user.sellerInfo && isInSeller && <SellerBoard switchToUser={switchDashboard} />}
        </div>
    </section>
}

function mapStateToProps({ userModule, scssModule }) {
    return {
        currUser: userModule.user,
        isProfile: scssModule.isProfile
    }
}

const mapDispatchToProps = {
    setBecomeSeller, setDetails, setExplore, setHome, setProfile
}

export const DashBoard = connect(mapStateToProps, mapDispatchToProps)(_DashBoard);