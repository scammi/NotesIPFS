import React, { useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';

import { createWalletClient, custom } from 'viem';
import { mainnet } from 'viem/chains';

const AppHeader = () => {
  useEffect(() => {
    console.log('asdf')
  }, []);

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
          <Button variant="contained" onClick={() => console.log('Click')}>
            Connect
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default AppHeader;