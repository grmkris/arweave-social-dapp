import Head from "next/head";
import Image from "next/image";
import { useWeb3React } from "@web3-react/core";
import _ from "lodash";

// GraphQL
import { useQuery } from "@apollo/client";
import { POPULAR_ACCOUNTS } from "../graphql/queries";

// Mui
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";

// Components
import { Layout, CardAccount, ErrorMessage } from "../components";

// Utils
import getErrorMessage from "../utils/getErrorMessage";

export default function Home() {
  const { error } = useWeb3React();

  const { data, loading, error: queryError } = useQuery(POPULAR_ACCOUNTS);

  const renderPopularAccounts = () => {
    if (loading) return <LinearProgress />;
    if (error) return <ErrorMessage text={getErrorMessage(error)} />;
    if (queryError) return <ErrorMessage text={queryError?.message} />;
    if (!data) return null;

    return _.orderBy(data.popular.list, ["followerCount"], ["desc"]).map(
      (account) => (
        <Grid item key={account.address} xs={12} sm={6} md={4} lg={3}>
          <CardAccount
            address={account.address}
            ens={account.ens ? account.ens : "No ENS"}
            followerCount={account.followerCount}
          />
        </Grid>
      )
    );
  };

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
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h3" mt={8} gutterBottom>
            Welcome to
          </Typography>
          <Image
            src="/ourspace-logo-full.png"
            alt="OurSpace Logo"
            height={125}
            width={375}
          />
        </Box>
        <Typography variant="h5" gutterBottom mt={2}>
          Social Networking for the Permaweb.
        </Typography>

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
            {renderPopularAccounts()}
          </Grid>
        )}
      </Grid>
    </Layout>
  );
}
