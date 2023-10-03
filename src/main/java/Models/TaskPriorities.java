/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package main.java.Models;

import static jakarta.persistence.CascadeType.ALL;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.util.List;
import org.springframework.data.annotation.Id;

/**
 *
 * @author Eleven
 */
@Entity
@Table(name = "TaskPriorities")
public class TaskPriorities {
    @Id
    Integer id;
    String name;

    
    
    public TaskPriorities(){}
    
    
    public Integer get_ID(){
        return id;
    }
    
    public void set_ID(Integer id){
        this.id = id;
    }
    
    public String get_Name(){
        return name;
    }
    
    public void set_Name(String name){
        this.name = name;
    }

    
    
    
    
    
}
