import React from 'react';
import { makeStyles, Typography, Container } from '@material-ui/core';

const useStyle = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(2),
  },
}));

export default function Stats({
  courses,
  files,
  excludedCourses,
  excludedExtensions,
  filesToDownload,
}) {
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
        <em>Total files to download:</em> {filesToDownload.length}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        <em>Courses to exlude: </em>
        {excludedCourses.length === 0 ? 'None' : excludedCourses.map(nameOf).join(', ')}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        <em>Extensions to exclude: </em>
        {excludedExtensions.length === 0 ? 'None' : excludedExtensions.join(', ')}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        <em>Size of all files:</em> {sizeOfAllFiles()}
      </Typography>
    </div>
  );
}