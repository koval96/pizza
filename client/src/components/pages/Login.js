import { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { TOKEN_AUTH } from "../../gql/mutations/tokenAuth";
import { useHistory } from "react-router-dom";
import { toast } from "react-hot-toast";

import Loader from "../../utils/Loader";
import { UserContext } from "../auth/AuthLayer";
import "../../static/css/auth.css";

function Login() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const {
    user,
    setUser,
    loading: userLoading,
    infoLoading: userInfoLoading,
  } = useContext(UserContext);

  useEffect(() => {
    if (user.firstName || user.firstName == "") {
      history.push(from);
    }
  });

  const [tokenAuth, { loading }] = useMutation(TOKEN_AUTH, {
    onCompleted: (data) => {
      localStorage.setItem("accessToken", data.tokenAuth.token);
      localStorage.setItem("refreshToken", data.tokenAuth.refreshToken);
      setUser(data.tokenAuth.user);
      toast.success("Успешная авторизация");
      localStorage.setItem("reloaded", false);
    },
    onError: (error) => {
      console.log(error);
      toast.error(
        error.message == "Please enter valid credentials"
          ? "Введены неверные логин или пароль"
          : "Произошла ошибка"
      );
    },
  });

  function handleAuth(e) {
    e.preventDefault();
    tokenAuth({
      variables: {
        username,
        password,
      },
    });
  }
  return (
    
    <>
      <Loader loading={loading} />
    <div className="container login__container">
      
      <div>
        <h1>
          Мы тебя
          <br />
          ждали!
        </h1>

        <form onSubmit={(e) => handleAuth(e)}>
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
            type="password"
            placeholder="Пароль"
            defaultValue={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="d-flex">
            <span>
              Нет аккаунта -{" "}
              <Link className="default__link" to={"/register"}>
                Регистрация
              </Link>
            </span>
          </div>
          <button type="submit" className="default__btn mt-2">
            Войти
          </button>
        </form>
      </div>
    </div>
    </>
  );
}

export default Login;