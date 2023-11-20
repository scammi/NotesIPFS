import { createContext, useContext, useState } from 'react';

import { createWalletClient, custom } from 'viem';
import { mainnet } from 'viem/chains';

const initialState = {
  client: {},
  user: '',
}

export const Web3Context = createContext(initialState);

export const useWeb3Context = () => {
  return useContext(Web3Context);
}

export const Web3ContextProvider = ({ children }) => {
  const [ web3state, setWeb3state ] = useState(initialState);

  return(
  <Web3Context.Provider value={[ web3state, setWeb3state ]}>
    {children}
  </Web3Context.Provider>
  );
}

export const useWallet = () => {
  const client = createWalletClient({
    chain: mainnet,
    transport: custom(window.ethereum)
  });

  return client;
}





