package com.example.backend.entities;

import com.example.backend.enums.UserTypes;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Set;

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

    @OneToMany(mappedBy = "employee_id", cascade = CascadeType.ALL)
    private Set<EmployeeTasks> employeeTasks;

    @Enumerated
    private UserTypes userType;

}
