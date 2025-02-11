package com.algo_rivals.AlgoRivals.problem;

import java.sql.Date;

import org.springframework.stereotype.Component;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Component
@Entity
public class Problem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int problem_id;
    private String title;
    private String description;
    private String[] test_cases;
    private String[] tags;
    private boolean completed;
    private Date completed_at;

    public int getProblem_id() {
        return problem_id;
    }

    public void setProblem_id(int problem_id) {
        this.problem_id = problem_id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String[] getTest_cases() {
        return test_cases;
    }

    public void setTest_cases(String[] test_cases) {
        this.test_cases = test_cases;
    }

    public String[] getTags() {
        return tags;
    }

    public void setTags(String[] tags) {
        this.tags = tags;
    }

    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }

    public Date getCompleted_at() {
        return completed_at;
    }

    public void setCompleted_at(Date completed_at) {
        this.completed_at = completed_at;
    }

    public Problem(int problem_id, String title, String description, String[] test_cases, String[] tags,
            boolean completed, Date completed_at) {
        this.problem_id = problem_id;
        this.title = title;
        this.description = description;
        this.test_cases = test_cases;
        this.tags = tags;
        this.completed = completed;
        this.completed_at = completed_at;
    }

    public Problem() {

    }
}
