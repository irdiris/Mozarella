package com.example.backend.Services;

import com.example.backend.Interfaces.TaskServiceInterface;
import com.example.backend.entities.Task;
import com.example.backend.repositories.TaskRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class TaskService implements TaskServiceInterface {
    private final TaskRepository taskRepository;
    private final ModelMapper modelMapper;

    public TaskService(TaskRepository taskRepository, ModelMapper modelMapper) {
        this.taskRepository = taskRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public String addTask(Task task) {
        taskRepository.save(task);
        return "task saved";
    }

    @Override
    public String updateTask(Task task) {
        Task taskToUpdate = taskRepository.findById(task.getId()).get();
        modelMapper.map(task, taskToUpdate);
        taskRepository.save(taskToUpdate);
        return "task Updated";
    }

    @Override
    public String deleteTask(Long id) {
        Task task = taskRepository.findById(id).orElseThrow(() -> new RuntimeException("Task not found"));
            taskRepository.delete(task);
        return "task deleted";
    }

    @Override
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }
}
