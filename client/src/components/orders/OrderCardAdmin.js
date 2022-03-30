import pizzaImg from "../../static/images/pizza.png";
// import QRCode from 'qrcode.react';
import { Link } from "react-router-dom";
import QRCode from 'qrcode';
import { isNonEmptyArray } from "@apollo/client/utilities";
// import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
function OrderCardAdmin({ order }) {
    // const router = useNavigate()
    const req = `http://localhost:3000/adminpan/order${order.id}`
    const [src, setSrc] = useState("")
    useEffect(() => {
        QRCode.toDataURL(req).then((setSrc));
    })

    return (
        <Link to={`/order/${order.id}`} style={{ textDecoration: 'none' }}>
            <div className="pizza_order__card">
                <div className="order_info">
                    <div className="contacts">
                        <p className="adress"><b>Адрес:</b> {order.adress}</p>
                        <p className="phone"><b>Телефон:</b> {order.phone}</p>
                        <p className="status"><b>Статус:</b> {order.status}</p>
                    </div>
                    <div className="qr">
                        {/* <QRCode value='1' renderAs="canvas" /> */}
                        <img style={{ width: "100px" }} src={src} />
                    </div>
                </div>
                {order.pizzas.map((pizza, idx) => {
                    return (
                        <div className="pizza_order_entity__card" key={idx}>
                            <div className="d-flex align-items-center pizza_cart__container">
                                <img src={pizzaImg} alt="pizza" width="120px" />

                                <div className="pizza__details ms-4">
                                    <p className="pizza__name">{pizza.name}</p>
                                    <p>
                                        <span>
                                            <b>Ингридиенты: </b>
                                        </span>
                                        {pizza.ingredients.map((ingredient, idx) => {
                                            return (
                                                <span key={idx}>
                                                    {ingredient.name}
                                                    {idx !== pizza.ingredients.length - 1 && ","}{" "}
                                                </span>
                                            );
                                        })}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </Link>
    );
}

export default OrderCardAdmin;
