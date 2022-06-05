import { FC } from "react";
import { ITab } from "../../models/tabs";
import BasicTabs from "../TabPanel";
import TransactionList from "../TransactionList";

interface TransactionTabsProps {}

const TransactionTabs: FC<TransactionTabsProps> = () => {
  const tabs: ITab[] = [
    {
      tabName: "Recent Transactions",
      children: <TransactionList />,
    },
    {
      tabName: "Archived Transactions",
      children: <div>Archive</div>,
    },
  ];
  return <BasicTabs tabs={tabs} />;
};

export default TransactionTabs;
