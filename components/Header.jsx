import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';

import { useWeb3Context } from '../context/Web3';

const AppHeader = () => {
  const [ web3, connect ] = useWeb3Context();

  return (
    <Box sx={{ flexGrow: 1, pb: 5 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <RocketLaunchIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
           IPFS Notes 
          </Typography>
          <Button variant="contained" onClick={async() => await connect()}>
             {Boolean(web3.user) ? getShortAddress(web3.user) : 'Connect'}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

const getShortAddress = (address, prefixLength = 7, suffixLength = 4) => {
  if (address.length < prefixLength + suffixLength) {
      return address; // Return the full address if it's too short
  }

  const prefix = address.slice(0, prefixLength);
  const suffix = address.slice(-suffixLength);

  return `${prefix}...${suffix}`;
}

export default AppHeader;