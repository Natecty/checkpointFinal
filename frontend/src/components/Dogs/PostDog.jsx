/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { React, useEffect, useState } from "react";
import ReactModal from "react-modal";
import {
  Input,
  Checkbox,
  InputGroup,
  InputRightElement,
  Button,
  ButtonGroup,
  Stack,
} from "@chakra-ui/react";
import "./styles/PostDog.css";
import axios from "axios";
import swal from "sweetalert";
import { useParams } from "react-router-dom";
import imagePostDog from "../../assets/post-chien.jpeg";

function PostDog({ showModal, setShowModal }) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [race, setRace] = useState("");

  const id = useParams();
  const userId = id.id;

  //   const [competencesId, setCompetencesId] = useState("");

  const [competences, setCompetences] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(true);

  // const showModal = () => {
  //   setIsOpen(true);
  // };

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/competences`)
      .then((res) => setCompetences(res.data))
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !age || !race) {
      swal({
        title: "Error!",
        text: "Merci de spécifier la categorie et de publier un post",
        icon: "error",
        confirmButtonText: "parfait",
      });
    } else {
      axios
        .post(`${import.meta.env.VITE_BACKEND_URL}/dogs`, {
          name,
          age,
          race,
          userId,
        })
        .then(() =>
          swal({
            title: "Done!",
            text: `${name} a bien été enregistré`,
            icon: "success",
            confirmButtonText: "parfait",
          })
        )
        .catch((err) => {
          console.warn(err);
        });
    }
  };

  return (
    <>
      {" "}
      {showModal ? (
        <ReactModal isOpen={modalIsOpen} ariaHideApp={false}>
          <div className="postDogs">
            <div className="title-post">
              <h1>Enregistre ton chien</h1>
            </div>
            <div className="form-post-text">
              <label htmlFor="name">Son nom</label>
              <Input
                variant="filled"
                size="md"
                width="auto"
                className="inputname"
                type="text"
                name="name"
                id="name"
                placeholder="supertomate27"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <label htmlFor="age">Age</label>
              <Input
                variant="filled"
                size="md"
                width="auto"
                className="inputAge"
                type="number"
                name="age"
                id="age"
                placeholder="Âge du toutou"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />

              <label htmlFor="race">Race</label>
              <Input
                variant="filled"
                size="md"
                width="auto"
                className="inputRace"
                type="text"
                name="race"
                id="race"
                placeholder="Race du Toutou"
                value={race}
                onChange={(e) => setRace(e.target.value)}
              />
            </div>

            <div className="title-post-competence">
              <h1> Selectionnes ses compétences </h1>
            </div>
            <div className="competences-form">
              <Stack spacing={5} direction="row">
                {competences.map((competence) => (
                  <div className="competence-checkbox">
                    <Checkbox
                      type="checkbox"
                      colorScheme="orange"
                      key={competence.id}
                      name={competence.name}
                    >
                      <label htmlFor={competence.name}>
                        {" "}
                        {competence.name}{" "}
                      </label>
                    </Checkbox>
                  </div>
                ))}
              </Stack>
            </div>
            <div className="button-dog">
              <Button
                bg="#053229"
                size="md"
                color="white"
                onClick={handleSubmit}
              >
                Enregistrer votre chien
              </Button>
              <Button
                bg="#053229"
                size="md"
                color="white"
                handleSubmit={closeModal}
              >
                Annuler
              </Button>
            </div>
          </div>
        </ReactModal>
      ) : null}
    </>
  );
}
export default PostDog;
