import { useRouter } from "next/router";
import Head from "next/head";
import { useEffect, useState } from "react";
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

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";
import { width } from "@mui/system";

export default function Home() {
  const { push } = useRouter();

  const { error } = useWeb3React();
  const { cyberConnect, initializing } = useCyberConnect();
  const [ popularAccounts, setPopularAccounts ] = useState([]);

  const client = new ApolloClient({
    uri: 'https://api.cybertino.io/connect/',
    cache: new InMemoryCache()
  });
  

  // Redirect to profile if account is found
  useEffect(() => {
    // const client = ...
    client
    .query({
      query: gql`
        query {
          popular{
            list {
              address
              ens
              followerCount
              followStatus {
                isFollowed
                isFollowing
              }
            }
          }
        }
      `
    })
    .then(result => {
      setPopularAccounts(result.data.popular.list);
      console.log(result)
    });

    
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
      <h3>Popular accounts</h3>
      {popularAccounts ? popularAccounts.map(account  => (
        <div>
          <h4>{account.ens}</h4>
          <p>{account.followerCount} followers</p>
          <p>{account.followStatus.isFollowed ? 'followed' : 'not followed'}</p>  
        </div>)) : null}
    </Layout>
  );
}
