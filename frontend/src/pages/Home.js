import React, { useState } from "react";
import { Body, CreateButton, Header, Image, Link } from "../components";
import { useHistory } from "react-router-dom";
import bgimage from "../assets/Hero.png";
import { useQuery } from "@apollo/react-hooks";
import GET_ADDRESS from "../graphql/subgraph";

function Query(props){
  const name = props.ens;
  console.log(name)
  const { loading, error, data } = useQuery(GET_ADDRESS, {
    variables: {name}
  });
  let definedData = 'Not Found'
  if(!loading && !error){
    definedData = data.domains[0].resolvedAddress.id
    console.log(definedData)
  }
  return <p>ENS Saved For Address: {definedData}</p>
}

const Home = () => {

  const history = useHistory();
  const [ens, setEns] = useState('')
  const [submitted, setSubmitted] = useState(false)
  // const cid = new global.CID('bafybeiejmhcxqjgeplgsr2d2cpyqdgqwtswcih6gnw4bjgsr5bfojkgwwy')
  // let hex_value = Buffer.from(cid.multihash).toString('hex').substring(4);
  // console.log(hex_value)

  function goToMint() {
    history.push("/mint");
  }

  return (
    <div>
      <button className="btn btn-success" onClick={goToMint}>Create</button>
      
      <label>Enter ENS name:</label>
      <input 
      type='text' 
      placeholder='ENS name' 
      onChange={e => {
        if(!submitted){
        setEns(e.target.value)
        }
      }}>
      </input>
      <button type='submit' onClick={() =>{
        setSubmitted(true)
      }}>Submit</button>
      {submitted ? <Query ens={ens}/> : <div></div>}
    </div>
    
  );
  };

export default Home;