/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import swal from "sweetalert";
import axios from "axios";
import {
  Input,
  InputGroup,
  InputRightElement,
  Button,
  ButtonGroup,
} from "@chakra-ui/react";
import { useNavigate, Link } from "react-router-dom";
import "./styles/Login.css";
import Welcome from "../components/Login/Welcome";

function Login() {
  const [pseudo, setPseudo] = useState("");
  const [password, setPassword] = useState("");

  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!pseudo || !password) {
      swal({
        title: "Error!",
        text: "Merci de renseigner votre pseudo ET votre email",
        icon: "error",
        confirmButtonText: "Cool",
      });
    } else {
      axios
        .post(
          `${import.meta.env.VITE_BACKEND_URL}/users/login`,
          { pseudo, password },
          { withCredentials: true }
        )
        .then(() => navigate("/connection/bonjour", { replace: true }))
        .catch((err) => {
          console.error(err);
        });
    }
  };
  return (
    <div className="login">
      <div className="login-bis">
        <Welcome />
        <div className="formlogin">
          <form className="form-login">
            <Input
              variant="filled"
              size="md"
              width="auto"
              className="inputPseudo"
              type="text"
              name="pseudo"
              id="pseudo"
              placeholder="supertomate27"
              value={pseudo}
              onChange={(e) => setPseudo(e.target.value)}
            />
            <InputGroup size="md">
              <Input
                pr="4.5rem"
                variant="filled"
                type={show ? "text" : "password"}
                width="auto"
                className="inputLogPassword"
                name="password"
                id="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
            <Button bg="#053229" size="md" color="white">
              <Link to="/users/1/dogs">se connecter</Link>
            </Button>
            <div className="go-register">
              <p>
                Tu n'as pas encore de compte ?
                <span id="go-register-button">
                  <Link to="/register">Commences ici !</Link>
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
