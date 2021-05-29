import React from "react";
import { Body, Button, Header, Image, Link } from "../components";
import { useHistory } from "react-router-dom";

const Home = () => {

  const history = useHistory();

  function goToGenerate() {
    history.push("/generate");
  }

  return (
    <div>
      <Button onClick={goToGenerate}>
        Go to generation page
      </Button>
    </div>
  );
};

export default Home;