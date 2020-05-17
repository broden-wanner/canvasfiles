import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, makeStyles } from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import PropTypes from 'prop-types';

const useStyle = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  bar: {
    backgroundColor: 'var(--ic-brand-global-nav-bgd)',
  },
}));

function Navbar({ onClose }) {
  const classes = useStyle();

  return (
    <AppBar className={classes.bar} position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Canvas Files
        </Typography>
        <IconButton edge="end" onClick={onClose} color="inherit" aria-label="collapse">
          <ArrowForwardIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

Navbar.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default Navbar;
