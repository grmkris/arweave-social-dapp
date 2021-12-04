import { useWeb3React, Web3ReactProvider } from "@web3-react/core";

// Mui
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

// Components
import { Layout } from "../components";

// Utils
import getErrorMessage from "../utils/getErrorMessage";
import CyberConnect, { Blockchain, Env } from "@cyberlab/cyberconnect";

export default function Home() {
  const { account, error, library } = useWeb3React();

  const cyberConnect = new CyberConnect({
    namespace: 'CyberConnect',
    env: Env.PRODUCTION,
    chain: Blockchain.ETH,
    provider: library,
  });

  if (account) {
    cyberConnect.connect(account);
    console.log(cyberConnect.endpoint);
  }

  return (
    <Layout>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Typography variant="h3" mt={8} gutterBottom>
          Welcome to the Arweave Social dApp
        </Typography>
        <Typography variant="h5" gutterBottom>
          {account
            ? `Your account: ${account}`
            : "Please connect to a wallet ↗"}
        </Typography>
        {!!error && (
          <Typography variant="body1" color="error">
            {getErrorMessage(error)}
          </Typography>
        )}
      </Grid>
    </Layout>
  );
}
