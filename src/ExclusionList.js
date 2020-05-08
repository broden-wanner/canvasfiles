import React, { useState } from 'react';
import {
  List,
  ListItem,
  ListItemIcon,
  Checkbox,
  ListItemText,
  Divider,
  Typography,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  title: {
    marginLeft: theme.spacing(2),
  },
  list: {
    width: '100%',
  },
}));

export default function ExclusionList() {
  const classes = useStyles();
  const excludeList = ['*.docx', '*.pdf', '*.mp4', '*.mp3', '*.pptx'];
  const [checked, setChecked] = useState([]);

  const handleToggle = (ext) => {
    const currentIndex = checked.indexOf(ext);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(ext);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <React.Fragment>
      <List dense component="div" role="list" className={classes.list}>
        {excludeList.map((ext, i) => {
          return (
            <React.Fragment>
              <ListItem key={i} role="listitem" button onClick={() => handleToggle(ext)}>
                <ListItemIcon>
                  <Checkbox
                    checked={checked.includes(ext)}
                    tabIndex={-1}
                    inputProps={{ 'aria-labelledby': ext }}
                  />
                </ListItemIcon>
                <ListItemText id={ext} primary={ext} />
              </ListItem>
              {i !== excludeList.length - 1 && <Divider />}
            </React.Fragment>
          );
        })}
        <ListItem />
      </List>
    </React.Fragment>
  );
}
