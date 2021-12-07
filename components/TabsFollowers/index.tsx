import { useState } from "react";

// Mui
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

// Components
import TabPanel from "./TabPanel";

type Props = {
  followers: any;
  following: any;
};

export default function TabsFollowers(props: Props) {
  const [value, setValue] = useState(0);
  const { followers, following } = props;

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Tabs
          value={value}
          onChange={(_, value) => setValue(value)}
          aria-label="Followers and followings"
        >
          <Tab label="Followers" />
          <Tab label="Following" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        {followers}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {following}
      </TabPanel>
    </>
  );
}
