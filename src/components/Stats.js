import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyle = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(2),
  },
}));

function Stats({ courses, files, excludedCourses, excludedExtensions, filesToDownload }) {
  const classes = useStyle();

  /**
   * Finds the name of the course with id number `cid`
   * @param {number} cid - course id number
   * @returns a string of the course name
   */
  const nameOf = (cid) => {
    for (const course of courses) {
      if (cid === course.id) {
        return course.name;
      }
    }
    return '';
  };

  /**
   * Computes the size of all the files to download
   */
  const sizeOfAllFiles = () => {
    return `${Math.round(filesToDownload.reduce((size, f) => size + f.size, 0) / 1e6)} MB`;
  };

  return (
    <div className={classes.container}>
      <Typography variant="body2" color="textSecondary">
        <strong>Total files to download:</strong> {filesToDownload.length}
        <br />
        <strong>Courses to exlude: </strong>
        {excludedCourses.length === 0 ? 'None' : excludedCourses.map(nameOf).join(', ')}
        <br />
        <strong>Extensions to exclude: </strong>
        {excludedExtensions.length === 0 ? 'None' : excludedExtensions.join(', ')}
        <br />
        <strong>Size of all files:</strong> {sizeOfAllFiles()}
      </Typography>
    </div>
  );
}

Stats.propTypes = {
  courses: PropTypes.array.isRequired,
  files: PropTypes.object.isRequired,
  excludedCourses: PropTypes.array.isRequired,
  excludedExtensions: PropTypes.array.isRequired,
  filesToDownload: PropTypes.array.isRequired,
};

export default Stats;
