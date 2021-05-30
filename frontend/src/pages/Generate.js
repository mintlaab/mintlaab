import React from "react";
// import { Contract } from "@ethersproject/contracts";
// import { getDefaultProvider } from "@ethersproject/providers";
import { useQuery } from "@apollo/react-hooks";

import { Body, Button, Header, Image, Link } from "../components";
import useWeb3Modal from "../hooks/useWeb3Modal";

// import { addresses, abis } from "@project/contracts";
import GET_ADDRESS from "../graphql/subgraph";
import { useHistory } from "react-router-dom";

import { Zora } from '@zoralabs/zdk'
import { Wallet } from 'ethers'
import { JsonRpcProvider } from '@ethersproject/providers'
import {
  constructBidShares,
  constructMediaData,
  sha256FromBuffer,
  generateMetadata,
  isMediaDataVerified
} from '@zoralabs/zdk'

import {ethers} from 'ethers'
import {ensName} from './Home'

function Generate() {

  const history = useHistory();

  function goToMint() {
    history.push("/mint");
  }

  const name = ensName
  const { loading, error, data } = useQuery(GET_ADDRESS, {
    variables: {name}
  });
  
  let metamaskAddr = ''
  
  const ethersProvider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = ethersProvider.getSigner()
  metamaskAddr = signer.getAddress().then()
  
  React.useEffect(() => {
    if (!loading && !error && data) {
      alert('Success! Your ENS name will be saved')
      console.log(data.domains[0].resolvedAddress.id)
    }
    if(!loading && !data){
      alert('Entered ENS name is not registered')
    }
    if(!loading && (data.domains[0].resolvedAddress.id !== metamaskAddr)){
      alert('ENS address does not match metamask address')
    }
  }, [loading, error, data]);

  return (
    <div>
      <Body>
        <div class="form-group">
          <label class="form-label" for="ipfs-cid">IPFS CID</label>
          <input class="form-input" type="text" id="ipfs-cid" placeholder="IPFS CID"></input>
        </div>
        <Button onClick={goToMint}>
          Go to minting page
        </Button>
      </Body>
    </div>
  );
}

export default Generate;
