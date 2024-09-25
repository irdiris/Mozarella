package com.example.backend.Interfaces;

import com.example.backend.entities.Employee;

import java.util.List;

public interface EmployeeServiceInterface {
    String addEmployee(Employee employee);
    String updateEmployee(Employee employee);
    String deleteEmployee(Employee employee);
    List<Employee> getAllEmployees();
}
