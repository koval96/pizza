import { useState, useEffect, useContext } from "react";
import { useQuery } from "@apollo/client";
import PizzaCart from "../pizza/PizzaCart";
import DeliveryForm from "../delivery/DeliveryForm";
import OrderCard from "../delivery/OrderCard";

import { GET_ALL_PIZZAS } from "../../gql/queries/getAllPizzas";
import { GET_ORDERS_ADMIN } from "../../gql/queries/getOrdersAdmin";
import "../../static/css/orderAdmin.css";
import OrderCardAdmin from "../orders/OrderCardAdmin";
import { UserContext } from "../auth/AuthLayer";

function AdminPanel() {
    const [pizzas, setPizzas] = useState();
    const [items, setItems] = useState();
    const [orders, setOrders] = useState();
    const { user } = useContext(UserContext);
    const { loading } = useQuery(GET_ORDERS_ADMIN, {
        onCompleted: (data) => {
            setOrders(data.getOrdersAdmin);
        },
        onError: (err) => {
            console.log(err)
        }
    });
    console.log(orders)
    return (
        <div className="cart">
            <h1 className="mt-4">Заказы</h1>
            {orders && orders.length == 0 && <p>Заказов нет</p>}

            {orders && orders.map((order, idx) => {
                return (
                    <OrderCardAdmin order={order} key={idx} />
                )
            })}
        </div>
    );
}

export default AdminPanel;
