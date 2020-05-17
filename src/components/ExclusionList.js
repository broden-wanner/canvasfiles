import React from 'react';
import {
  List,
  ListItem,
  ListItemIcon,
  Checkbox,
  ListItemText,
  Divider,
  makeStyles,
} from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  title: {
    marginLeft: theme.spacing(2),
  },
  list: {
    width: '100%',
  },
  item: {
    padding: 0,
  },
}));

function ExclusionList({ extensions, excludedExtensions, handleExcludeExtension }) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <List dense component="div" role="list" className={classes.list}>
        {extensions &&
          extensions.map((ext, i) => {
            return (
              <React.Fragment>
                <ListItem
                  key={i}
                  className={classes.item}
                  role="listitem"
                  button
                  onClick={() => handleExcludeExtension(ext)}
                >
                  <ListItemIcon>
                    <Checkbox
                      checked={excludedExtensions.includes(ext)}
                      tabIndex={-1}
                      inputProps={{ 'aria-labelledby': ext }}
                    />
                  </ListItemIcon>
                  <ListItemText id={ext} primary={ext} />
                </ListItem>
                {i !== extensions.length - 1 && <Divider />}
              </React.Fragment>
            );
          })}
        <ListItem />
      </List>
    </React.Fragment>
  );
}

ExclusionList.propTypes = {
  extensions: PropTypes.array.isRequired,
  excludedExtensions: PropTypes.array.isRequired,
  handleExcludeExtension: PropTypes.func.isRequired,
};

export default ExclusionList;
