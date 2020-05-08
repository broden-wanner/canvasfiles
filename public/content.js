'use strict';

console.log('Extension works');

const request = new Request('https://canvas.umn.edu/api/v1/courses', {
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

fetch('https://canvas.umn.edu/api/v1/courses', {
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})
  .then((response) => response.json())
  .then((classes) => console.log(classes));
