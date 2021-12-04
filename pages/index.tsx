import { useWeb3React } from "@web3-react/core";

// Mui
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

// Components
import { Layout } from "../components";

// Utils
import getErrorMessage from "../utils/getErrorMessage";

export default function Home() {
  const { account, error } = useWeb3React();

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
