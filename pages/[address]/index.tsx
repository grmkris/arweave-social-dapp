import { useRouter } from "next/router";
import Head from "next/head";
import _ from "lodash";

// Mui
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";

// Components
import { CardAccount, Layout, ErrorMessage } from "../../components";

// Hooks
import { useQuery } from "@apollo/client";
import { useWeb3React } from "@web3-react/core";

// Queries
import { RECOMMENDED_ACCOUNTS } from "../../graphql/queries";

export default function Profile() {
  const router = useRouter();
  const { address } = router.query;

  const { account } = useWeb3React();
  const isOwnAccount = account && account === address;

  const { data, loading, error } = useQuery(RECOMMENDED_ACCOUNTS, {
    variables: { address },
  });

  const renderRecommendedFollows = () => {
    if (loading) return <LinearProgress />;
    if (error) return <ErrorMessage text={error?.message} />;
    if (!data) return null;

    return data.recommendations.data ? (
      _.orderBy(
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
      ))
    ) : (
      <>
        <Typography variant="h5" mt={4}>
          🤔 Hmm... no recommendations found
        </Typography>
        <Typography variant="h6">
          Check back here after following some others to get some
          recommendations!
        </Typography>
      </>
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

      <Grid container flexDirection="column">
        {isOwnAccount && (
          <Grid item xs={12}>
            <Typography variant="h4" mt={8} gutterBottom align="center">
              Recommended follows
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
                {renderRecommendedFollows()}
              </Grid>
            )}
          </Grid>
        )}
      </Grid>
    </Layout>
  );
}
