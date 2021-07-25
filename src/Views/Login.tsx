import { Button, Heading, Input, useToast } from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { authCall } from "../Helpers/api";
import { AuthDispatch, AuthContext } from "../Context";

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    await authCall("login", formData).then((response: any) => {
      window.localStorage.setItem("user", response.data.token);
      toast({
        status: "success",
        title: response.message,
        position: "top-right",
      });
      authDispatch(true);
      history.push("/");
    });
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
