export interface Judge0Result {
  stdout: string | null;
  stderr: string | null;
  time: string | null;
  token: string;
  compile_output: string | null;
  status: {
    id: number;
    description: string;
  };
  message?: string;
}

export interface Judge0BatchSubmissionResponse {
  submissions: Judge0Result[];
}
