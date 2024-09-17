import sendRequest from "./sendRequest";

const BASE_URL = "/api/workouts";

export async function getAll() {
  return sendRequest(BASE_URL);
}

export async function create(newWorkoutData) {
  return sendRequest(`${BASE_URL}`, "POST", newWorkoutData);
}

export async function getOne(workoutId) {
  return sendRequest(`${BASE_URL}/${workoutId}`);
}