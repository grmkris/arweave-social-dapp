import Image from "next/image";
import { useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { AbstractConnector } from "@web3-react/abstract-connector";
import _ from "lodash";
import { SUPPORTED_WALLETS } from "../../../constants/wallets";

// Mui
import { default as MuiAppBar } from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

// Components
import DialogWalletOptions from "./DialogWalletOptions";

// Hooks
import { useEagerConnect, useInactiveListener } from "../../../hooks";
import { useRouter } from "next/router";

export default function AppBar() {
  const { push } = useRouter();
  const { activate, account, library } = useWeb3React<Web3Provider>();
  const walletName = library?.connection.url;
  const walletNameUpperSnake = _.toUpper(_.snakeCase(walletName)); // Convert to match constants keys
  const walletIcon = SUPPORTED_WALLETS[walletNameUpperSnake]?.iconURL;

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect();

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager);

  const [open, setOpen] = useState(false);

  const handleClose = (connector: AbstractConnector | undefined) => {
    if (connector) activate(connector);

    return setOpen(false);
  };

  return (
    <>
      <DialogWalletOptions open={open} onClose={handleClose} />
      <Box>
        <MuiAppBar position="fixed" color="inherit">
          <Toolbar>
            <Box sx={{ cursor: "pointer" }} onClick={() => push("/")}>
              <Image
                src="/ourspace-logo-icon.png"
                alt="OurSpace Logo"
                height={50}
                width={50}
              />
            </Box>
            <Box sx={{ flexGrow: 1 }} />

            {!!account ? (
              <>
                <Button
                  variant="contained"
                  style={{ marginRight: "1rem" }}
                  color="secondary"
                  size="large"
                  onClick={() => push("/profile")}
                >
                  Profile
                </Button>
                <Image
                  src={walletIcon}
                  alt={`${walletName} icon`}
                  height={40}
                  width={40}
                />
                <Typography noWrap ml={2} sx={{ maxWidth: 100 }}>
                  {account}
                </Typography>
              </>
            ) : (
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={() => setOpen(true)}
              >
                Connect
              </Button>
            )}
          </Toolbar>
        </MuiAppBar>
      </Box>
    </>
  );
}
