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
@Table(name = "Users")
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;
    Integer employee;
    String login;
    String password;
        

    public Users(){}
    
    
    public Integer get_ID(){
        return id;
    }
    
    public void set_ID(Integer id){
        this.id = id;
    }
    
    public Integer get_Employee(){
        return employee;
    }
    
    public void set_Employee(Integer employee){
        this.employee = employee;
    }

    public String get_Login(){
        return login;
    }
    
    public void set_Login(String login){
        this.login = login;
    }
        
    public String get_Password(){
        return password;
    }
    
    public void set_Password(String password){
        this.password = password;
    }
                
}
