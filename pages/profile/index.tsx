import { useRouter } from "next/router";
import Head from "next/head";
import { useEffect } from "react";
import { useWeb3React } from "@web3-react/core";

// Mui
import Typography from "@mui/material/Typography";

// Components
import { Layout } from "../../components";

// Hooks
import { useCyberConnect } from "../../hooks";

export default function Profile() {
  const router = useRouter();

  const { account } = useWeb3React();
  const { cyberConnect, initializing } = useCyberConnect();

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
    </Layout>
  );
}
