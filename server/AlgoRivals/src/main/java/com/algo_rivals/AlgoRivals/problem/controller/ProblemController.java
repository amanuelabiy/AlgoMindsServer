package com.algo_rivals.AlgoRivals.problem.controller;

import java.util.List;

import com.algo_rivals.AlgoRivals.problem.model.Problem;
import com.algo_rivals.AlgoRivals.problem.service.ProblemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.parameters.RequestBody;

@CrossOrigin
@RestController
public class ProblemController {

    @Autowired
    ProblemService service;

    @GetMapping("/Problems")
    public List<Problem> getProblems() {
        // implement logic to fetch Problems from the database

        return service.getProblems();
    }

    @GetMapping("/Problems/{prodId}")
    public Problem getProblem(@PathVariable int problem_id) {
        return service.getProblem(problem_id);
    }

    @PostMapping("/Problems")
    public void addProblem(@RequestBody Problem p) {
        service.addProblem(p);
    }

    @PutMapping("/Problems")
    public void updateProblem(@RequestBody Problem p) {
        service.updateProblem(p);
    }

    @DeleteMapping("/Problems")
    public void deleteProblem(@RequestBody Problem p) {
        service.deleteProblem(p);
    }
}
