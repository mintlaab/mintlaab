import React from "react";
// import { Contract } from "@ethersproject/contracts";
// import { getDefaultProvider } from "@ethersproject/providers";
import { useQuery } from "@apollo/react-hooks";

import { Body, Button, Header, Image, Link } from "../components";
import mark from "../MintlaabMarkColour.png";
import useWeb3Modal from "../hooks/useWeb3Modal";

// import { addresses, abis } from "@project/contracts";
import GET_TRANSFERS from "../graphql/subgraph";
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

function Generate() {

  const history = useHistory();

  function goToMint() {
    history.push("/mint");
  }

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
