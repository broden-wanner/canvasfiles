import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CourseList from './CourseList';
import ExclusionList from './ExclusionList';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';
import { getClasses, getCourseFiles } from './requests';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#f5f5f5',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  main: {
    padding: theme.spacing(2),
  },
}));

function App() {
  const [courses, setCourses] = useState([]);
  const [files, setFiles] = useState({});
  const classes = useStyles();

  const retrieveCourseList = async (callback) => {
    const courseList = await getClasses();
    setCourses(courseList);
    callback(courseList);
  };

  const retrieveCourseFiles = async (courses) => {
    const idsToFiles = {};
    for (const course of courses) {
      getCourseFiles(course.id).then((fileList) => {
        idsToFiles[String(course.id)] = fileList;
        setFiles({ ...idsToFiles });
      });
    }
  };

  useEffect(() => {
    retrieveCourseList(retrieveCourseFiles);
  }, []);

  const onClose = () => {
    // Use the global togglePanel function to close it
    togglePanel(); // eslint-disable-line
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Canvas Files
          </Typography>
          <IconButton
            edge="end"
            onClick={onClose}
            className={classes.closeButton}
            color="inherit"
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <div className={classes.main}>
        <ExpansionPanel defaultExpanded={true}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>Course List</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <CourseList courses={courses} files={files} />
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>File Types to Exlcude</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <ExclusionList />
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    </div>
  );
}

export default App;
