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
@Table(name = "Projects")
public class Projects {
    @Id
    Integer id;
    String name;
    Integer lead;
    String desc;
    
    
    public Projects(){}
    
    
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
    
    public Integer get_Lead(){
        return lead;
    }
    
    public void set_Lead(Integer lead){
        this.lead = lead;
    }
    
    public String get_Desc(){
        return desc;
    }
    
    public void set_Desc(String desc){
        this.desc = desc;
    }
    
    
    
    
    
    
}
