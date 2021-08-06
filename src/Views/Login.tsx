import { Button, Heading, Input, useToast } from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { authCall } from "../Helpers/api";
import { AuthDispatch, AuthContext } from "../Context";
import { loginUser, useAuthState, useAuthDispatch } from "../Context/index";

export default function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const authContext = useContext(AuthContext);
  const authDispatch = useContext(AuthDispatch);
  const toast = useToast();
  const history = useHistory();
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const dispatch = useAuthDispatch();
  const { loading, errorMessage } = useAuthState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // try {
    //   await loginUser(dispatch, formData);

    //   history.push("/");
    // } catch (error) {
    //   console.log(error);

    // }
    await authCall("login", formData).then(
      (response: any) => {
        console.log(response);
        if (!response.status) {
          toast({
            status: "error",
            title: response.message,
            position: "top-right",
          });
        } else {
          window.localStorage.setItem("user", response.data.token);
          authDispatch(true);
          history.push("/");
        }
      },
      (error) => {
        toast({
          status: "error",
          title: error.message,
          position: "top-right",
        });
      }
    );
  };
  return (
    <div>
      <Heading mb={6}>Login</Heading>
      <form onSubmit={handleSubmit}>
        <Input
          label="Username"
          name="username"
          type="text"
          placeholder="Username"
          variant="outlined"
          mb={3}
          onChange={handleChange}
        />
        <Input
          label="Password"
          name="password"
          type="password"
          placeholder="Password"
          variant="outlined"
          mb={6}
          onChange={handleChange}
        />
        <Button colorScheme="teal" type="submit">
          Login
        </Button>
      </form>
    </div>
  );
}
