/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package main.java.Models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Table;
import org.springframework.data.annotation.Id;

/**
 *
 * @author Eleven
 */


@Entity
@Table(name = "Comments")
public class Comments {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;
    Integer task;
    String comment;
    String change;
    Integer employee;
    String date;
        

    public Comments(){}
    
    
    public Integer get_ID(){
        return id;
    }
    
    public void set_ID(Integer id){
        this.id = id;
    }
    
    public Integer get_Task(){
        return task;
    }
    
    public void set_Task(Integer task){
        this.task = task;
    }

    public String get_Comment(){
        return comment;
    }
    
    public void set_Comment(String comment){
        this.comment = comment;
    }
        
    public String get_Change(){
        return change;
    }
    
    public void set_Change(String change){
        this.change = change;
    }
                
    public String get_Date(){
        return date;
    }
    
    public void set_Date(String date){
        this.date = date;
    }
    
    public Integer get_Employee(){
        return employee;
    }
    
    public void set_Employee(Integer employee){
        this.employee = employee;
    }
}
