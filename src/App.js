import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import {
  Typography,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Button,
  Container,
  Slide,
  ThemeProvider,
  createMuiTheme,
} from '@material-ui/core';
import { getClasses, getCourseFiles } from './services/requests';
import CourseList from './components/CourseList';
import ExclusionList from './components/ExclusionList';
import Stats from './components/Stats';
import AllFiles from './components/AllFiles';
import { storageSet, storageGet, addMessageListener, downloadFiles } from './services/chromeapi';
import { testfiles, testcourses } from './testdata';
import TopBar from './components/TopBar';

const primaryColor = getComputedStyle(document.body)
  .getPropertyValue('--ic-brand-global-nav-bgd')
  .trim();
const secondaryColor = getComputedStyle(document.body)
  .getPropertyValue('--ic-brand-global-nav-menu-item__badge-bgd')
  .trim();

const customTheme = createMuiTheme({
  palette: {
    primary: {
      main: primaryColor,
    },
    secondary: {
      main: secondaryColor,
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#f5f5f5',
  },
  main: {
    padding: theme.spacing(2),
    height: '90%',
    overflowY: 'auto',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  container: {
    padding: theme.spacing(2),
  },
  panels: {
    padding: '0 10px',
    maxHeight: 'inherit',
  },
}));

function App() {
  const [expanded, setExpanded] = useState(false);
  const [courses, setCourses] = useState(testcourses);
  const [files, setFiles] = useState(testfiles);
  const [excludedExtensions, setExcludedExtensions] = useState([]);
  const [excludedCourses, setExcludedCourses] = useState([]);
  const [filesToDownload, setFilesToDownload] = useState([]);
  const classes = useStyles();

  // Add toggle listener for the entire side panel
  addMessageListener('toggle', () => {
    setExpanded(!expanded);
    storageSet({ open: !expanded });
  });

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
          // Add the course name to the file for display
          f['courseName'] = course.name;
          // Create the size to display
          f['displaySize'] = fileSize(f.size);
          return f;
        });
        setFiles({ ...idsToFiles });
      });
    }
  };

  /**
   * Checks whether a file has a vlid extension
   * @param {string} name - filename
   */
  const validExtension = (name) => {
    for (const ext of excludedExtensions) {
      if (name.endsWith(ext)) {
        return false;
      }
    }
    return true;
  };

  /**
   * To be used in useEffect, it updates the list of files to download based on what is excluded
   */
  const updateFilesToDownload = () => {
    let dl = [];
    for (const id in files) {
      if (!excludedCourses.includes(+id)) {
        for (const f of files[+id]) {
          if (validExtension(f.filename)) {
            dl.push(f);
          }
        }
      }
    }
    setFilesToDownload(dl);
  };

  const extensions = ['docx', 'pdf', 'mp4', 'mp3', 'm4a', 'wav', 'pptx', 'png', 'jpg', 'jpeg'];

  /**
   * Handles excluding a course from downloads
   * @param {number} cid - the id of the course to exclude
   */
  const handleExcludeCourse = (cid) => {
    const currentIndex = excludedCourses.indexOf(cid);
    const newExcluded = [...excludedCourses];

    if (currentIndex === -1) {
      // Add the course to the exlusion list if not in it
      newExcluded.push(cid);
    } else {
      // Remove the course otherwise
      newExcluded.splice(currentIndex, 1);
    }

    setExcludedCourses(newExcluded);
    storageSet({ excludedCourses: newExcluded });
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
    storageSet({ excludedExtensions: newExcluded });
  };

  /**
   * Close the panel and store its state
   */
  const onClose = () => {
    setExpanded(false);
    storageSet({ open: false });
  };

  /**
   * Download all files using the global downloadFiles function
   */
  const downloadAll = () => {
    downloadFiles(filesToDownload);
  };

  // Retrieve the course list and files on initialization
  useEffect(() => {
    // TODO: uncomment this after development
    // retrieveCourseList(retrieveCourseFiles);
    // Retrieve initial values from storage
    storageGet(['excludedExtensions', 'excludedCourses', 'open'], (result) => {
      const { excludedExtensions, excludedCourses, open } = result;
      excludedExtensions && setExcludedExtensions(excludedExtensions);
      excludedCourses && setExcludedCourses(excludedCourses);
      setExpanded(!!open);
    });
  }, []);

  // Update the files to download when the following change
  useEffect(() => {
    updateFilesToDownload();
  }, [courses, files, excludedCourses, excludedExtensions]);

  return (
    <ThemeProvider theme={customTheme}>
      <Slide direction="left" in={expanded}>
        <div className={classes.root}>
          <TopBar onClose={onClose} />

          <div className={classes.main}>
            <div className={classes.container}>
              <Typography variant="body2" color="textSecondary">
                Select the courses to download files from or the file types you wish to exclude.
              </Typography>
            </div>

            <div className={classes.panels}>
              <ExpansionPanel>
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

              <ExpansionPanel>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className={classes.heading}>Files to Download</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={classes.panelDetails}>
                  <AllFiles courses={courses} filesToDownload={filesToDownload} />
                </ExpansionPanelDetails>
              </ExpansionPanel>
            </div>

            <Stats
              courses={courses}
              files={files}
              excludedCourses={excludedCourses}
              excludedExtensions={excludedExtensions}
              filesToDownload={filesToDownload}
            />

            <Container className={classes.buttonContainer}>
              <Button
                variant="contained"
                color="secondary"
                startIcon={<CloudDownloadIcon />}
                onClick={downloadAll}
                className={classes.downloadButton}
              >
                Download Files
              </Button>
            </Container>
          </div>
        </div>
      </Slide>
    </ThemeProvider>
  );
}

export default App;
