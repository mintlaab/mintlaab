import React, { useState } from "react";
import { Body, CreateButton, Header, Image, Link } from "../components";
import { useHistory } from "react-router-dom";
import bgimage from "../assets/Hero.png";

export let ensName = ''
const Home = () => {

  const history = useHistory();
  const [ens, setEns] = useState('');

  // const cid = new global.CID('bafybeiejmhcxqjgeplgsr2d2cpyqdgqwtswcih6gnw4bjgsr5bfojkgwwy')
  // let hex_value = Buffer.from(cid.multihash).toString('hex').substring(4);
  // console.log(hex_value)

  function goToMint() {
    history.push("/mint");
  }

  function goToGenerate() {
    history.push("/generate");
  }

  return (
    <div>
      <button className="btn btn-success" onClick={goToMint}>Create</button>
      <label>Enter ENS name:</label>
      <input 
      type='text' 
      placeholder='ENS name' 
      onChange={e => setEns(e.target.value)}>
      </input>
      <button onClick={() =>{
        ensName = ens;
        goToGenerate();
      }}>Submit</button>
    </div>
  );
};

export default Home;