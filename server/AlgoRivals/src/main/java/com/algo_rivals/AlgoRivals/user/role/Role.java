package com.algo_rivals.AlgoRivals.user.role;


import com.algo_rivals.AlgoRivals.user.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "_role")
@EntityListeners(AuditingEntityListener.class)
public class Role {

    //TODO 57:00

    @Id
    @GeneratedValue
    private Integer id;
    @Column(unique = true)
    private String name;
    @ManyToMany(mappedBy = "roles")
    @JsonIgnore // Prevents infinite loop during JSON serialization
    private List<User> users;

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdDate;
    @LastModifiedDate
    @Column(insertable = false) // When we create a new record we don't want to insert/initialize the value of this attribute
    private LocalDateTime lastModifiedDate;


}
