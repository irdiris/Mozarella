package com.example.backend.Interfaces;

import com.example.backend.entities.Task;

import java.util.List;

public interface TaskServiceInterface {

     String addTask(Task task);
     String updateTask(Task task);
     String deleteTask(Long id);
     List<Task> getAllTasks();

}
