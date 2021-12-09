import Image from "next/image";
import { useRouter } from "next/router";
import Head from "next/head";

// Mui
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PeopleIcon from "@mui/icons-material/People";

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
        <Typography variant="h5" align="center" gutterBottom>
          {isOwnAccount ? (
            "My Profile"
          ) : (
            <a
              href={`https://etherscan.io/address/${address}`}
              target="__blank"
            >
              {address} ↗
            </a>
          )}
        </Typography>

        <Typography variant="h5" align="center" gutterBottom>
          {data?.identity?.ens ? data.identity.ens : "No ENS Found"}
        </Typography>

        <Typography variant="body1" align="center" gutterBottom>
          {data?.identity?.displayName
            ? data.identity.displayName
            : "No Display Name"}
        </Typography>

        <Typography
          variant="body1"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          gutterBottom
        >
          <PeopleIcon sx={{ marginRight: 1 }} />{" "}
          {data?.identity?.followerCount ? data?.identity?.followerCount : 0}{" "}
          followers
        </Typography>

        {data?.identity?.social?.twitter && (
          <Box
            sx={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <a
              href={`https://twitter.com/${data.identity.social.twitter}`}
              target="__blank"
            >
              <Image
                src="/twitter-logo.svg"
                alt="twitter logo"
                height={32}
                width={32}
              />
            </a>
          </Box>
        )}

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
