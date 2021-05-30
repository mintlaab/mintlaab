import React from "react";
import { Body, CreateButton, Header, Image, Link } from "../components";
import { useHistory } from "react-router-dom";
import bgimage from "../assets/Hero.png";

const Home = () => {

  const history = useHistory();

  // const cid = new global.CID('bafybeiejmhcxqjgeplgsr2d2cpyqdgqwtswcih6gnw4bjgsr5bfojkgwwy')
  // let hex_value = Buffer.from(cid.multihash).toString('hex').substring(4);
  // console.log(hex_value)

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