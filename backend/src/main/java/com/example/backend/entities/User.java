package com.example.backend.entities;

import ch.qos.logback.core.model.conditional.ElseModel;
import jakarta.persistence.*;
import lombok.Data;
// these two are called annotations and are used to tell spring that this class should be treated in a certain way
// For example these two annotations belong to JPA and mean this class represents a table in the DB
@Entity
@Table (name = "_user", schema = "EmployeeManagement")
// This one is from lombok, and we use it to generate methods for the attributes like getters and setters
@Data
public class User {
    // The Id annotation means this parameter is the primary key for this table
    @Id
    // This one means that we don't input the value for this parameter and is generated automatically
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    // TODO  fill the rest of the parameters from the diagram we made
    @OneToOne(mappedBy = "user")
    @PrimaryKeyJoinColumn
    private Manager manager;
    @OneToOne(mappedBy = "user")
    @PrimaryKeyJoinColumn
    private Employee employee;


}
