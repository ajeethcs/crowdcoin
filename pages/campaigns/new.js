import React, { useState, useCallback } from "react";
import Layout from "../../components/Layout";
import { Form, Button, Input, Message, Breadcrumb } from "semantic-ui-react";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";
import { useMutation } from "react-query";
import { useRouter } from "next/router";

const CampaignNew = () => {
  const [minContribution, setMinContribution] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();

  const { mutate, isLoading, error, isError } = useMutation(
    async (value) => {
      router.prefetch("/");
      const accounts = await web3.eth.getAccounts();
      await factory.methods
        .createCampaign(minContribution, name, description)
        .send({ from: accounts[0] });
    },
    {
      onSuccess: () => router.push("/"),
    }
  );

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();
      mutate(event);
    },
    [minContribution, name, description]
  );

  return (
    <Layout>
      <Breadcrumb>
        <Breadcrumb.Section href="/">Campaigns</Breadcrumb.Section>
        <Breadcrumb.Divider />
        <Breadcrumb.Section active>New</Breadcrumb.Section>
      </Breadcrumb>
      <div>
        <h3 className="newHeading">Create a Campaign</h3>
        <div className="newContainer">
          <Form onSubmit={onSubmit} error={isError}>
            <Form.Field>
              <label style={{ color: "white" }}>Minimum contribution</label>
              <Input
                value={minContribution}
                onChange={({ target: { value } }) => setMinContribution(value)}
                label="wei"
                labelPosition="right"
                disabled={isLoading}
              />
            </Form.Field>
            {/*  */}
            <Form.Field>
              <label style={{ color: "white" }}>Campaign Name</label>
              <Input
                value={name}
                onChange={({ target: { value } }) => setName(value)}
                // label="wei"
                labelPosition="right"
                disabled={isLoading}
              />
            </Form.Field>
            {/*  */}
            <Form.Field>
              <label style={{ color: "white" }}>Campaign Description</label>
              <Input
                value={description}
                onChange={({ target: { value } }) => setDescription(value)}
                labelPosition="right"
                disabled={isLoading}
              />
            </Form.Field>

            <Message error header="Oops!" content={error?.message} />
            <Button style={{ marginLeft: "42%" }} loading={isLoading} primary>
              Create
            </Button>
          </Form>
        </div>
      </div>
    </Layout>
  );
};

export default CampaignNew;
