import { orderService } from "../../services/order.service"
import { useState, useEffect } from 'react';
import { OrdersList } from "./OrdersList"
export function Orders({ user, type }) {
    const [orders, setOrders] = useState([]);
    useEffect(async () => {
        const userOrders = await orderService.query(user._id, type);
        setOrders(userOrders);
        return () => {

        }
    }, [])
    return (
        <div className="orders-section">
            <header className="orders-header">
                <h1>{user.username} orders</h1>
            </header>
            <main className="orders-content">
                <OrdersList type={type} orders={orders} />
            </main>
        </div>
    )
}