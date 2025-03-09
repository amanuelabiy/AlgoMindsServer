import { Submission } from "@prisma/client";
import { SubmissionRepository } from "./submission.repository";

export class SubmissionService {
  private submissionRepository: SubmissionRepository;

  constructor(submissionRepository: SubmissionRepository) {
    this.submissionRepository = submissionRepository;
  }

  // public async getSubmission(
  //   submissionId: number,
  //   userId: string
  // ): Promise<Submission> {
  //   const submission = await this.submissionRepository.findById(
  //     submissionId,
  //     userId
  //   );

  //   if (!submission) {
  //     throw new Error(
  //       `Submission with submissionId ${submissionId} not found for userId ${userId}`
  //     );
  //   }
  //   return submission;
  // }

  // public async submitSubmission(
  //   submission: string,
  //   userId: string,
  //   problemId: string
  // ) {
  //   const submit = await this.submissionRepository.addSubmission(
  //     submission,
  //     userId,
  //     problemId
  //   );
  // }
}
