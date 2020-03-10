import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Client as Styletron } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";
import { LightTheme, BaseProvider } from "baseui";
import { getContractAddressesForNetwork } from "@aztec/contract-addresses";
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

const engine = new Styletron();
const zkAssetAddress = "0x54Fac13e652702a733464bbcB0Fb403F1c057E1b";

class App extends React.Component {
  state = {
    isFetching: true,
    account: null,
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
      const contractAddresses = {
        rinkeby: {
          ACE: getContractAddressesForNetwork(this.state.network.id)["ACE"],
          AccountRegistryManager: getContractAddressesForNetwork(
            this.state.network.id
          )["AccountRegistryManager"]
        }
      };

      await window.aztec.enable({
        apiKey: "ethglobalstarterkit",
        contractAddresses
      });

      const web3 = await getWeb3();
      const asset = await window.aztec.zkAsset(zkAssetAddress);
      const { daiBalance, zkDaiBalance } = await this.getBalances(asset);

      this.setState({
        isFetching: false,
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
    const zkDaiBalance = await asset.balance();
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
                  <Main
                    daiBalance={this.state.daiBalance}
                    zkDaiBalance={this.state.zkDaiBalance}
                    isFetching={this.state.isFetching}
                  />
                </Route>
                <Route path="/create-escrow" exact component={CreateEscrow} />
                <Route path="/check-escrow" exact component={CheckEscrow} />
                <Route path="/approve-escrow" exact component={ApproveEscrow} />
                <Route path="/release-escrow" exact component={ReleaseEscrow} />
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
