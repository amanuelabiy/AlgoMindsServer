package com.algo_rivals.AlgoRivals.problem.model;

import java.sql.Date;

import org.springframework.stereotype.Component;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Component
@Entity
@Table(name = "problem")
public class Problem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(unique = true, nullable = false)
    private String slug;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String difficulty;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    @Column(name = "answer_cplusplus", columnDefinition = "TEXT")
    private String answerCplusplus;

    @Column(name = "answer_java", columnDefinition = "TEXT")
    private String answerJava;

    @Column(name = "answer_python", columnDefinition = "TEXT")
    private String answerPython;

    @Column(name = "answer_javascript", columnDefinition = "TEXT")
    private String answerJavascript;

    @Column(columnDefinition = "TEXT")
    private String explanation;

    // Default constructor
    public Problem() {
    }

    // Optional: constructor with fields (except id)
    public Problem(String slug, String title, String difficulty, String content,
            String answerCplusplus, String answerJava, String answerPython,
            String answerJavascript, String explanation) {
        this.slug = slug;
        this.title = title;
        this.difficulty = difficulty;
        this.content = content;
        this.answerCplusplus = answerCplusplus;
        this.answerJava = answerJava;
        this.answerPython = answerPython;
        this.answerJavascript = answerJavascript;
        this.explanation = explanation;
    }

    // Getters and Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getSlug() {
        return slug;
    }

    public void setSlug(String slug) {
        this.slug = slug;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(String difficulty) {
        this.difficulty = difficulty;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getAnswerCplusplus() {
        return answerCplusplus;
    }

    public void setAnswerCplusplus(String answerCplusplus) {
        this.answerCplusplus = answerCplusplus;
    }

    public String getAnswerJava() {
        return answerJava;
    }

    public void setAnswerJava(String answerJava) {
        this.answerJava = answerJava;
    }

    public String getAnswerPython() {
        return answerPython;
    }

    public void setAnswerPython(String answerPython) {
        this.answerPython = answerPython;
    }

    public String getAnswerJavascript() {
        return answerJavascript;
    }

    public void setAnswerJavascript(String answerJavascript) {
        this.answerJavascript = answerJavascript;
    }

    public String getExplanation() {
        return explanation;
    }

    public void setExplanation(String explanation) {
        this.explanation = explanation;
    }
}
