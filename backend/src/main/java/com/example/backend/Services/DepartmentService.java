package com.example.backend.Services;

import com.example.backend.Interfaces.DepartmentServiceInterface;
import com.example.backend.entities.Department;
import com.example.backend.repositories.DepartmentRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class DepartmentService implements DepartmentServiceInterface {
    private final DepartmentRepository departmentRepository;
    private final ModelMapper modelMapper;

    public DepartmentService(DepartmentRepository departmentRepository, ModelMapper modelMapper) {
        this.departmentRepository = departmentRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public String addDepartment(Department department) {
        departmentRepository.save(department);
        return "department added";
    }

    @Override
    public String updateDepartment(Department department) {
        Department oldDepartment = departmentRepository.findById(department.getId()).get();
        modelMapper.map(department, oldDepartment);
        departmentRepository.save(oldDepartment);
        return "department updated";
    }

    @Override
    public String deleteDepartment(Long id) {
        Department department = departmentRepository.findById(id).orElseThrow(() -> new RuntimeException("Department not found"));
        if(department.getEmployees().isEmpty()) {
            departmentRepository.delete(department);
            return "department deleted";
        }else {
            throw new RuntimeException("There are still employees in this department, move them to other departments before deletion");
        }
    }

    @Override
    public List<Department> getAllDepartments() {
        return departmentRepository.findAll();
    }
}
