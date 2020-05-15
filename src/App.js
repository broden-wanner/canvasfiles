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
import Stats from './Stats';
import AllFiles from './AllFiles';

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
    height: '90%',
    overflowY: 'auto',
  },
}));

function App() {
  const [courses, setCourses] = useState([]);
  const [files, setFiles] = useState({});
  const [excludedExtensions, setExcludedExtensions] = useState([]);
  const [excludedCourses, setExcludedCourses] = useState([]);
  const [filesToDownload, setFilesToDownload] = useState([]);
  const classes = useStyles();

  /**
   * Returns a string for the size of the file
   * @param {number} s - size of file in bytes
   */
  const fileSize = (s) => {
    const mbs = s / 1e6;
    if (mbs < 1.0) {
      return `${Math.round(s / 1e3)} kB`;
    } else {
      return `${Math.round(mbs)} MB`;
    }
  };

  /**
   * Gets the list of all active courses
   * @param {function} callback - function to run after the course list is retrieved
   */
  const retrieveCourseList = async (callback) => {
    const courseList = await getClasses();
    setCourses(courseList);
    callback(courseList);
  };

  /**
   * Gets the files for an array of courses
   * @param {Array[Course]} courses - the list of courses for which to get the course files
   */
  const retrieveCourseFiles = async (courses) => {
    const idsToFiles = {};
    for (const course of courses) {
      getCourseFiles(course.id).then((fileList) => {
        idsToFiles[course.id] = fileList.map((f) => {
          // Add the course id to the file
          f['courseId'] = course.id;
          // Create the size to display
          f['displaySize'] = fileSize(f.size);
          return f;
        });
        setFiles({ ...idsToFiles });
      });
    }
  };

  /**
   * To be used in useEffect, it updates the list of files to download based on what is excluded
   */
  const updateFilesToDownload = () => {
    let dl = [];
    for (const id in files) {
      if (!excludedCourses.includes(+id)) {
        dl = [...dl, ...files[+id]];
      }
    }
    setFilesToDownload(dl);
  };

  const extensions = ['docx', 'pdf', 'mp4', 'mp3', 'pptx', 'png', 'jpg', 'jpeg'];

  /**
   * Handles excluding a course from downloads
   * @param {number} cid - the id of the course to exclude
   */
  const handleExcludeCourse = (cid) => {
    const currentIndex = excludedCourses.indexOf(cid);
    const newExcluded = [...excludedCourses];

    if (currentIndex === -1) {
      newExcluded.push(cid);
    } else {
      newExcluded.splice(currentIndex, 1);
    }

    setExcludedCourses(newExcluded);
  };

  /**
   * Handles excluding an extension type from the downloads
   * @param {string} ext - the extension to exclude
   */
  const handleExcludeExtension = (ext) => {
    const currentIndex = excludedExtensions.indexOf(ext);
    const newExcluded = [...excludedExtensions];

    if (currentIndex === -1) {
      newExcluded.push(ext);
    } else {
      newExcluded.splice(currentIndex, 1);
    }

    setExcludedExtensions(newExcluded);
  };

  /**
   * Use the global togglePanel function defined in content.js to close it
   */
  const onClose = () => {
    togglePanel(); // eslint-disable-line
  };

  // Retrieve the course list and files on initialization
  useEffect(() => {
    retrieveCourseList(retrieveCourseFiles);
  }, []);

  // Update the files to download when the following change
  useEffect(() => {
    updateFilesToDownload();
  }, [courses, files, excludedCourses, excludedExtensions]);

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
        <Stats
          courses={courses}
          files={files}
          excludedCourses={excludedCourses}
          excludedExtensions={excludedExtensions}
          filesToDownload={filesToDownload}
        />

        <ExpansionPanel defaultExpanded={true}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>Course List</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <CourseList
              courses={courses}
              files={files}
              excludedCourses={excludedCourses}
              handleExcludeCourse={handleExcludeCourse}
            />
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
            <ExclusionList
              extensions={extensions}
              excludedExtensions={excludedExtensions}
              handleExcludeExtension={handleExcludeExtension}
            />
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel defaultExpanded={false}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>Files to Download</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <AllFiles courses={courses} filesToDownload={filesToDownload} />
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    </div>
  );
}

export default App;
