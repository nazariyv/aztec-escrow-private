import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Client as Styletron } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";
import { LightTheme, BaseProvider, styled } from "baseui";

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
    network: null
  };

  enableAztecSdk = async () => {
    // const {
    //   network,
    // } = this.state;
    try {
      const contractAddresses = {
        ganache: {
          ACE: "0xFA8eD6F76e8f769872a1f8a89085c56909EC8Cfc", //getContractAddress('ACE', network),
          AccountRegistryManager: "0x66db0e20a9d619ee3dfa3819513ab8bed1b21a87" //getContractAddress('AccountRegistryManager', network),
        }
      };
      await window.aztec.enable({
        apiKey: "ethglobalstarterkit",
        contractAddresses
      });
    } catch (error) {
      console.error("Failed to enable AZTEC SDK.");
      console.log(error);
      this.setState({
        error
      });
    }
  };

  componentDidMount = () => {
    if (window.aztec) {
      this.aztecSdkLoaded();
    } else {
      window.aztecCallback = this.aztecSdkLoaded;
    }
  };

  aztecSdkLoaded = () => {
    // window.aztec.addListener("profileChanged", this.handleProfileChanged);

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
