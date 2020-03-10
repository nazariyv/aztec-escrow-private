import * as React from "react";
import { withRouter } from "react-router";
import { Navigation } from "baseui/side-navigation";
import { Block } from "baseui/block";

const SideNavigation = ({ history, location }) => {
  return (
    <Block
      style={{
        height: "100%",
        borderRightStyle: "solid"
      }}
    >
      <Navigation
        items={[
          {
            title: "Create Escrow",
            itemId: "/create-escrow"
          },
          {
            title: "Check Escrow",
            itemId: "/check-escrow"
          },
          {
            title: "Approve Escrow",
            itemId: "/approve-escrow"
          },
          {
            title: "Release Escrow",
            itemId: "/release-escrow"
          }
        ]}
        activeItemId={location.pathname} // activeItemId
        onChange={({ event, item }) => {
          event.preventDefault();
          history.push(item.itemId);
        }}
      />
    </Block>
  );
};

export default withRouter(SideNavigation);
