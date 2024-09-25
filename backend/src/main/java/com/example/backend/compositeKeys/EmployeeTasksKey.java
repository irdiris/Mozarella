package com.example.backend.compositeKeys;

import com.example.backend.entities.Task;
import com.example.backend.entities.User;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.io.Serializable;
@Embeddable
@EqualsAndHashCode
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeTasksKey implements Serializable {

    @Column(name = "employee_id")
    private Long employee_id;

    @Column(name = "task_id")
    private Long task_id;
}
