import { useState, useEffect } from 'react';
import IOrder from '../../../models/IOrder.model';
import { api } from '../../../api/api';
import { localDateFormat } from '../../../helpers/helpers';
export interface IAdminOrderListProperties {
    filter: 'new' | 'archived';
}

export default function AdminOrderList(props: IAdminOrderListProperties) {
    const [orders, setOrders] = useState<IOrder[]>([]);

    useEffect(() => {
        api("get", "/api/order", "administrator")
            .then(res => {
                if (res.status === "ok") {
                    setOrders(res.data);
                }
            })
    }, []);

    const orderFIlter = (order: IOrder): boolean => {
        if (props.filter === "new") {
            return order.status === "pending" || order.status === "accepted";
        }

        return !(order.status === "pending" || order.status === "accepted");
    }

    function AdminOrderListRow(props: { order: IOrder }) {

        return (
            <>
                <tr>
                    <td>{props.order.orderId}</td>
                    <td>{localDateFormat(props.order.createdAt)}</td>
                    <td>{props.order.status}</td>
                </tr>
            </>
        )
    }


    return (
        <div>
            <h1 className="h3">Order list (showing {props.filter} orders)</h1>

            <table className="table table-hover table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Created At</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.filter(order => orderFIlter(order)).map(order => <AdminOrderListRow key={"order-" + order.orderId} order={order} />

                    )}
                </tbody>
            </table>
        </div>
    )
}