import { useContext } from "react";
import { useMutation } from "@apollo/client";
import { toast } from "react-hot-toast";

import { UserContext } from "../auth/AuthLayer";
import { REVOKE_TOKEN } from "../../gql/mutations/revokeToken";

function Profile() {
  const { setUser } = useContext(UserContext);
  const [revokeToken, { loading }] = useMutation(REVOKE_TOKEN, {
    onCompleted: (data) => {
      toast.success("Вы успешно вышли из аккаунта");
      setUser({});
    },
    onError: (err) => {
      toast.error("Произошла ошибка");
    },
  });
  return (
    <p
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
  );
}

export default Profile;
