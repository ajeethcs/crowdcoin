import React, { useEffect, useState } from "react";
import { useQuery, dehydrate, QueryClient } from "react-query";
import factory from "../ethereum/factory";
import { Card, Button } from "semantic-ui-react";
import Layout from "../components/Layout";
import Link from "next/link";
import { Icon } from "semantic-ui-react";

export const getDeployedCampaigns = factory.methods.getDeployedCampaigns().call;
const campaignListKey = "campaign-list";

const CampaignIndex = () => {
  const [isLoading, setIsLoading] = useState(false);
  // ===============================================================
  const { data: campaigns = [] } = useQuery(
    campaignListKey,
    getDeployedCampaigns,
    {
      select: (data = []) =>
        data.map((address) => ({
          header: address,
          description: (
            <div>
              <Link href={`/campaigns/${address}`} key={address}>
                {/* <p>{address[5]}</p> */}
                <a>View Campaign</a>
              </Link>
              {/* <p>{summary}</p> */}
            </div>
          ),
          fluid: true,
        })),
    }
  );
  console.log("sup", campaigns);

  const changeOnMouseOver = () => {
    setIsLoading(true);
  };
  const changeOnMouseLeave = () => {
    setIsLoading(false);
  };

  return (
    <div>
      <div className="titlebar">
        <h1
          className="title"
          onMouseEnter={changeOnMouseOver}
          onMouseLeave={changeOnMouseLeave}
        >
          Crowdcoin
        </h1>
        <div
          className="logo"
          onMouseEnter={changeOnMouseOver}
          onMouseLeave={changeOnMouseLeave}
        >
          <Icon name="bitcoin" size="huge" color="yellow" loading={isLoading} />
        </div>
      </div>
      <Layout>
        {/* <Link href="/campaigns/new">
          <a>
            <Button
              floated="right"
              content="Create Campaign"
              icon="add circle"
              style={{ backgroundColor: "#0ea5e9", color: "white  " }}
            />
          </a>
        </Link> */}
        <Card.Group items={campaigns} />
      </Layout>
    </div>
  );
};

export const getStaticProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(campaignListKey, getDeployedCampaigns);
  return { props: { dehydratedState: dehydrate(queryClient) } };
};

export default CampaignIndex;
