// Mui
import { default as MuiAppBar } from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function AppBar() {
  const handleClick = () => {
    console.log("Revise to connect to wallet");
  };

  return (
    <Box>
      <MuiAppBar position="static" color="inherit">
        <Toolbar>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
            Arweave Social
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleClick}
          >
            Connect
          </Button>
        </Toolbar>
      </MuiAppBar>
    </Box>
  );
}
