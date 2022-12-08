import React from "react";
import { Button, Menu } from "semantic-ui-react";
import Link from "next/link";

const Header = () => (
  <div className="nav">
    <Menu style={{ marginTop: "10px" }}>
      <div className="item">CrowdCoin</div>
      <Menu.Menu position="right">
        <Link href="/campaigns/new">
          <a>
            <Button
              floated="right"
              content="Create Campaign"
              icon="add circle"
              style={{
                backgroundColor: "#0ea5e9",
                color: "white",
                height: "100%",
                margin: "0",
              }}
            />
          </a>
        </Link>
      </Menu.Menu>
    </Menu>
  </div>
);

export default Header;
