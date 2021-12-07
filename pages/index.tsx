import Head from "next/head";
import Image from "next/image";
import _ from "lodash";

// GraphQL
import { useQuery } from "@apollo/client";
import { POPULAR_ACCOUNTS } from "../graphql/queries";

// Mui
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

// Components
import { Layout, ListAccounts } from "../components";

export default function Home() {
  const popularAccounts = useQuery(POPULAR_ACCOUNTS);

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
        <ListAccounts
          type="popular"
          queryData={popularAccounts}
          notFoundMessage="Unfortunately no popular accounts were able to be found."
        />
      </Grid>
    </Layout>
  );
}
