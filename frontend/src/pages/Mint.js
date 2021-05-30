import React from "react";
// import { Contract } from "@ethersproject/contracts";
// import { getDefaultProvider } from "@ethersproject/providers";
import { useQuery } from "@apollo/react-hooks";
import fleekStorage from '@fleekhq/fleek-storage-js'

import { Body, CreateButton, Header, Image, Link } from "../components";
import useWeb3Modal from "../hooks/useWeb3Modal";
import env from "react-dotenv";

// import { addresses, abis } from "@project/contracts";
import GET_TRANSFERS from "../graphql/subgraph";
// import getArt from "../components/sketch"

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

function base64toBlob(base64Data, contentType) {
    contentType = contentType || '';
    var sliceSize = 1024;
    var byteCharacters = atob(base64Data);
    var bytesLength = byteCharacters.length;
    var slicesCount = Math.ceil(bytesLength / sliceSize);
    var byteArrays = new Array(slicesCount);

    for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
        var begin = sliceIndex * sliceSize;
        var end = Math.min(begin + sliceSize, bytesLength);

        var bytes = new Array(end - begin);
        for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
            bytes[i] = byteCharacters[offset].charCodeAt(0);
        }
        byteArrays[sliceIndex] = new Uint8Array(bytes);
    }
    return new Blob(byteArrays, { type: contentType });
}

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

  let image_base64 = "R0lGODlhCAAHAIABAGSV7f///yH+EUNyZWF0ZWQgd2l0aCBHSU1QACH5BAEKAAEALAAAAAAIAAcAAAINjI8BkMq41onRUHljAQA7"

  let image_blob = base64toBlob(image_base64, "image/gif")

  console.log(metadataHash)

  const uploadedFile = await fleekStorage.upload({
    apiKey: env.FLEEK_API_KEY,
    apiSecret: env.FLEEK_API_SECRET,
    key: 'image-tri-2',
    data: image_blob,
  });

  const uploadedMetadata = await fleekStorage.upload({
    apiKey: env.FLEEK_API_KEY,
    apiSecret: env.FLEEK_API_SECRET,
    key: 'image-tri-2'+'-metadata',
    data: minified,
  });

  const mediaData = constructMediaData(
    'https://ipfs.fleek.co/ipfs/'+uploadedFile.hash,
    'https://ipfs.fleek.co/ipfs/'+uploadedMetadata.hash,
    "0xbcee2b025f77df6f7ea70b02b89b01de9ef6919651302160345f78d7ba000214",
    metadataHash
  )
  console.log("https://ipfs.fleek.co/ipfs/"+uploadedFile.hash)

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
      <div class="columns">
        <div>
          <div class="form-group" >
            <label class="form-label" for="ipfs-cid">IPFS CID</label>
            <input class="form-input" type="text" id="ipfs-cid" placeholder="IPFS CID"></input>
            <label class="form-label" for="nft-title">Title</label>
            <input class="form-input" type="text" id="nft-title" placeholder="Title..."></input>
            <label class="form-label" for="nft-description">Description</label>
            <textarea class="form-input" type="text" id="nft-description" placeholder="Description..." rows="3"></textarea>
          </div>
          <button className="btn btn-success" onClick={() => mintNFT(provider)}>
            Mint NFT
          </button>
        </div>
      </div>
    </div>
  );
}

export default Mint;
