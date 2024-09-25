package com.example.backend.Services;

import com.example.backend.Interfaces.EmployeeServiceInterface;
import com.example.backend.entities.Employee;
import com.example.backend.repositories.EmployeeRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class EmployeeService implements EmployeeServiceInterface {
    private final EmployeeRepository employeeRepository;
    private final ModelMapper modelMapper;

    public EmployeeService(EmployeeRepository employeeRepository, ModelMapper modelMapper) {
        this.employeeRepository = employeeRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public String addEmployee(Employee employee) {
        employeeRepository.save(employee);
        return "employee added";
    }

    @Override
    public String updateEmployee(Employee employee) {
        Employee toBeUpdated = employeeRepository.findById(employee.getId()).get();
        modelMapper.map(employee, toBeUpdated);
        return "employee updated";
    }

    @Override
    public String deleteEmployee(Employee employee) {
        Employee toBeUpdated = employeeRepository.findById(employee.getId()).orElseThrow(() -> new RuntimeException("Employee not found"));
        employeeRepository.delete(employee);
        return "employee deleted";
    }

    @Override
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }
}
