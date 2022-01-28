import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Input } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { url } from "../globalUrl";
import "./Login.css";
import nventiveLogo from "../images/nventive.jpeg";
import { message } from "antd";

export default function Login() {
  const [id, setID] = useState("");

  let history = useHistory();

  function submitHandle() {
    const data = {
      id,
    };

    fetch(url + "/login", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain",
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response["status"] === 201 || response["status"] === 200) {
          message.success("Connexion réussie!");
          return response.json();
        } else if (response["status"] === 401) {
          message.error("Votre vote a déjà été comptabilisé!");
        } else {
          message.error("L'élection est terminée!");
        }
      })
      .then((result) => {
        if (result) {
          localStorage.setItem("id", result);
          history.push("/candidates");
        }
      });
  }

  return (
    <>
      <div className="candidates__ctr place__center">
        <div className="candidates__header top__fix">
          <h1>nventive decentralized voting system</h1>
        </div>

        <div className="_center">
          <div className="form__ctr" style={{ height: "370px" }}>
            <div className="_center">
              <img className="right" src={nventiveLogo} alt="logo"></img>
            </div>
            <h2>Login</h2>

            <Input
              type="number"
              value={id}
              onChange={(e) => setID(e.target.value)}
              size="large"
              placeholder="Enter your identification number"
              prefix={<UserOutlined />}
            />
            <br />
            <Button onClick={submitHandle} type="primary">
              Sign in
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
