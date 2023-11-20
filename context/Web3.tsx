import { createContext, useContext, useEffect, useState } from 'react';

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
  const [ web3, setWeb3 ] = useState(initialState);

  useEffect(() => {
    const client = createWalletClient({
      chain: mainnet,
      transport: custom(window.ethereum)
    });

    setWeb3({ ...web3, client })
  }, []);

  const connect = async () => {
    const [ user ] = await web3.client.requestAddresses();
    setWeb3({ ...web3, user })
  };

  const sign = async () => {
    const signature = await web3.client.signMessage({
      account: web3.user,
      message: { raw: '0x68656c6c6f20776f726c64' }
    });
    console.log(signature);
  };

  return(
    <Web3Context.Provider value={{ web3, connect, sign }}>
      {children}
    </Web3Context.Provider>
  );
}
