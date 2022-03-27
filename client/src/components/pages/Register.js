import { useState } from "react";
import { useMutation } from "@apollo/client";
import toast from "react-hot-toast";
import { Link, useHistory } from "react-router-dom";

import Loader from "../../utils/Loader";
import { REGISTER } from "../../gql/mutations/register";

function Register() {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const history = useHistory();

  const [register, { loading }] = useMutation(REGISTER, {
    onCompleted: (data) => {
      toast.success("Успешная регистрация");
      history.push("/login");
    },
    onError: (error) => {
      console.log(error);
      toast.error(
        error.message == "UNIQUE constraint failed: main_extendeduser.username"
          ? "Такое имя пользователя уже существует"
          : error.message ==
            "UNIQUE constraint failed: main_extendeduser.email"
          ? "Такой email уже существует"
          : "Произошла ошибка"
      );
    },
  });

  function registrationHandler(e) {
    e.preventDefault();
  }
  return (
    <>
      <Loader loading={loading} />
      <div className="container login__container">
        <div>
          <h1>
            Добро
            <br />
            пожаловать!
          </h1>

          <form
            onSubmit={(e) => {
              registrationHandler(e);
              if (password !== confirmPassword) {
                toast.error("Пароли не совпадают");
                return;
              }
              register({
                variables: {
                  firstName,
                  lastName,
                  username,
                  password,
                  email,
                },
              });
            }}
          >
            <input
              className="default__input"
              type="text"
              placeholder="Имя"
              defaultValue={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <input
              className="default__input"
              type="text"
              placeholder="Фамилия"
              defaultValue={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
            <input
              className="default__input"
              type="text"
              placeholder="Логин"
              defaultValue={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              className="default__input"
              type="text"
              placeholder="Email"
              defaultValue={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              className="default__input"
              type="password"
              placeholder="Пароль"
              defaultValue={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              className="default__input"
              type="password"
              placeholder="Повторите пароль"
              defaultValue={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <div className="d-flex">
              <span>
                Уже есть аккаунт -{" "}
                <Link className="default__link" to={"/login"}>
                  Авторизация
                </Link>
              </span>
            </div>
            <button type="submit" className="default__btn mt-2">
              Регистрация
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
