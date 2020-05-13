const API_URL = 'https://canvas.umn.edu/api/v1';

/**
 * Sends a GET request to retrieve the list of active classes
 * @returns {Promise} - a promise containing the list of classes
 */
export function getClasses() {
  const url = new URL(`${API_URL}/courses`);
  url.searchParams.append('enrollment_type', 'student');
  url.searchParams.append('enrollment_state', 'active');
  url.searchParams.append('per_page', '100');

  return fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  }).then((response) => response.json());
}

/**
 * Sends a GET requests to list all the files for the course with id `id`
 * @param {string} id - The id of the course from which to get the files
 */
export function getFiles(id) {
  const url = new URL(`${API_URL}/courses/${id}/files`);
  url.searchParams.append('per_page', '1000');

  return fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  }).then((response) => response.json());
}
