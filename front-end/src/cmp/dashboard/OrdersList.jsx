import { OrderPreview } from "./OrderPreview"

export function OrdersList({ type, orders }) {
    return (
        <ul className="clean-list orders-list flex column">
            {orders && orders.map((order) => {
                return <li key={order._id} className="order-item flex">
                    <OrderPreview order={order} type={type}/>
                </li>
            })}
        </ul>
    )
}