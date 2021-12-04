import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";

// Mui
import Typography from "@mui/material/Typography";

// Components
import { Layout } from "../components";

export default function Home() {
  const getLibrary = (provider: any): Web3Provider => {
    const library = new Web3Provider(provider);
    library.pollingInterval = 12000;
    return library;
  };

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Layout>
        <Typography variant="h3" mt={8}>
          Welcome to the Arweave Social dApp
        </Typography>
      </Layout>
    </Web3ReactProvider>
  );
}
