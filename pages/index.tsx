import { useRouter } from "next/router";
import Head from "next/head";
import { useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import _ from "lodash";

// GraphQL
import { useQuery } from "@apollo/client";
import { POPULAR_ACCOUNTS } from "../graphql/queries";

// Mui
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";

// Components
import { Layout, CardAccount } from "../components";

// Utils
import getErrorMessage from "../utils/getErrorMessage";

// Hooks
import { useCyberConnect } from "../hooks";

export default function Home() {
  const { push } = useRouter();

  const { error } = useWeb3React();
  const { cyberConnect, initializing } = useCyberConnect();

  const { data, loading } = useQuery(POPULAR_ACCOUNTS);

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
          Welcome to OurSpace
        </Typography>
        <Typography variant="h5" gutterBottom>
          {`<Insert tag line here>`}
        </Typography>

        {!!error && (
          <Typography variant="body1" color="error">
            {getErrorMessage(error)}
          </Typography>
        )}

        <Typography variant="h4" mt={4} gutterBottom>
          Popular Accounts to Consider Following
        </Typography>
        {loading ? (
          <LinearProgress sx={{ width: "100%" }} />
        ) : (
          <Grid
            container
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            {_.orderBy(data.popular.list, ["followerCount"], ["desc"]).map(
              (account) => (
                <Grid item key={account.address} xs={12} sm={6} md={4} lg={3}>
                  <CardAccount
                    address={account.address}
                    ens={account.ens ? account.ens : "No ENS"}
                    followerCount={account.followerCount}
                  />
                </Grid>
              )
            )}
          </Grid>
        )}
      </Grid>
    </Layout>
  );
}
