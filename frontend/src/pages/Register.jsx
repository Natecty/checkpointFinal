/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Input,
  InputGroup,
  InputRightElement,
  Button,
  ButtonGroup,
} from "@chakra-ui/react";
import "./styles/Register.css";
import axios from "axios";
import swal from "sweetalert";
import UserContext from "../contexts/UserContext";
import imgRegister from "../assets/register-chien.webp";

export default function Register() {
  const { initialRegister, register, setRegister } = useContext(UserContext);
  const [verifyPseudo, setVerifyPseudo] = useState(false);

  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const [showConfirmed, setShowConfirmed] = React.useState(false);
  const handleClickConfirmed = () => setShowConfirmed(!showConfirmed);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!register.pseudo || !register.password || !register.passwordverified) {
      swal({
        title: "error!",
        text: "Merci de renseigner tous les champs",
        icon: "error",
        confirmButtonText: "Parfait !!",
      });
    } else {
      axios
        .get(
          `${import.meta.env.VITE_BACKEND_URL}/users/email?email=${
            register.email
          }`
        )
        .then(() => setVerifyPseudo(true))

        .catch(() => {
          swal({
            title: "Error!",
            text: "Cet email existe déjà",
            icon: "error",
            confirmButtonText: "ok",
          });
        });
    }
    if (verifyPseudo && register.password !== register.passwordverified) {
      swal({
        title: "Error!",
        text: "Les mots de passe sont différents",
        icon: "error",
        confirmButtonText: "Match !!",
      });
    } else {
      axios
        .post(`${import.meta.env.VITE_BACKEND_URL}/users/register`, register)

        .then(() =>
          navigate("/registration/register/goodconduct", { replace: true })
        )
        .catch(() => {
          swal({
            title: "error!",
            text: "Ce email existe déjà",
            icon: "error",
            confirmButtonText: "Ok je change",
          });
        });
      setRegister(initialRegister);
    }
  };

  return (
    <div className="register">
      <div className="register-bis">
        <div className="returnbuttonpurple">
          <button
            className="button-return-purple"
            type="button"
            onClick={() => navigate(-1)}
          >
            {" "}
            retour{" "}
          </button>
          <div className="register-image-container">
            <img id="register-image" src={imgRegister} alt="register" />
          </div>
          <div className="register-title">
            <h1> Educ'Dog</h1>
            <h2>Commences l'entrainement de ton chien dès maintenant !</h2>
            <form className="form-register">
              <Input
                variant="filled"
                size="md"
                width="auto"
                className="inputpseudo"
                type="text"
                name="pseudo"
                id="pseudo"
                placeholder="Ton pseudo"
                value={register.pseudo}
                onChange={(e) =>
                  setRegister({ ...register, pseudo: e.target.value })
                }
              />
              <InputGroup size="md">
                <Input
                  pr="4.5rem"
                  variant="filled"
                  type={show ? "text" : "password"}
                  width="auto"
                  className="inputPassword"
                  name="password"
                  id="password"
                  placeholder="Mot de passe"
                  value={register.password}
                  onChange={(e) =>
                    setRegister({ ...register, password: e.target.value })
                  }
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleClick}>
                    {show ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>

              <InputGroup size="md">
                <Input
                  pr="4.5rem"
                  variant="filled"
                  type={showConfirmed ? "text" : "password"}
                  width="auto"
                  className="inputConfirmedPassword"
                  name="password"
                  id="password"
                  placeholder="Confirmation du Mot de passe"
                  value={register.password}
                  onChange={(e) =>
                    setRegister({ ...register, password: e.target.value })
                  }
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleClickConfirmed}>
                    {showConfirmed ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <div className="button-register">
                <Button
                  bg="#053229"
                  size="md"
                  color="white"
                  handleSubmit={handleSubmit}
                >
                  se connecter
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
