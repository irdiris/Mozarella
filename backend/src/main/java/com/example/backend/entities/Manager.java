package com.example.backend.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;

@Entity
@Table(name = "employee", schema = "EmployeeManagement")
@Data
public class Manager {

    @Id
    private Long id;

    @OneToOne
    @MapsId("id")
    private User user;


    @OneToOne
    @JoinColumn(name = "ManagedDepratment")
    private Department ManagedDepartment;



}
