import { connect } from "react-redux"
import { BoardHeader } from "./BoardHeader"

function _SellerBoard({ user }) {
    return <section className="seller-board">
        <BoardHeader user={user} switchTo={"User"} />
    </section>
}

function mapStateToProps({ userModule }) {
    return { user: userModule.user }
}

export const SellerBoard = connect(mapStateToProps)(_SellerBoard);