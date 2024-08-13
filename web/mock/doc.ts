export const doc = `
# PumpSui Deploy Tips

**TDV(SUI)**: Total Deposit Value. The total amount of funds raised, including the portion distributed to the project team through the project treasury and the portion retained in the supporter ticket NFT.

**Threshold Ratio(%)**: Should be an integer less than or equal to 100. When the fundraising amount reaches TDL * Threshold Ratio / 100, the crowdfunding project is activated, and the project team can receive funds from the project treasury through streaming payments. Before this, the project team can choose to cancel the crowdfunding, and supporters can retrieve all their investments without loss.

**Ratio(%)**: Should be an integer less than or equal to 100. A portion of the total funds raised, TDV * Ratio / 100, will be allocated to the project treasury for team expenses. The remaining portion will be locked with the supporters and will be used for exchange with the supporters' rights when the project is completed. It is recommended to choose an appropriate ratio parameter, such as 10% to 30%, unless the project's product is already very mature. The cost of deploying a crowdfunding project is TDL * Ratio / 10000.

**Category**: Set the category of the crowdfunding project. If you cannot find a suitable category tag, you can go to our Twitter comments.

**Min Value(SUI)**: The minimum amount that project supporters must invest in the crowdfunding project each time, which should be set to be greater than or equal to 1 SUI.

**Max Value(SUI)**: The maximum amount that each project supporter can support for the crowdfunding project. The default value is 0, indicating no limit. It should be set to a value greater than the minimum amount when there is a concern about the risk of withdrawal due to over-reliance on a single investor.

**Amount Per Sui**: The face value amount of the supporter ticket NFT that project supporters receive for each 1 SUI invested.

**Duration**: The estimated project execution period, in days, with a minimum of three days. The fundraising in the project treasury will be linearly unlocked and allocated according to the project cycle time. It is recommended to set a reasonable project cycle unless the project's product is already very mature.

**Description**: Project description. It is recommended to include an introduction to the project, the project team, proof of previous work, and the returns that project supporters can get. This part can be edited again in the future.

#
## [Suifund](https://suifund.com) 
### It is a crowdfunding platform that unites a community of supporters, welcome to use it.
`;
