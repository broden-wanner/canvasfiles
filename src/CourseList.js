import React, { useState } from 'react';
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
}));

function CourseList({ courses, files }) {
  const [checked, setChecked] = useState([]);
  const classes = useStyles();

  const handleToggle = (id) => {
    const currentIndex = checked.indexOf(id);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(id);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const numFiles = (id) => {
    if (files && id && files[String(id)] && files[String(id)].length > 0) {
      return `${files[String(id)].length} files`;
    }
    return 'No files';
  };

  return (
    <React.Fragment>
      <List dense component="div" role="list">
        {courses &&
          courses.map((c, i) => {
            return (
              <React.Fragment>
                <ListItem key={c.id} role="listitem" button onClick={() => handleToggle(c.id)}>
                  <ListItemIcon>
                    <Checkbox
                      checked={checked.includes(c.id)}
                      tabIndex={-1}
                      inputProps={{ 'aria-labelledby': c.id }}
                    />
                  </ListItemIcon>
                  <ListItemText id={c.id} primary={`${c.name} (${numFiles(c.id)})`} />
                </ListItem>
                {i !== courses.length - 1 && <Divider />}
              </React.Fragment>
            );
          })}
        <ListItem />
      </List>
    </React.Fragment>
  );
}

CourseList.propTypes = {
  courses: PropTypes.array,
  files: PropTypes.object,
};

export default CourseList;
