package com.example.backend.Services;

import com.example.backend.Interfaces.ManagerServiceInterface;
import com.example.backend.entities.Manager;
import com.example.backend.repositories.ManagerRepository;
import org.modelmapper.ModelMapper;
import org.springframework.boot.Banner;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class ManagerService implements ManagerServiceInterface {
    private final ManagerRepository managerRepository;
    private final ModelMapper modelMapper;

    public ManagerService(ManagerRepository managerRepository, ModelMapper modelMapper) {
        this.managerRepository = managerRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public String addManger(Manager manager) {
        managerRepository.save(manager);
        return "manager added";
    }

    @Override
    public String deleteManger(Manager manager) {
        Manager manager1 = managerRepository.findById(Math.toIntExact(manager.getId())).orElseThrow(()-> new RuntimeException("this manager doesnt exist"));
        managerRepository.delete(manager1);
        return "manager deleted";
    }

    @Override
    public String updateManger(Manager manager) {
        Manager managerToBeUpdated = managerRepository.findById(Math.toIntExact(manager.getId())).orElseThrow(()-> new RuntimeException("Manager does not exist"));
        return "manager updated";
    }

    @Override
    public List<Manager> getAllManagers() {
        return managerRepository.findAll();
    }
}
