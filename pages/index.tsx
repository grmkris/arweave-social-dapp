import { useRouter } from "next/router";
import Head from "next/head";
import { useEffect } from "react";
import { useWeb3React } from "@web3-react/core";

// Mui
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

// Components
import { Layout } from "../components";

// Utils
import getErrorMessage from "../utils/getErrorMessage";

// Hooks
import { useCyberConnect } from "../hooks";

export default function Home() {
  const { push } = useRouter();

  const { error } = useWeb3React();
  const { cyberConnect, initializing } = useCyberConnect();

  // Redirect to profile if account is found
  useEffect(() => {
    if (!initializing && cyberConnect) push("/profile");
  }, [cyberConnect, initializing, push]);

  return (
    <Layout>
      <Head>
        <title>Welcome to OurSpace</title>
        <meta
          name="description"
          content="Social Networking for the Permaweb."
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Grid
        container
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Typography variant="h3" mt={8} gutterBottom>
          Welcome to the Arweave Social dApp
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
