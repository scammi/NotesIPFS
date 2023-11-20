import { createContext, useContext, useEffect, useState } from 'react';

import { createWalletClient, custom } from 'viem';
import { mainnet } from 'viem/chains';

const initialState = {
  client: {},
}

export const Web3Context = createContext(initialState);

export const useWeb3Context = () => {
  return useContext(Web3Context);
}

export const Web3ContextProvider = ({ children }) => {
  const [ web3, setWeb3 ] = useState(initialState);

  useEffect(() => {
    const client = createWalletClient({
      chain: mainnet,
      transport: custom(window.ethereum)
    });

    setWeb3({ client })

  }, []);

  return(
  <Web3Context.Provider value={[ web3, setWeb3 ]}>
    {children}
  </Web3Context.Provider>
  );
}



export const useWallet = () => {
  // const client = createWalletClient({
  //   chain: mainnet,
  //   transport: custom(window.ethereum)
  // });

  // return client;
}





