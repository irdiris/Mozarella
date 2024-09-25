package com.example.backend.entities;

import com.example.backend.enums.TaskStatus;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.Set;

// these two are called annotations and are used to tell spring that this class should be treated in a certain way
// For example these two annotations belong to JPA and mean this class represents a table in the DB
@Entity
@Table (name = "task", schema = "EmployeeManagement")
// This one is from lombok, and we use it to generate methods for the attributes like getters and setters
@Data
public class Task {
    // The Id annotation means this parameter is the primary key for this table
    @Id
    // This one means that we don't input the value for this parameter and is generated automatically
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String description;
    // LocalDate is a class that represents dates in java
    @Temporal(TemporalType.DATE)
    private LocalDate deadline;
    // Enums or enumerations are fixed and constant values that we generally use to represent values that never change like days, or represent the state of an object like we're doing here
    private Enum<TaskStatus> status;


    @ManyToOne()
    @JoinColumn(name = "departement_id")
    private Department department;

    @OneToMany(mappedBy = "task_id", cascade = CascadeType.ALL)
    private Set<EmployeeTasks> employeeTasks;

}
