import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';

export const ButtonAppBar = () => {
  return (
    <AppBar position={'static'}>
      <Toolbar>
        <IconButton edge={'start'} color={'inherit'} aria-label={'music'}>
          <Menu />
        </IconButton>
        <Typography variant={'h6'}>
          Todolist
        </Typography>
        <Button color={'inherit'}>Login</Button>
      </Toolbar>
    </AppBar>
  )
}