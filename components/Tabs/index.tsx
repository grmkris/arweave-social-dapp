import { useState, ReactNode } from "react";

// Mui
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

// Components
import TabPanel from "./TabPanel";

type Props = {
  followers: ReactNode;
  following: ReactNode;
  friends: ReactNode;
  recommended?: ReactNode;
};

export default function TabsFollowers(props: Props) {
  const [value, setValue] = useState(0);
  const { followers, following, friends, recommended } = props;

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Tabs
          value={value}
          onChange={(_, value) => setValue(value)}
          aria-label="Followers, followings, and friends"
        >
          <Tab label="Followers" />
          <Tab label="Following" />
          <Tab label="Friends" />
          {recommended && <Tab label="Recommended" />}
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        {followers}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {following}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {friends}
      </TabPanel>
      {recommended && (
        <TabPanel value={value} index={3}>
          {recommended}
        </TabPanel>
      )}
    </>
  );
}
