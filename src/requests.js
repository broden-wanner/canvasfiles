const API_URL = 'https://canvas.umn.edu/api/v1';

function getClasses() {
  fetch(`${API_URL}/courses`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((response) => response.json())
    .then((classes) => console.log(classes));
}
