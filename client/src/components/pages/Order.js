import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from "@apollo/client";
import { GET_ORDER_ID } from '../../gql/queries/getOrderId';
import QRCode from 'qrcode';
const Order = () => {
    const { id } = useParams()
    const [order, setOrder] = useState()
    const { loading } = useQuery(GET_ORDER_ID, {
        onCompleted: (data) => {
            setOrder(data.getOrderId);
        },
        onError: (err) => {
            console.log(err)
        },
        variables: {
            id
        }
    });
    const req = `http://localhost:3000/adminpan/order/${id}`
    const [src, setSrc] = useState("")
    useEffect(() => {
        QRCode.toDataURL(req).then((setSrc));
    })
    return (
        <div className="pizza_order__card">
            <div className="order_info">
                <div className="contacts">
                    <p className="adress"><b>Адрес:</b> {order && order.adress}</p>
                    <p className="phone"><b>Телефон:</b> {order && order.phone}</p>
                    <p className="phone"><b>Текущий статус:</b>{order && order.status}</p>
                    <p className="status"><b>Новый статус:</b> <select>
                        <option value="cooking">Готовиться</option>
                        <option value="waiting">Ожидается</option>
                        <option value="delivery">Доставляется</option>
                    </select></p>
                </div>
                <div className="qr">
                    {/* <QRCode value='1' renderAs="canvas" /> */}
                    <img style={{ width: "100px" }} src={src} />
                </div>
            </div>
            {order && order.pizzas.map((pizza, idx) => {
                return (
                    <div className="pizza_order_entity__card" key={idx}>
                        <div className="d-flex align-items-center pizza_cart__container">
                            {/* <img src={pizzaImg} alt="pizza" width="120px" /> */}

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
            <button>
                Удалить
            </button>
            <button>
                Сохранить изменения
            </button>
            <button>
                Закрыть
            </button>
        </div>
    )
}

export default Order