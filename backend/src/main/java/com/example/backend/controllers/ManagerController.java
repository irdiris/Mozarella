package com.example.backend.controllers;


import com.example.backend.Interfaces.DepartmentServiceInterface;
import com.example.backend.Interfaces.EmployeeServiceInterface;
import com.example.backend.Interfaces.ManagerServiceInterface;
import com.example.backend.Interfaces.TaskServiceInterface;
import com.example.backend.Services.DepartmentService;
import com.example.backend.Services.EmployeeService;
import com.example.backend.Services.ManagerService;
import com.example.backend.Services.TaskService;
import com.example.backend.entities.Department;
import com.example.backend.entities.Employee;
import com.example.backend.entities.Manager;
import com.example.backend.entities.Task;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ManagerController {
    private final TaskServiceInterface taskService;
    private final EmployeeServiceInterface employeeService;

    public ManagerController(EmployeeService employeeService, TaskService taskService) {
        this.employeeService = employeeService;
        this.taskService = taskService;
    }

    @GetMapping("/Tasks")
    public ResponseEntity<List<Task>> getTasks() {
        List<Task> taskList = taskService.getAllTasks();
        return new ResponseEntity<>(taskList, HttpStatus.OK);
    }
    @GetMapping("/Employees")
    public ResponseEntity<List<Employee>> getEmployees() {
        List<Employee> employeeList = employeeService.getAllEmployees();
        return new ResponseEntity<>(employeeList, HttpStatus.OK);
    }
    @PostMapping("/addEmployee")
    public ResponseEntity<String> addEmployee(@RequestBody Employee employee) {
        String response = employeeService.addEmployee(employee);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @PostMapping("/addTask")
    public ResponseEntity<String> addTask(@RequestBody Task task) {
        String response = taskService.addTask(task);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @PostMapping("/updateEmployee")
    public ResponseEntity<String> updateEmployee(@RequestBody Employee employee) {
        String response = employeeService.updateEmployee(employee);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @PostMapping("/updateTask")
    public ResponseEntity<String> updateManager(@RequestBody Task task) {
        String response = taskService.updateTask(task);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @PostMapping("/deleteTask")
    public ResponseEntity<String> deleteTask(@RequestBody Task task) {
        String response = taskService.deleteTask(task.getId());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @PostMapping("/deleteEmployee")
    public ResponseEntity<String> deleteEmployee(@RequestBody Employee employee) {
        String response = employeeService.deleteEmployee(employee);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
