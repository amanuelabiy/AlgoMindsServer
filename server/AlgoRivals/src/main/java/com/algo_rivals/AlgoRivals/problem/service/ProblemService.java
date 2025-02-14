package com.algo_rivals.AlgoRivals.problem.service;

import java.util.List;

import com.algo_rivals.AlgoRivals.problem.repository.ProblemRepository;
import com.algo_rivals.AlgoRivals.problem.model.Problem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProblemService {

    @Autowired
    ProblemRepository repo;

    public void updateProblem(Problem p) {
        // TODO Auto-generated method stub
        Problem existingProblem = repo.findById(p.getId())
                .orElseThrow(() -> new RuntimeException("Problem not found with ID: " + p.getId()));

        // Update fields
        existingProblem.setTitle(p.getTitle());

        repo.save(existingProblem);
    }

    public void deleteProblem(Problem p) {
        // TODO Auto-generated method stub
        repo.delete(p);
    }

    public void addProblem(Problem p) {
        // TODO Auto-generated method stub\
        p.setId(0);
        repo.save(p);
    }

    public List<Problem> getProblems() {
        // TODO Auto-generated method stub
        return repo.findAll();
    }

    public Problem getProblem(int problem_id) {
        Problem existingProblem = repo.findById(problem_id)
                .orElseThrow(() -> new RuntimeException("Problem not found with ID: " + problem_id));

        return existingProblem;
    }

    public Problem getRandomProblem() {
        Problem existingProblem = repo.findById((int) Math.random() * 1000)
                .orElseThrow(() -> new RuntimeException("Problem not found"));
        return existingProblem;

    }

}