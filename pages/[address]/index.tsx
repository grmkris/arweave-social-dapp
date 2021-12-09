import { useRouter } from "next/router";
import Head from "next/head";

// Mui
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

// Components
import { Layout, Tabs, ListAccounts } from "../../components";

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

  const { data, loading, error } = useQuery(ACCOUNT_INFORMATION, {
    variables: { address },
  });
  const Followers = () => {
    return (
      <ListAccounts
        list={data?.identity?.followers?.list}
        loading={loading}
        error={error}
      />
    );
  };
  const Following = () => {
    return (
      <ListAccounts
        list={data?.identity?.followings?.list}
        loading={loading}
        error={error}
      />
    );
  };
  const Friends = () => {
    return (
      <ListAccounts
        list={data?.identity?.friends?.list}
        loading={loading}
        error={error}
      />
    );
  };

  const recommendedAccounts = useQuery(RECOMMENDED_ACCOUNTS, {
    variables: { address },
  });
  const Recommended = () => {
    return (
      <ListAccounts
        list={recommendedAccounts.data?.recommendations.data?.list}
        loading={recommendedAccounts.loading}
        error={recommendedAccounts.error}
      />
    );
  };

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
          {isOwnAccount ? "My Profile" : address}
        </Typography>

        <Grid item xs={12}>
          <Tabs
            followers={<Followers />}
            following={<Following />}
            friends={<Friends />}
            recommended={isOwnAccount && <Recommended />}
          />
        </Grid>
      </Grid>
    </Layout>
  );
}
