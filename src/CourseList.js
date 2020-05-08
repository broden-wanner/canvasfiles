import React, { useState, useEffect } from 'react';
import { getClasses } from './requests';
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
}));

export default function CourseList() {
  const [courses, setCourses] = useState([]);
  const [checked, setChecked] = useState([]);
  const classes = useStyles();

  const getCourseList = async () => {
    const courses = await getClasses();
    setCourses(courses);
  };

  useEffect(() => {
    getCourseList();
  }, [courses]);

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

  return (
    <React.Fragment>
      <List dense component="div" role="list">
        {courses.map((c, i) => {
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
                <ListItemText id={c.id} primary={c.name} />
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
