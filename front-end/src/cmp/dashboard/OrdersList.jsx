import { OrderPreview } from "./OrderPreview"

export function OrdersList({ type, orders, user }) {
    if (!orders.length) return <h3>No Orders yet...</h3>
    return (
        <ul className="clean-list orders-list flex column">
            {orders && orders.map((order) => {
                return <li key={order._id} className={type === 'seller' ? `order-item flex center` : 'order-item flex'}>
                    <OrderPreview order={order} type={type} user={user} />
                </li>
            })}
        </ul>
    )
}