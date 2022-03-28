import { useContext } from "react";
import { useEffect } from "react";
import { useMutation } from "@apollo/client";

import Loader from "../../utils/Loader";

import { GlobalContext } from "../../App";
import { UserContext } from "../auth/AuthLayer";
import { CHANGE_VOLUME_CART } from "../../gql/mutations/changeVolumeCart";
import { DELETE_FROM_CART } from "../../gql/mutations/deleteFromCart";

import trash from "../../static/images/trash.svg";

function PizzaCartControls({ item, counter, setCounter, items, setItems }) {
  const { user, setUser } = useContext(UserContext);
  const { setOrdersCount } = useContext(GlobalContext);

  const [changeVolumeCart, { loading: changeVolumeLoading }] = useMutation(
    CHANGE_VOLUME_CART,
    {
      onCompleted: (data) => {
        setUser({ ...user, cart: data.changeVolumeCart.cart });
      },
    }
  );

  const [deleteFromCart, { loading: deleteLoading }] = useMutation(
    DELETE_FROM_CART,
    {
      onCompleted: (data) => {
        setUser({ ...user, cart: data.deleteFromCart.cart });
      },
    }
  );

  useEffect(() => {
    if (!user.username) {
      const localStorageCart = localStorage.getItem("cart");
      if (
        JSON.parse(localStorageCart).filter((obj) => obj.id == item.id)[0]
          .volume
      ) {
        setCounter(
          JSON.parse(localStorageCart).filter((obj) => obj.id == item.id)[0]
            .volume
        );
      } else {
        setCounter(1);
        localStorage.setItem(
          "cart",
          JSON.stringify([
            ...JSON.parse(localStorageCart).filter((i) => i.id !== item.id),
            Object.assign(
              {},
              JSON.parse(localStorageCart).filter((i) => i.id == item.id)[0],
              { volume: 1 }
            ),
          ])
        );
      }
    } else {
      setCounter(item.volume);
    }
  }, [user, items]);
  useEffect(() => {
    if (!user.username) {
      const localStorageVolume = JSON.parse(
        localStorage.getItem("cart")
      ).filter((obj) => item.id == obj.id)[0].volume;
      if (
        counter == localStorageVolume + 1 ||
        counter == localStorageVolume - 1
      ) {
        localStorage.setItem(
          "cart",
          JSON.stringify([
            ...JSON.parse(localStorage.getItem("cart")).filter(
              (obj) => obj.id !== item.id
            ),
            Object.assign(
              {},
              JSON.parse(localStorage.getItem("cart")).filter(
                (obj) => obj.id == item.id
              )[0],
              { volume: counter }
            ),
          ])
        );
      }
    }
  }, [counter]);
  return (
    <>
      <Loader loading={changeVolumeLoading || deleteLoading} />
      <div className="d-flex align-items-center pizza__controls">
        <div className="me-4">
          <p className="counter__number">{140 * counter}₽</p>
        </div>
        <div className="counter d-flex me-4">
          <span
            className="counter__symbol me-2"
            onClick={() => {
              counter > 1 && setCounter(counter - 1);
              if (user.username && counter > 1) {
                changeVolumeCart({
                  variables: {
                    id: item.id,
                    username: user.username,
                    action: false
                  },
                });
              }
            }}
          >
            -
          </span>
          <span className="counter__number">{counter}</span>
          <span
            className="counter__symbol ms-2"
            onClick={() => {
              setCounter(counter + 1);
              if (user.username) {
                changeVolumeCart({
                  variables: {
                    id: item.id,
                    username: user.username,
                    action: true
                  },
                });
              }
            }}
          >
            +
          </span>
        </div>
        <img
          src={trash}
          alt=""
          width="20px"
          onClick={() => {
            setItems(items.filter((i) => i.id !== item.id));
            if (!user.username) {
              localStorage.setItem(
                "cart",
                JSON.stringify(
                  JSON.parse(localStorage.getItem("cart")).filter(
                    (obj) => obj.id !== item.id
                  )
                )
              );
              setOrdersCount(JSON.parse(localStorage.getItem("cart")).length);
            } else {
              deleteFromCart({
                variables: {
                  username: user.username,
                  id: item.id
                }
              })
            }
          }}
        />
      </div>
    </>
  );
}

export default PizzaCartControls;
