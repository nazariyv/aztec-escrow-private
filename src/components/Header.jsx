import * as React from "react";
import {
  HeaderNavigation,
  ALIGN,
  StyledNavigationList,
  StyledNavigationItem
} from "baseui/header-navigation";
import { Button } from "baseui/button";
import { withRouter } from "react-router";

const Header = ({ history }) => {
  return (
    <HeaderNavigation>
      <StyledNavigationList $align={ALIGN.left}>
        <StyledNavigationItem>Aztec Private Escrow</StyledNavigationItem>
      </StyledNavigationList>
      <StyledNavigationList $align={ALIGN.center} />
      <StyledNavigationList $align={ALIGN.right}></StyledNavigationList>
      <StyledNavigationList $align={ALIGN.right}>
        <StyledNavigationItem>
          <Button
            onClick={event => {
              event.preventDefault();
              history.push("/how-it-works");
            }}
          >
            Learn how it works
          </Button>
        </StyledNavigationItem>
      </StyledNavigationList>
    </HeaderNavigation>
  );
};

export default withRouter(Header);
