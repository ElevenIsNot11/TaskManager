/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package main.java.Models;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import org.springframework.data.annotation.Id;

/**
 *
 * @author Eleven
 */
@Entity
@Table(name = "Tasks")
public class Tasks {
    @Id
    Integer id;
    Integer project;
    Integer type;
    Integer condition;
    Integer priority;
    Integer employee;
    Integer watcher;
    Integer creator;
    String name;
    String desc;
    Integer time;
    Integer factTime;
    
    public Tasks(){}
    
    public Integer get_ID(){
        return id;
    }
    
    public void set_ID(Integer id){
        this.id = id;
    }
    
    public Integer get_Project(){
        return project;
    }
    
    public void set_Project(Integer project){
        this.project = project;
    }
    
    public Integer get_Type(){
        return type;
    }
    
    public void set_Type(Integer type){
        this.type = type;
    }
    
    public Integer get_Condition(){
        return condition;
    }
    
    public void set_Condition(Integer condition){
        this.condition = condition;
    }
    
    public Integer get_Priority(){
        return priority;
    }
    
    public void set_Priority(Integer priority){
        this.priority = priority;
    }
    
    public Integer get_Employee(){
        return employee;
    }
    
    public void set_Employee(Integer employee){
        this.employee = employee;
    }
    
    public Integer get_Watcher(){
        return watcher;
    }
    
    public void set_Watcher(Integer watcher){
        this.watcher = watcher;
    }
    
    public Integer get_Creator(){
        return creator;
    }
    
    public void set_Creator(Integer creator){
        this.creator = creator;
    }
    
    public Integer get_Time(){
        return time;
    }
    
    public void set_Time(Integer time){
        this.time = time;
    }
    
    public Integer get_FactTime(){
        return factTime;
    }
    
    public void set_FactTime(Integer factTime){
        this.factTime = factTime;
    }
    
    public String get_Name(){
        return name;
    }
    
    public void set_Name(String name){
        this.name = name;
    }
    
    public String get_Desc(){
        return desc;
    }
    
    public void set_Desc(String desc){
        this.desc = desc;
    }
}
