import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Client as Styletron } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";
import { LightTheme, BaseProvider } from "baseui";
// import { getContractAddressesForNetwork } from "@aztec/contract-addresses";
import { Block } from "baseui/block";

import getWeb3 from "./utils/web3";
import Centered from "./components/centered";
import {
  CreateEscrow,
  CheckEscrow,
  ApproveEscrow,
  ReleaseEscrow,
  HowItWorks,
  Main
} from "./pages";
import { AppLayout } from "./components";
import { ZK_ASSET_ADDRESS } from "./consts";

const engine = new Styletron();

class App extends React.Component {
  state = {
    isFetching: true,
    account: null,
    aztec: null,
    network: null,
    error: null,
    asset: null,
    web3: null,
    daiBalance: 0,
    zkDaiBalance: 0
  };

  componentDidMount = async () => {
    if (window.aztec) {
      await this.aztecSdkLoaded();
    } else {
      window.aztecCallback = this.aztecSdkLoaded;
    }
  };

  enableAztecSdk = async () => {
    try {
      // const contractAddresses = {
      //   rinkeby: {
      //     ACE: getContractAddressesForNetwork(this.state.network.id)["ACE"],
      //     AccountRegistryManager: getContractAddressesForNetwork(
      //       this.state.network.id
      //     )["AccountRegistryManager"]
      //   }
      // };

      await window.aztec.enable({
        apiKey: "071MZEA-WFWMGX4-JJ2C5C1-AVY458F"
        // contractAddresses
      });

      const web3 = await getWeb3();
      const asset = await window.aztec.zkAsset(ZK_ASSET_ADDRESS);
      const { daiBalance, zkDaiBalance } = await this.getBalances(asset);

      this.setState({
        isFetching: false,
        aztec: window.aztec,
        web3,
        asset,
        daiBalance,
        zkDaiBalance
      });
    } catch (error) {
      console.error("failed to enable aztec sdk");
      console.log(error);
      this.setState({
        error
      });
    }
  };

  aztecSdkLoaded = async () => {
    const account = window.aztec.web3.getAccount();
    const network = window.aztec.web3.getNetwork();

    this.setState(
      {
        account: account.address,
        network
      },
      this.enableAztecSdk
    );
  };

  getBalances = async asset => {
    const daiBalance = await asset.balanceOfLinkedToken(this.state.account);
    console.log("asset", asset);
    const zkDaiBalance = await asset.balance();
    console.log("asset bal", zkDaiBalance);
    const notes = await asset.fetchNotesFromBalance();
    console.log("notes", notes);
    const allowanceOfLinkedToken = await asset.allowanceOfLinkedToken(
      this.state.account
    );
    console.log("allowanceOfLinkedToken", allowanceOfLinkedToken.toString());
    return { daiBalance: daiBalance.toString(10), zkDaiBalance };
  };

  render = () => (
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <Centered>
          <Router>
            <AppLayout>
              <Switch>
                <Route path="/" exact>
                  <Block maxWidth="600px" padding="20px" height="100%">
                    <Main
                      daiBalance={this.state.daiBalance}
                      zkDaiBalance={this.state.zkDaiBalance}
                      isFetching={this.state.isFetching}
                    />
                  </Block>
                </Route>
                <Route path="/create-escrow" exact>
                  <Block maxWidth="600px" padding="20px">
                    <CreateEscrow
                      web3={this.state.web3}
                      zkBalance={this.state.zkDaiBalance}
                      aztec={this.state.aztec}
                      zkAsset={this.state.asset}
                    />
                  </Block>
                </Route>
                <Route path="/check-escrow" exact>
                  <Block maxWidth="600px" padding="20px">
                    <CheckEscrow />
                  </Block>
                </Route>
                <Route path="/approve-escrow" exact>
                  <Block maxWidth="600px" padding="20px">
                    <ApproveEscrow />
                  </Block>
                </Route>
                <Route path="/release-escrow" exact>
                  <Block maxWidth="600px" padding="20px">
                    <ReleaseEscrow />
                  </Block>
                </Route>
                <Route path="/how-it-works" exact>
                  <Block maxWidth="600px" padding="20px">
                    <HowItWorks />
                  </Block>
                </Route>
              </Switch>
            </AppLayout>
          </Router>
        </Centered>
      </BaseProvider>
    </StyletronProvider>
  );
}

export default App;
