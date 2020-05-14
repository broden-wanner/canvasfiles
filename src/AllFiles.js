import React from 'react';
import { List, ListItem, ListItemText, Divider, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  list: {
    width: '100%',
  },
  item: {
    overflow: 'hidden',
  },
}));

function AllFiles({ courses, filesToDownload }) {
  const classes = useStyles();

  const fileSize = (s) => {
    return `${s % 1000} MB`;
  };

  return (
    <React.Fragment>
      <List className={classes.list} dense component="div" role="list">
        {filesToDownload &&
          filesToDownload.map((f, i) => {
            return (
              <React.Fragment>
                <ListItem className={classes.item} key={f.id} role="listitem" button>
                  <ListItemText id={f.id} primary={`${f.display_name} (${fileSize(f.size)})`} />
                </ListItem>
                {i !== filesToDownload.length - 1 && <Divider />}
              </React.Fragment>
            );
          })}
        <ListItem />
      </List>
    </React.Fragment>
  );
}

AllFiles.propTypes = {
  courses: PropTypes.array.isRequired,
  filesToDownload: PropTypes.array.isRequired,
};

export default AllFiles;
