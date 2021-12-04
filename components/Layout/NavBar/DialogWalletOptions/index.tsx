import Image from "next/image";
import { SUPPORTED_WALLETS } from "../../../../constants/wallets";
import { AbstractConnector } from "@web3-react/abstract-connector";

// Mui
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";

type Connector = AbstractConnector | undefined;

type Props = {
  open: boolean;
  onClose: (connector: Connector) => void;
};

export default function SimpleDialog(props: Props) {
  const { open, onClose } = props;

  const handleListItemClick = (connector: Connector) => {
    onClose(connector);
  };

  return (
    <Dialog open={open} onClose={() => onClose(undefined)}>
      <DialogTitle>Connect to Wallet</DialogTitle>
      <List sx={{ pt: 0 }}>
        {Object.keys(SUPPORTED_WALLETS).map((key) => {
          const wallet = SUPPORTED_WALLETS[key];
          return (
            <ListItem
              key={wallet.name}
              onClick={() => handleListItemClick(wallet.connector)}
              button
            >
              <Image
                src={wallet.iconURL}
                alt={wallet.name}
                height={40}
                width={40}
              />
              <ListItemText
                primary={wallet.name}
                sx={{ display: "flex", justifyContent: "center" }}
              />
            </ListItem>
          );
        })}
      </List>
    </Dialog>
  );
}
