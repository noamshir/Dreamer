import { connect } from "react-redux"
import { BoardHeader } from "./BoardHeader"
import { Orders } from "./Orders";

function _SellerBoard({ user, switchToUser }) {
    return <section className="seller-board">
        <BoardHeader switchToUser={switchToUser} user={user} switchTo={"User"} />
        <Orders user={user} type={'seller'}/>
    </section>
}

function mapStateToProps({ userModule }) {
    return { user: userModule.user }
}

export const SellerBoard = connect(mapStateToProps)(_SellerBoard);