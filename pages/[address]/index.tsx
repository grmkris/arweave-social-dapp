import { useRouter } from "next/router";
import Head from "next/head";
import _ from "lodash";

// Mui
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

// Components
import { Layout, TabsFollowers, ListAccounts } from "../../components";

// Hooks
import { useQuery } from "@apollo/client";
import { useWeb3React } from "@web3-react/core";

// Queries
import {
  RECOMMENDED_ACCOUNTS,
  ACCOUNT_INFORMATION,
} from "../../graphql/queries";

export default function Profile() {
  const router = useRouter();
  const { address } = router.query;

  const { account } = useWeb3React();
  const isOwnAccount = account && account === address;

  const recommendedAccounts = useQuery(RECOMMENDED_ACCOUNTS, {
    variables: { address },
  });

  const accountInformation = useQuery(ACCOUNT_INFORMATION, {
    variables: { address },
  });

  console.log(accountInformation);

  return (
    <Layout>
      <Head>
        <title>OurSpace Profile</title>
        <meta name="description" content="OurSpace profile dashboard." />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Grid container flexDirection="column" mt={8}>
        <Typography variant="h4" align="center" gutterBottom>
          {isOwnAccount ? "My Profile" : account}
        </Typography>

        {isOwnAccount && (
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom align="center">
              Recommended follows
            </Typography>
            <ListAccounts
              type="recommendations"
              queryData={recommendedAccounts}
              notFoundMessage="Check back here after following some others to get some
              recommendations!"
            />
          </Grid>
        )}

        <Grid item xs={12}>
          <TabsFollowers
            followers="Followers placeholder"
            following="Following placeholder"
          />
        </Grid>
      </Grid>
    </Layout>
  );
}
