import React, { useState, useCallback } from "react";
import { Button, Form, Message } from "semantic-ui-react";
import { useMutation } from "react-query";
// import Campaign from "../ethereum/campaign";
import Campaign from "../ethereum/campaign";
// import web3 from "../ethereum/web3";
import { useRouter } from "next/router";
// import campaign from "../ethereum/campaign";

// export const cancelFunding = campaign.methods.cancelFunding().call;

const CancelContribute = ({ campaignAddress }) => {
  // const [contributionValue, setContributionValue] = useState("");
  // const router = useRouter();

  // const { mutate, isLoading, error, isError } = useMutation(
  //   async () => {
  //     const campaign = Campaign(campaignAddress);
  //     await campaign.methods.cancelFunding();
  //   },
  //   { onSuccess: () => router.replace(`/campaigns/${campaignAddress}`) }
  // );

  // const onWithDraw = () => {
  //   console.log("withdraw");
  // };

  // const onSubmit = useCallback(
  //   (event) => {
  //     event.preventDefault();
  //     mutate(contributionValue);
  //   },
  //   [contributionValue]
  // );

  const onWithDraw = () => {
    // const campaign = Campaign(campaignAddress);
    // await campaign.methods.cancelFunding();
    console.log(campaignAddress);
  };

  return (
    <Form>
      {/* <Message error header="Oops!" content={error?.message} /> */}
      <Button className="withdraw" color="red" onClick={onWithDraw}>
        Withdraw
      </Button>
    </Form>
  );
};

export default CancelContribute;
