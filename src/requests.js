const API_URL = 'https://canvas.umn.edu/api/v1';

/**
 * GETs the list of active classes
 * @returns {Promise} - a promise containing the list of classes
 */
export function getClasses() {
  const url = new URL(`${API_URL}/courses`);
  url.searchParams.append('enrollment_type', 'student');
  url.searchParams.append('enrollment_state', 'active');
  url.searchParams.append('per_page', '100');

  const request = fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  }).then((response) => response.json());
  return request;
}
