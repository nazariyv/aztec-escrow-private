import * as React from "react";
import { withRouter } from "react-router";
import { Navigation } from "baseui/side-navigation";

const SideNavigation = ({ history, location }) => {
  // const [activeItemId, setActiveItemId] = React.useState("#primary");
  return (
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
  );
};

export default withRouter(SideNavigation);
