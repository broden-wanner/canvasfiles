import React, { useState, useEffect } from 'react';

export default function Stats({ courses, files, excludedCourses, excludedExtensions }) {
  const [downloadList, setDownloadList] = useState([]);

  const updateDownloadList = () => {
    let dl = [];
    for (const id in files) {
      if (!excludedCourses.includes(id)) {
        dl = [...dl, ...files[id]];
      }
    }
    setDownloadList([...dl]);
  };

  useEffect(() => {
    updateDownloadList();
  }, [courses, files, excludedCourses, excludedExtensions]);

  return <div></div>;
}
