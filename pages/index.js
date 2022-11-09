import React, { useEffect, useState } from "react";
import { useQuery, dehydrate, QueryClient } from "react-query";
import factory from "../ethereum/factory";
import { Card, Button } from "semantic-ui-react";
import Layout from "../components/Layout";
import Link from "next/link";
import { Icon } from "semantic-ui-react";
// import Campaign from "../../ethereum/campaign";
import Campaign from "../ethereum/campaign";
import CampaignList from "../components/CampaignList";

export const getDeployedCampaigns = factory.methods.getDeployedCampaigns().call;
export const getCampaignNames = factory.methods.getCampaignNames().call;
const campaignListKey = "campaign-list";

const CampaignIndex = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [names, setNames] = useState([]);
  // const [summary, setSummary] = useState();

  useEffect(async () => {
    setNames(await getCampaignNames());
    console.log("runn");
  }, []);
  console.log("names:", names);

  // ===============================================================
  const { data: campaigns = [] } = useQuery(
    campaignListKey,
    getDeployedCampaigns,
    {
      select: (data = []) =>
        data?.map((campaign, index) => ({
          header: campaign,
          description: (
            <div>
              <Link href={`/campaigns/${campaign}`} key={campaign}>
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
  // console.log("sup", campaigns);
  let campaignAdresses = campaigns.map((obj) => {
    return obj.header;
  });
  console.log(campaignAdresses);

  const changeOnMouseOver = () => {
    setIsLoading(true);
  };
  const changeOnMouseLeave = () => {
    setIsLoading(false);
  };

  // *********************************

  // *********************************************

  return (
    <div>
      <Link href="/">
        <div className="titlebar">
          <h1
            className="title"
            onMouseEnter={changeOnMouseOver}
            onMouseLeave={changeOnMouseLeave}
          >
            CrowdCoin
          </h1>
          <div
            className="logo"
            onMouseEnter={changeOnMouseOver}
            onMouseLeave={changeOnMouseLeave}
          >
            <Icon
              name="bitcoin"
              size="huge"
              color="yellow"
              loading={isLoading}
            />
          </div>
        </div>
      </Link>
      <Layout>
        <div className="campaignList">
          {names.map((campaignName, index) => (
            <CampaignList
              name={campaignName}
              address={campaignAdresses[index]}
            />
          ))}
        </div>
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
