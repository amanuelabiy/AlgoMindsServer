package com.algo_rivals.AlgoRivals.submission.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.algo_rivals.AlgoRivals.submission.model.Submission;

@Repository
public interface SubmissionRepository extends JpaRepository<Submission, Integer> {

}
