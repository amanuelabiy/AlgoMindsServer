package com.algo_rivals.AlgoRivals.submission.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.algo_rivals.AlgoRivals.submission.model.Submission;
import com.algo_rivals.AlgoRivals.submission.repository.SubmissionRepository;

@Service
public class SubmissionService {

    @Autowired
    SubmissionRepository repo;

    public void addSubmission(Submission s) {
        s.setId(0);
        repo.save(s);
    }
}
