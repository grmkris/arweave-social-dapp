import { useState } from "react";
import { AbstractConnector } from "@web3-react/abstract-connector";

// Mui
import { default as MuiAppBar } from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

// Components
import DialogWalletOptions from "./DialogWalletOptions";

export default function AppBar() {
  const [open, setOpen] = useState(false);

  const handleClose = (connector: AbstractConnector | undefined) => {
    if (connector) console.log(connector);
    setOpen(false);
  };

  return (
    <>
      <DialogWalletOptions open={open} onClose={handleClose} />
      <Box>
        <MuiAppBar position="static" color="inherit">
          <Toolbar>
            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
              Arweave Social dApp
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => setOpen(true)}
            >
              Connect
            </Button>
          </Toolbar>
        </MuiAppBar>
      </Box>
    </>
  );
}
