import React from 'react';
import emptyOrders from "../../svg/empty-orders.svg";
export function EmptyOrders() {
    return (
        <React.Fragment>
            <div className="empty-orders-container">
                <div className="empty-orders">
                    <img src={emptyOrders} alt="" />
                </div>
                <h3>No Orders Yet</h3>
            </div>
        </React.Fragment>
    )
}