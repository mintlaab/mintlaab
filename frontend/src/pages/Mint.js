import React from "react";
// import { Contract } from "@ethersproject/contracts";
// import { getDefaultProvider } from "@ethersproject/providers";
import { useQuery } from "@apollo/react-hooks";

import { Body, Button, Header, Image, Link } from "../components";
import useWeb3Modal from "../hooks/useWeb3Modal";

// import { addresses, abis } from "@project/contracts";
import GET_TRANSFERS from "../graphql/subgraph";

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

async function mintNFT(provider) {
  const wallet = Wallet.createRandom().connect(provider)
  const signer = provider.getSigner();
  const zora = new Zora(signer, 4)

  const metadata = {
    version: 'zora-20210101',
    name: "The r Thinker",
    description: "This is The Thinker GIF, minted from a JS script using Zora's ZDK",
    mimeType: "image\/gif",
  }

  const minified = generateMetadata(metadata.version, metadata)

  const metadataHash = await sha256FromBuffer(Buffer.from(minified))

  const mediaData = constructMediaData(
    'https://ipfs.fleek.co/ipfs/bafybeiejmhcxqjgeplgsr2d2cpyqdgqwtswcih6gnw4bjgsr5bfojkgwwy',
    'https://ipfs.fleek.co/ipfs/bafybeib2aywiflnrognbrkkkokcmmxh4c75rzukn55rounu3s4wvaljneu',
    "0xbcee2b025f77df6f7ea70b02b89b01de9ef6919651302160345f78d7ba000214",
    metadataHash
  )

  // const contentHash = sha256FromBuffer(Buffer.from('Ours Truly,'))
  // console.log(contentHash)

  // const verified = await isMediaDataVerified(mediaData)

  const bidShares = constructBidShares(
    10, // creator share
    90, // owner share
    0 // prevOwner share
  )

  

  // if (!verified){
  //   console.log("MediaData not valid, do not mint")
  // }

  const tx = await zora.mint(mediaData, bidShares)
  await tx.wait(8) // 8 confirmations to finalize
  console.log("done")
}

function Mint() {
  const { loading, error, data } = useQuery(GET_TRANSFERS);
  const [provider, loadWeb3Modal, logoutOfWeb3Modal] = useWeb3Modal();

  return (
    <div>
      <Body>
        <div class="form-group">
          <label class="form-label" for="nft-title">Title</label>
          <input class="form-input" type="text" id="nft-title" placeholder="Title..."></input>
          <label class="form-label" for="nft-description">Description</label>
          <textarea class="form-input" type="text" id="nft-description" placeholder="Description..." rows="3"></textarea>
        </div>
        <Button onClick={() => mintNFT(provider)}>
          Mint NFT
        </Button>
      </Body>
    </div>
  );
}

export default Mint;
