import { OrderPreview } from "./OrderPreview"



export function OrdersList({ type, orders, user, loadOrders, onChangeStatus }) {

    if (!orders.length) return <h3>No Orders yet...</h3>

    return (
        // <ul className="clean-list orders-list flex column">
        <ul className="clean-list orders-list">
            {orders && orders.map((order) => {
                return <li key={order._id} className={type === 'seller' ? `order-item flex center` : 'order-item flex'}>
                    <OrderPreview order={order} type={type} loadOrders={loadOrders} user={user} onChangeStatus={onChangeStatus} />
                </li>
            })}
        </ul>
    )
}