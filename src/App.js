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
