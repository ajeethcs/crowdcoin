const { data: summary = [] } = useQuery(
  [campaignSummaryKey, router.query.address],
  () => getCampaignSummary(router.query.address),
  {
    select: (data) => {
      const parsedSummary = JSON.parse(data || "{}");
      const summaryData = {
        name: parsedSummary[5],
      };
      // console.log(data);
      return [
        // {
        //   header: summaryData?.name,
        //   meta: "Name of the campaign",
        //   description: "The campaign title",
        //   style: { overflowWrap: "break-word" },
        // },
        // {
        //   header: summaryData?.description,
        //   meta: "Description",
        //   description: "Short summary about the campaign",
        //   style: { overflowWrap: "break-word" },
        // },
        summaryData.name,
      ];
    },
  }
);
