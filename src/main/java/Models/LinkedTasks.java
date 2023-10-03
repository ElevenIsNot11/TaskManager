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
@Table(name = "Linked_Tasks")
public class LinkedTasks {
    @Id
    Integer id;
    Integer task1;
    Integer task2;

    
    
    public LinkedTasks(){}
    
    
    public Integer get_ID(){
        return id;
    }
    
    public void set_ID(Integer id){
        this.id = id;
    }
    
    public Integer get_Task1(){
        return task1;
    }
    
    public void set_Task1(Integer task1){
        this.task1 = task1;
    }
    
    public Integer get_Task2(){
        return task2;
    }
    
    public void set_Task2(Integer task2){
        this.task2 = task2;
    }
    


    
    
    
    
    
}
