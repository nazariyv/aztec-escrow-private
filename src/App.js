import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Client as Styletron } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";
import { LightTheme, BaseProvider, styled } from "baseui";
import { getContractAddressesForNetwork } from "@aztec/contract-addresses";

import getWeb3 from "./utils/web3";

import {
  Main,
  CreateEscrow,
  CheckEscrow,
  ApproveEscrow,
  ReleaseEscrow,
  HowItWorks
} from "./pages";

const engine = new Styletron();
const Centered = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%"
});

class App extends React.Component {
  state = {
    sdkLoaded: false,
    account: null,
    network: null,
    error: null,
    web3: null
  };

  componentDidMount = async () => {
    if (window.aztec) {
      this.aztecSdkLoaded();
    } else {
      window.aztecCallback = this.aztecSdkLoaded;
    }

    const web3 = await getWeb3();
    this.setState({ web3 });
  };

  enableAztecSdk = async () => {
    try {
      const contractAddresses = {
        rinkeby: {
          ACE: getContractAddressesForNetwork(this.state.network)["ACE"],
          AccountRegistryManager: getContractAddressesForNetwork(
            this.state.network
          )["AccountRegistryManager"]
        }
      };
      await window.aztec.enable({
        apiKey: "ethglobalstarterkit",
        contractAddresses
      });
    } catch (error) {
      console.error("failed to enable aztec sdk");
      console.log(error);
      this.setState({
        error
      });
    }
  };

  aztecSdkLoaded = () => {
    const account = window.aztec.web3.getAccount();
    const network = window.aztec.web3.getNetwork();
    this.setState(
      {
        sdkLoaded: true,
        account,
        network
      },
      this.enableAztecSdk
    );
  };

  render = () => (
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <Centered>
          <Router>
            <Main />
            <Switch>
              <Route path="/create-escrow" exact component={CreateEscrow} />
              <Route path="/check-escrow" exact component={CheckEscrow} />
              <Route path="/approve-escrow" exact component={ApproveEscrow} />
              <Route path="/release-escrow" exact component={ReleaseEscrow} />
              <Route path="/how-it-works" exact component={HowItWorks} />
            </Switch>
          </Router>
        </Centered>
      </BaseProvider>
    </StyletronProvider>
  );
}

export default App;
