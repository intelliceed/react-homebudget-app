import { FC, useState, ReactNode, SyntheticEvent } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { ITab } from "../../models/tabs";

interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

interface BasicTabsProps {
  tabs: ITab[];
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

const allyProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

const BasicTabs: FC<BasicTabsProps> = ({ tabs }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          {tabs.map((tab, i) => (
            <Tab key={i} label={tab.tabName} {...allyProps(i)} />
          ))}
        </Tabs>
      </Box>
      {tabs.map((tab, i) => (
        <TabPanel key={i} value={value} index={i}>
          {tab.children}
        </TabPanel>
      ))}
    </Box>
  );
};
export default BasicTabs;
