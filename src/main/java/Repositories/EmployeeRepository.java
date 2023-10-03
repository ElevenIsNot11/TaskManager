/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package main.java.Repositories;

import main.java.Models.Employees;
import org.springframework.data.repository.CrudRepository;



public interface EmployeeRepository extends CrudRepository<Employees, Integer> {
    
}


