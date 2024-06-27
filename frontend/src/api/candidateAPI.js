import axios from "axios";

const API_URL = "http://localhost:3001/api/candidates";

export const upsertCandidate = async (candidate) => {
  const response = await axios.post(API_URL, candidate);
  return response.data;
};

export const getCandidateByEmail = async (email) => {
  const response = await axios.get(`${API_URL}/${email}`);
  return response.data;
};
