import axios from "axios";

const token = window.localStorage.getItem("user");
const baseUrl: string = process.env.BASE_URL || "http://localhost:8080/api";
const authCall = (endpoint: string, data: any) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${baseUrl}/auth/${endpoint}`, JSON.stringify(data), {
        headers: { "Content-Type": "application/json" },
      })
      .then(
        (response) => {
          resolve(response.data.response);
        },
        (err) => {
          reject(err);
        }
      );
  });
};

const getCall = (endpoint: string) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${baseUrl}/${endpoint}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(
        (response) => {
          resolve(response.data.response);
        },
        (err) => {
          reject(err);
        }
      );
  });
};

const postCall = (endpoint: string, data: any) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${baseUrl}/${endpoint}`, JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(
        (response) => resolve(response.data.response),
        (err: any) => reject(err)
      );
  });
};
export { authCall, getCall, postCall };
