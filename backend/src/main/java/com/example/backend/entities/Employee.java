package com.example.backend.entities;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "employee", schema = "EmployeeManagement")
@Data
public class Employee {


    @Id
    private Long id;

    @MapsId("id")
    @OneToOne
    private User user;

    @ManyToOne()
    @JoinColumn(name = "department_id")
    private  Department department;




}
