/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package main.java.Repositories;

import main.java.Models.TaskPriorities;
import org.springframework.data.repository.CrudRepository;

/**
 *
 * @author Eleven
 */
public interface TaskPrioritiesRepository extends CrudRepository<TaskPriorities, Integer> {
}
