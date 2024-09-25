package com.example.backend.entities;

import com.example.backend.compositeKeys.EmployeeTasksKey;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "userTasks", schema = "employee_management")
public class EmployeeTasks {

    @EmbeddedId
    private EmployeeTasksKey employeeTasksKey;

    @ManyToOne
    @MapsId("employee_id")
    @JoinColumn(name ="employee_id")
    private Employee employee_id;

    @ManyToOne
    @MapsId("task_id")
    @JoinColumn(name ="task_id")
    private Task task_id;

    @Temporal(TemporalType.DATE)
    private LocalDate submittedDate;

}
