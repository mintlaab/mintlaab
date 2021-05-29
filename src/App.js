import React from "react";
// import { Contract } from "@ethersproject/contracts";
// import { getDefaultProvider } from "@ethersproject/providers";
import { useQuery } from "@apollo/react-hooks";

import { Body, Button, Header, Image, LogoImage, Link } from "./components";
import logo from "./MintlaabMarkColour.png";
import useWeb3Modal from "./hooks/useWeb3Modal";

// import { addresses, abis } from "@project/contracts";
import GET_TRANSFERS from "./graphql/subgraph";

import { Zora } from '@zoralabs/zdk'
import { Wallet } from 'ethers'
import { JsonRpcProvider } from '@ethersproject/providers'
import { BrowserRouter as Router, Switch, Route, Link as RouterLink } from "react-router-dom";
import mintlaablogo from "./MintlaabLogoColour.png";
import Home from "./pages/Home";
import Mint from "./pages/Mint";
import Generate from "./pages/Generate";
import Error from "./pages/Error";
import {
  constructBidShares,
  constructMediaData,
  sha256FromBuffer,
  generateMetadata,
  isMediaDataVerified
} from '@zoralabs/zdk'

function WalletButton({ provider, loadWeb3Modal, logoutOfWeb3Modal }) {
  return (
    <Button
      onClick={() => {
        if (!provider) {
          loadWeb3Modal();
        } else {
          logoutOfWeb3Modal();
        }
      }}
    >
      {!provider ? "Connect Wallet" : "Disconnect Wallet"}
    </Button>
  );
}

function App() {
  const { loading, error, data } = useQuery(GET_TRANSFERS);
  const [provider, loadWeb3Modal, logoutOfWeb3Modal] = useWeb3Modal();

  React.useEffect(() => {
    if (!loading && !error && data && data.transfers) {
      console.log("yo")
    }
  }, [loading, error, data]);

  return (
    <Router>
      <div>
        <RouterLink to="/">
          <LogoImage src={mintlaablogo}/>
        </RouterLink>
        <Header>
          <WalletButton provider={provider} loadWeb3Modal={loadWeb3Modal} logoutOfWeb3Modal={logoutOfWeb3Modal} />
        </Header>
        <Body>
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/generate" component={Generate} />
            <Route path="/mint" component={Mint} />
            <Route component={Error} />
          </Switch>
        </Body>
      </div>
    </Router>
  );
}

export default App;
