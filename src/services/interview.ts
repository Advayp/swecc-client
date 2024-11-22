import {
  DetailedResponse,
  Interview,
  InterviewAvailability,
  RawInterviewData,
  RawInterviewAvailabilityData,
  HydratedInterview,
  RawMemberData,
  RawInterViewPoolStatus,
  InterviewPoolStatus,
} from "../types";
import api from "./api";
import { deserializeMember } from "./member";
import {
  deserializeTechnicalQuestion,
  deserializeBehavioralQuestion,
} from "./question";

function deserializeInterviewPoolStatus(
  data: RawInterViewPoolStatus
): InterviewPoolStatus {
  return {
    numberSignUp: data.number_sign_up,
    members: data.members,
  } as InterviewPoolStatus;
}

function deserializeInterview({
  interview_id: interviewId,
  date_effective: dateEffective,
  date_completed: dateCompleted,
  technical_questions: technicalQuestions,
  behavioral_questions: behavioralQuestions,
  ...rest
}: RawInterviewData): Interview {
  return {
    ...rest,
    interviewId,
    dateEffective,
    dateCompleted,
    technicalQuestions:
      technicalQuestions?.map(deserializeTechnicalQuestion) || [],
    behavioralQuestions:
      behavioralQuestions?.map(deserializeBehavioralQuestion) || [],
  };
}

function deserializeInterviewAvailability(
  data: RawInterviewAvailabilityData
): InterviewAvailability {
  return {
    userId: data.user_id,
    availability: data.availability,
  };
}

export async function getInterviewsForUser(): Promise<Interview[]> {
  const res = await api.get("/interview/interviews/");

  return res.data.map(deserializeInterview);
}

interface InterviewsResponse {
  interviews: Array<
    RawInterviewData & {
      interviewer: RawMemberData;
      interviewee: RawMemberData;
    }
  >;
}

export async function getInterviewsHydratedForUser(): Promise<
  Array<HydratedInterview>
> {
  return api.get<InterviewsResponse>("/interview/all/details").then((res) =>
    res.data.interviews.map((interview) => ({
      ...deserializeInterview(interview),
      interviewer: deserializeMember(interview.interviewer),
      interviewee: deserializeMember(interview.interviewee),
    }))
  );
}

export async function getInterviewById(
  interviewId: string
): Promise<Interview> {
  return api
    .get(`/interview/interviews/${interviewId}/`)
    .then((res) => res.data)
    .then(deserializeInterview);
}

export async function getInterviewAvailabilityForCurrentUser(): Promise<InterviewAvailability> {
  return api
    .get("/interview/availability/")
    .then((res) => res.data)
    .then(deserializeInterviewAvailability);
}

export async function getInterviewAvailabilityForUser(
  userId: number
): Promise<InterviewAvailability> {
  return api
    .get(`/interview/availability/${userId}/`)
    .then((res) => res.data)
    .then(deserializeInterviewAvailability);
}

export async function updateInterviewAvailabilityForCurrentUser(
  availability: InterviewAvailability
): Promise<InterviewAvailability> {
  return api
    .put("/interview/availability/", availability)
    .then((res) => res.data)
    .then(deserializeInterviewAvailability);
}

export async function isCurrentUserSignedUpForInterviewPool(): Promise<boolean> {
  return api.get("/interview/pool/").then((res) => res.data.sign_up);
}

export async function signupCurrentUserForInterviewPool(
  availability: InterviewAvailability
): Promise<DetailedResponse> {
  return api.post("/interview/pool/", availability).then((res) => res.data);
}

export async function deleteCurrentUserFromInterviewPool(): Promise<DetailedResponse> {
  return api.delete("/interview/pool/").then((res) => res.data);
}

export async function getInterviewPoolStatus(): Promise<InterviewPoolStatus> {
  return api
    .get("/interview/status")
    .then((res) => deserializeInterviewPoolStatus(res.data));
}
