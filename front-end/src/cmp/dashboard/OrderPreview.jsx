import { NavLink } from "react-router-dom";
import { UserProfileImg } from "../profile/UserProfileImg"
export function OrderPreview({ order, type }) {
    const isBuyer = (type === "buyer") ? true : false;
    var statusClass;
    if (order.status === ("pending" || "delivered")) statusClass = "blue";
    if (order.status === ("canceled" || "rejected")) statusClass = "red";
    if (order.status = "active") statusClass = "green";
    var date = new Date(order.createdAt)
    var month = date.getUTCMonth() + 1; //months from 1-12
    var day = date.getUTCDate();
    var year = date.getUTCFullYear();
    var createdAt = year + "/" + month + "/" + day;
    return (
        <section className="order-preview flex">
            <h1>id: {order._id}</h1>
            <h1 className={statusClass}>status:{order.status}</h1>
            {isBuyer &&
                <div className="user-info flex">
                    <h5>Seller:</h5>
                    <UserProfileImg isLink={true} user={order.seller} />
                    <h1>{order.seller.username}</h1>
                </div>
            }
            {!isBuyer &&
                <div className="user-info flex">
                    <h5>Client:</h5>
                    <UserProfileImg isLink={true} user={order.buyer} />
                    <h1>{order.buyer.username}</h1>
                </div>
            }
            <div className="gig-info flex">
                <NavLink to={`/explore/${order.gig._id}`}>
                    <img src={order.gig.img} alt="" />
                </NavLink>
                <h1>{order.gig.title}</h1>
                <h1>{order.gig.price}$</h1>
            </div>
            {isBuyer && <h1>sent:{createdAt}</h1>}
            {!isBuyer && <h1>recived:{createdAt}</h1>}
        </section>

        // { (type === "buyer") }
    )
}