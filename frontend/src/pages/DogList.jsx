/* eslint-disable no-unused-vars */
import "./styles/DogList.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import "react-alice-carousel/lib/alice-carousel.css";
import DogItem from "../components/Dogs/DogItem";
import PostDog from "../components/Dogs/PostDog";
import NavBar from "../components/Dogs/NavBar";

export default function DogList() {
  const { id } = useParams();

  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(!showModal);
  };

  /* Ajouter ici les méthodes nécéssaires pour récupérer de la donnée du backend et la stocker dans le front */
  const [list, setList] = useState([]);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/users/${id}/dogs`)
      .then((res) => setList(res.data))
      .catch((err) => {
        console.warn(err.response.data.error);
      });
  }, []);

  return (
    <div>
      <NavBar />
      <div className="DogList">
        <div className="dog-title">
          <h1>Vos Chiens</h1>
        </div>
        <div>
          <Button bg="#053229" size="md" color="white" onClick={openModal}>
            Ajouter un chien
          </Button>
        </div>
        <div id="dog-list-container">
          <div className="dog-container">
            {list.map((el) => (
              <li key={el.id}>
                <ul>
                  <DogItem dog={el} />
                </ul>
              </li>
            ))}
          </div>
          <div className="PostModal">
            <PostDog showModal={showModal} setShowModal={setShowModal} />
          </div>
        </div>
      </div>
    </div>
  );
}
