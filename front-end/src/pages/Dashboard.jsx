import { connect } from "react-redux";
import { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { UserBoard } from "../cmp/dashboard/UserBoard";
import { SellerBoard } from "../cmp/dashboard/SellerBoard";
import { setProfile, setDetails, setHome, setExplore, setBecomeSeller } from "../store/scss.action";
import { Loader } from "../cmp/utils/Loader";


function _DashBoard(props) {
    const [user, setUser] = useState(props.currUser);
    const [isInSeller, setIsSeller] = useState(true);
    useEffect(() => {
        onSetDashBoard();
    }, [])
    const onSetDashBoard = () => {
        if (props.isProfile) return;
        props.setProfile(true)
        props.setHome(false)
        props.setExplore(false)
        props.setDetails(false)
        props.setBecomeSeller(false)
    }

    const switchDashboard = (isSeller) => {
        setIsSeller(isSeller);
    }
    if (!props.currUser) {
        props.history.push('/explore')
        return <Loader />
    }
    return <section className="dashboard">
        <div className="dashboard-content">
            {(!user.sellerInfo || (!isInSeller)) ? <UserBoard switchToSeller={switchDashboard} /> : <SellerBoard switchToUser={switchDashboard} />}
            {/* // {user.sellerInfo && isInSeller && <SellerBoard switchToUser={switchDashboard} />} */}
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
    setBecomeSeller,
    setDetails,
    setExplore,
    setHome,
    setProfile,
}

const _DashBoardWithRouter = withRouter(_DashBoard)
export const DashBoard = connect(mapStateToProps, mapDispatchToProps)(_DashBoardWithRouter);