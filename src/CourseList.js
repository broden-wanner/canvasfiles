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
}));

function CourseList({ courses, files, excludedCourses, handleExcludeCourse }) {
  const classes = useStyles();

  const numFiles = (id) => {
    if (files && id && files[id] && files[id].length > 0) {
      return `${files[id].length} files`;
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
                <ListItem
                  key={c.id}
                  role="listitem"
                  button
                  onClick={() => handleExcludeCourse(c.id)}
                >
                  <ListItemIcon>
                    <Checkbox
                      checked={excludedCourses.includes(c.id)}
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
  courses: PropTypes.array.isRequired,
  files: PropTypes.object.isRequired,
  excludedCourses: PropTypes.array.isRequired,
  handleExcludeCourse: PropTypes.func.isRequired,
};

export default CourseList;
