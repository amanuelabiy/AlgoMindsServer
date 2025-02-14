package com.algo_rivals.AlgoRivals.submission.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.algo_rivals.AlgoRivals.submission.model.Submission;
import com.algo_rivals.AlgoRivals.submission.service.SubmissionService;

@RestController
@CrossOrigin
public class SubmissionController {

    @Autowired
    SubmissionService service;

    @PostMapping("/submit")
    public void addSubmission(@RequestBody Submission submission) {
        service.addSubmission(submission);
    }

}
