import React from "react";
import "./styles/Welcome.css";
import imgAccueil from "../../assets/accueil-chien.webp";

function Welcome() {
  return (
    <div className="welcome">
      <div className="welcome-image-container">
        <img id="welcome-image" src={imgAccueil} alt="welcome" />
      </div>
      <h1> Educ'Dog</h1>
      <h2> Enfin de retour ! On reprend l'entrainement ? </h2>
      {/* <p>
        {" "}
        Transforme ton chien en personnage de jeu ! Que se soit dans ton jardin
        ou dans ton tramway apprends lui des tours et fais le progresser{" "}
      </p> */}
    </div>
  );
}

export default Welcome;
