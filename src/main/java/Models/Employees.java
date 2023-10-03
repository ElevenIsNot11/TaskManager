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
@Table(name = "Employees")
public class Employees {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;
    String firstName;
    String lastName;
    String patronymic;
    String date;
    String adress;
        

    public Employees(){}
    
    
    public Integer get_ID(){
        return id;
    }
    
    public void set_ID(Integer id){
        this.id = id;
    }
    
    public String get_FirstName(){
        return firstName;
    }
    
    public void set_FirstName(String firstName){
        this.firstName = firstName;
    }

    public String get_LastName(){
        return lastName;
    }
    
    public void set_LastName(String lastName){
        this.lastName = lastName;
    }
        
    public String get_Patronymic(){
        return patronymic;
    }
    
    public void set_Patronymic(String patronymic){
        this.patronymic = patronymic;
    }
                
    public String get_Date(){
        return date;
    }
    
    public void set_Date(String date){
        this.date = date;
    }
    
    public String get_Adress(){
        return adress;
    }
    
    public void set_Adress(String adress){
        this.adress = adress;
    }
}
