import React, { useState, useEffect } from 'react';

export default function Stats({ courses, files, excludedCourses, excludedExtensions }) {
  const [downloadList, setDownloadList] = useState([]);

  /**
   * To be used in useEffect, it updates the list of files to download
   */
  const updateDownloadList = () => {
    let dl = [];
    for (const id in files) {
      if (!excludedCourses.includes(+id)) {
        dl = [...dl, ...files[+id]];
      }
    }
    setDownloadList(dl);
  };

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

  useEffect(() => {
    updateDownloadList();
  }, [courses, files, excludedCourses, excludedExtensions]);

  return (
    <div>
      <div>
        <p>Total files to download: {downloadList.length}</p>
        <p>
          Courses to exlude:{' '}
          {excludedCourses.length === 0 ? 'None' : excludedCourses.map(nameOf).join(', ')}
        </p>
        <p>
          Extensions to exclude:{' '}
          {excludedExtensions.length === 0 ? 'None' : excludedExtensions.join(', ')}
        </p>
      </div>
    </div>
  );
}
