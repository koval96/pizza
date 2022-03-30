import { useContext } from "react";
import { useMutation } from "@apollo/client";
import { toast } from "react-hot-toast";

import AdminPanel from "../delivery/AdminPanel";

import { UserContext } from "../auth/AuthLayer";
import { REVOKE_TOKEN } from "../../gql/mutations/revokeToken";

function Profile() {
  const { user, setUser } = useContext(UserContext);
  const [revokeToken, { loading }] = useMutation(REVOKE_TOKEN, {
    onCompleted: (data) => {
      toast.success("Вы успешно вышли из аккаунта");
      localStorage.setItem("refreshToken", "");
      localStorage.setItem("accessToken", "");
      setUser({});
    },
    onError: (err) => {
      toast.error("Произошла ошибка");
    },
  });
  return (
    <>
      {user.isStaff && (
        <>
          <h1>Панель администратора</h1>
          <AdminPanel />
        </>
      )}
      <p
        style={{ cursor: "pointer" }}
        onClick={() =>
          revokeToken({
            variables: {
              refreshToken: localStorage.getItem("refreshToken"),
            },
          })
        }
      >
        logout
      </p>
    </>
  );
}

export default Profile;
