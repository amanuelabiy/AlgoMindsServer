package com.algo_rivals.AlgoRivals.problem;

import java.sql.Date;

import org.springframework.stereotype.Component;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Component
@Entity
@AllArgsConstructor
@Getter
@Setter
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

}
