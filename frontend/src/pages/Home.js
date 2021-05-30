import React from "react";
import { Body, CreateButton, Header, Image, Link } from "../components";
import { useHistory } from "react-router-dom";
import bgimage from "../assets/Hero.png";

const Home = () => {

  const history = useHistory();

  function goToMint() {
    history.push("/mint");
  }

  return (
    <div>
      <button className="btn btn-success" onClick={goToMint}>Create</button>
    </div>
  );
};

export default Home;