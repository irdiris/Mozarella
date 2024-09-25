package com.example.backend.controllers;

import com.example.backend.Interfaces.DepartmentServiceInterface;
import com.example.backend.Interfaces.ManagerServiceInterface;
import com.example.backend.Services.DepartmentService;
import com.example.backend.Services.ManagerService;
import com.example.backend.entities.Department;
import com.example.backend.entities.Manager;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.time.format.DecimalStyle;
import java.util.List;

@Controller
public class AdminController {
    private final DepartmentServiceInterface departmentService;
    private final ManagerServiceInterface managerService;

    public AdminController(DepartmentService departmentService, ManagerService managerService) {
        this.departmentService = departmentService;
        this.managerService = managerService;
    }

    @GetMapping("/Departments")
    public ResponseEntity<List<Department>> getDepartments() {
        List<Department> departmentList = departmentService.getAllDepartments();
        return new ResponseEntity<>(departmentList, HttpStatus.OK);
    }
    @GetMapping("/Managers")
    public ResponseEntity<List<Manager>> getManagers() {
        List<Manager> managerList = managerService.getAllManagers();
        return new ResponseEntity<>(managerList, HttpStatus.OK);
    }
    @PostMapping("/addManager")
    public ResponseEntity<String> addManager(@RequestBody Manager manager) {
        String response = managerService.addManger(manager);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @PostMapping("/addDepartment")
    public ResponseEntity<String> addDepartment(@RequestBody Department department) {
        String response = departmentService.addDepartment(department);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @PostMapping("/updateDepartment")
    public ResponseEntity<String> updateDepartment(@RequestBody Department department) {
        String response = departmentService.updateDepartment(department);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @PostMapping("/updateManager")
    public ResponseEntity<String> updateManager(@RequestBody Manager manager) {
        String response = managerService.updateManger(manager);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @PostMapping("/deleteManager")
    public ResponseEntity<String> deleteManager(@RequestBody Manager manager) {
        String response = managerService.deleteManger(manager);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @PostMapping("/deleteDepartment")
    public ResponseEntity<String> deleteDepartment(@RequestBody Department department) {
        String response = departmentService.deleteDepartment(department.getId());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
