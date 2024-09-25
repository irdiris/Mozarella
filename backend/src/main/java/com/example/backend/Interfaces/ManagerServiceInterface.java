package com.example.backend.Interfaces;

import com.example.backend.entities.Manager;

import java.util.List;

public interface ManagerServiceInterface {
    String addManger(Manager manager);
    String deleteManger(Manager manager);
    String updateManger(Manager manager);
    List<Manager> getAllManagers();
}
