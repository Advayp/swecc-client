import { DetailedResponse, Interview, InterviewAvailability } from '../types';
import api from './api';

export async function getInterviewsForUser(): Promise<Interview[]> {
  const res = await api.get('/interview/interviews');

  return res.data;
}

export async function getInterviewById(
  interviewId: string
): Promise<Interview> {
  const res = await api.get(`/interview/interviews/${interviewId}`);

  return res.data;
}

export async function getInterviewAvailabilityForCurrentUser(): Promise<InterviewAvailability> {
  const res = await api.get('/interview/availability');
  return res.data;
}

export async function getInterviewAvailabilityForUser(
  userId: number
): Promise<InterviewAvailability> {
  return new Promise((resolve, reject) => {
    reject('Not implemented');
  });
}

export async function updateInterviewAvailabilityForCurrentUser(
  availability: InterviewAvailability
): Promise<InterviewAvailability> {
  const res = await api.put('/interview/availability', availability);

  return res.data;
}

export async function isCurrentUserSignedUpForInterviewPool(): Promise<boolean> {
  const res = await api.get('/interview/pool/');

  return res.data.sign_up;
}

export async function signupCurrentUserForInterviewPool(
  availability: InterviewAvailability
): Promise<DetailedResponse> {
  const res = await api.post('/interview/pool/', availability);

  return res.data;
}

export async function unsignupCurrentUserForInterviewPool(): Promise<DetailedResponse> {
  const res = await api.delete('/interview/pool/');

  return res.data;
}
