package com.example.backend.Interfaces;

import com.example.backend.entities.Department;

import java.util.List;

public interface DepartmentServiceInterface {
    String addDepartment(Department department);
    String updateDepartment(Department department);
    String deleteDepartment(Long id);
    List<Department> getAllDepartments();
}
