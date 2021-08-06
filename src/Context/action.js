import axios from "axios";
import { authCall } from "../Helpers/api";

    const ROOT_URL =  process.env.BASE_URL || "http://localhost:8080/api";

    export async function loginUser(dispatch, loginPayload) {
    //   const requestOptions = {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(loginPayload),
    //   };

      try {
        dispatch({ type: "REQUEST_LOGIN" });
        let response = await authCall("login", loginPayload)
        let { data } = response;
        console.log(data);

        if (data) {
          dispatch({ type: "LOGIN_SUCCESS", payload: data });
          localStorage.setItem("user", data.token);
          return data;
        }

        dispatch({ type: "LOGIN_ERROR", error: data.errors[0] });
        return;
      } catch (error) {
        dispatch({ type: "LOGIN_ERROR", error: error });
      }
    }

    export async function logout(dispatch) {
      dispatch({ type: "LOGOUT" });
      localStorage.removeItem("user");
    }