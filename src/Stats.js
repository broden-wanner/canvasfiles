import React, { useState, useEffect } from 'react';

export default function Stats({
  courses,
  files,
  excludedCourses,
  excludedExtensions,
  filesToDownload,
}) {
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
    <div>
      <p>Total files to download: {filesToDownload.length}</p>
      <p>
        Courses to exlude:{' '}
        {excludedCourses.length === 0 ? 'None' : excludedCourses.map(nameOf).join(', ')}
      </p>
      <p>
        Extensions to exclude:{' '}
        {excludedExtensions.length === 0 ? 'None' : excludedExtensions.join(', ')}
      </p>
      <p>Size of all files: {sizeOfAllFiles()}</p>
    </div>
  );
}
