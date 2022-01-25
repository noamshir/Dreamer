import { UserProfileImg } from "../profile/UserProfileImg"

export function OrderPreview({ order, type }) {
    const isBuyer = (type === "buyer") ? true : false;
    return (
        <section className="order-preview flex">
            <h1>id:{order._id}</h1>
            <h1>status:{order.status}</h1>
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
                <img src="" alt="" />
                <h1>{order.gig.title}</h1>
                <h1>{order.gig.price}$</h1>
            </div>
            {isBuyer && <h1>sent:{order.createdAt}</h1>}
            {!isBuyer && <h1>recived:{order.createdAt}</h1>}
        </section>

        // { (type === "buyer") }
    )
}