import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import CyberConnect, { Blockchain, Env } from "@cyberlab/cyberconnect";

export default function useCyberConnect() {
  const [cyberConnect, setCyberConnect] = useState<CyberConnect | null>(null);
  const { library } = useWeb3React();

  useEffect(() => {
    if (library) {
      const cyberConnect = new CyberConnect({
        namespace: "CyberConnect",
        env: Env.PRODUCTION,
        chain: Blockchain.ETH,
        provider: library,
      });
      return setCyberConnect(cyberConnect);
    }
  }, [library]);

  return { cyberConnect };
}
