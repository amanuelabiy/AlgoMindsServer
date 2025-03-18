import { submissions } from "@prisma/client";
import prismaClient from "../../config/prismaClient";

export class SubmissionRepository {
  // public async findById(submissionId : number, userId: string): Promise<Submission | null> {
  //     return prismaClient.submission.findUnique({
  //         where: { userId_submissionId: { submissionId, userId: userId } },
  //     });
  // }
  // public async addSubmission(submission: string, userId: string, problemId: string){
  //     console.log("UserID: " + userId);
  //     console.log("Submission: " + submission)
  //     console.log("ProblemID: " + problemId)
  //     const latestSubmission = await prismaClient.submission.findFirst({
  //         where: { userId: userId },
  //         orderBy: { submissionId: "desc" },
  //       });
  //     const nextSubmissionId = latestSubmission ? latestSubmission.submissionId + 1 : 1;
  //     const submit = await prismaClient.submission.create(
  //         {
  //             data: {
  //                 user: { connect: { id: userId } }, // Connect the user relation
  //                 problem: { connect: { id: problemId } }, // Connect the problem relation
  //                 submission: submission,
  //                 submissionId: nextSubmissionId
  //             }
  //         }
  //     )
  //     return submit;
  // }
}
