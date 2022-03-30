import { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import PizzaImage from "../pizza/PizzaImage";
import QRCode from "qrcode";

import Loader from "../../utils/Loader";

import { GET_ORDER_BY_ID } from "../../gql/queries/getOrderById";
import { CHANGE_ORDER_STATUS } from "../../gql/mutations/changeOrderStatus";

function OrderTicket() {
  const [order, setOrder] = useState();
  const [status, setStatus] = useState();
  const { id } = useParams();
  const req = `http://piz2a.netlify.app/admin/order/${id}`;
  const [src, setSrc] = useState("");
  useEffect(() => {
    QRCode.toDataURL(req).then(setSrc);
  });

  const { loading } = useQuery(GET_ORDER_BY_ID, {
    variables: { id },
    onCompleted: (data) => {
      setOrder(data.getOrderById);
      setStatus(data.getOrderById.status);
    },
    onError: (err) => {
      console.log(err);
      toast.error("Ошибка при загрузке заказа");
    },
  });

  const [changeOrderStatus, { loading: changeStatusLoading }] = useMutation(
    CHANGE_ORDER_STATUS,
    {
      onCompleted: (data) => {
        setOrder(data.changeOrderStatus.order);
      },
      onError: (err) => {
        console.log(err);
        toast.error("Произошла ошибка при смене статуса");
      },
    }
  );

  useEffect(() => {
    if (status && status !== order.status) {
      changeOrderStatus({
        variables: {
          id,
          status,
        },
      });
    }
  }, [status]);
  return (
    <>
      <Loader loading={loading || changeStatusLoading} />
      {order && (
        <>
          <h1>Заказ {order.id}</h1>
          <div className="qr">
            <img style={{ width: "100px" }} src={src} />
          </div>
          <div className="pizza_order__card">
            <p>
              <b>Адрес:</b> {order.adress}
            </p>
            <p>
              <b>Телефон:</b> {order.phone}
            </p>
            <div>
              <p>Статус заказа:</p>
              <div
                className="size_changer__container mb-4"
                style={{ overflowX: "scroll" }}
              >
                <p
                  className={`size_changer__item ${
                    status == "готовится" ? "size_changer__item_active" : ""
                  }`}
                  onClick={() => setStatus("готовится")}
                >
                  Готовится
                </p>
                <p
                  className={`size_changer__item ms-1 ${
                    status == "доставка" ? "size_changer__item_active" : ""
                  }`}
                  onClick={() => setStatus("доставка")}
                >
                  Доставка
                </p>
                <p
                  className={`size_changer__item ms-1 ${
                    status == "доставлен" ? "size_changer__item_active" : ""
                  }`}
                  onClick={() => setStatus("доставлен")}
                >
                  Доставлен
                </p>
                <p
                  className={`size_changer__item ms-1 ${
                    status == "отменён" ? "size_changer__item_active" : ""
                  }`}
                  onClick={() => setStatus("отменён")}
                >
                  Отменён
                </p>
              </div>
              {/* <b>{order.status}</b> */}
            </div>
            {order.pizzas.map((pizza, idx) => {
              return (
                <div className="pizza_order_entity__card" key={idx}>
                  <div className="d-flex align-items-center pizza_cart__container">
                    <PizzaImage
                      ingredients={pizza.ingredients}
                      width={"120px"}
                    />
                    <div className="pizza__details ms-4 pizza_cart__container">
                      <div className="d-flex">
                        <p className="pizza__name">
                          {pizza.name !== "" ? pizza.name : "Кастомная пицца"}
                        </p>
                        <p className="pizza__size">{pizza.size}</p>
                        <p className="pizza__size ms-1">{pizza.slices}</p>
                      </div>
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
        </>
      )}
    </>
  );
}

export default OrderTicket;
