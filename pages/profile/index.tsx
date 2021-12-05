import { useRouter } from "next/router";
import Head from "next/head";
import { useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import _ from "lodash";

// Mui
import Typography from "@mui/material/Typography";

// Components
import { CardAccount, Layout, ErrorMessage } from "../../components";

// Hooks
import { useCyberConnect } from "../../hooks";
import { Grid, LinearProgress } from "@mui/material";
import { useQuery } from "@apollo/client";
import { RECOMMENDED_ACCOUNTS } from "../../graphql/queries";

export default function Profile() {
  const router = useRouter();

  const { account } = useWeb3React();
  const { cyberConnect, initializing } = useCyberConnect();

  const { data, loading, error } = useQuery(RECOMMENDED_ACCOUNTS);

  const renderRecommendedFollows = () => {
    if (loading) return <LinearProgress />;
    if (error) return <ErrorMessage text={error?.message} />;
    if (!data) return null;

    return _.orderBy(
      data.recommendations.data.list,
      ["followerCount"],
      ["desc"]
    ).map((account) => (
      <Grid item key={account.address} xs={12} sm={6} md={4} lg={3}>
        <CardAccount
          address={account.address}
          ens={account.ens ? account.ens : "No ENS"}
          followerCount={account.followerCount}
          recommendationReason={account.recommendationReason}
        />
      </Grid>
    ));
  };

  // Redirect to home if no account is found
  useEffect(() => {
    if (!account || (!initializing && !cyberConnect)) router.push("/");
  }, [account, cyberConnect, initializing, router]);

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

      <Typography variant="h5" mt={8}>
        {account && `Your account: ${account}`}
      </Typography>

      <Typography variant="h2" mt={2} mb={2}>
        Recommended follows:
      </Typography>
      {loading ? (
        <LinearProgress sx={{ width: "100%" }} />
      ) : (
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          {renderRecommendedFollows()}
        </Grid>
      )}
    </Layout>
  );
}
