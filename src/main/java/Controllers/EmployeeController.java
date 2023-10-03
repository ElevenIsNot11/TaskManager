/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package main.java.Controllers;

import com.google.gson.Gson;
import main.java.Models.Employees;
import main.java.Repositories.EmployeeRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
/**
 *
 * @author Eleven
 */
@RestController
@RequestMapping("/employee")
public class EmployeeController{
	
	@Autowired
	private EmployeeRepository employeeRepository;
        
        Gson gson = new Gson();
	
	 @RequestMapping(value = "/createupdate", method = RequestMethod.POST)
	 public Employees create(@RequestBody String requestBody) throws Exception
	 {	    
            	Employees employees = gson.fromJson(requestBody, Employees.class);  
		 return employeeRepository.save(employees); 
	 }
         

	
	 @RequestMapping(value = "/read", method = RequestMethod.GET)
	 public String read(HttpServletRequest request) throws Exception
	 {	
		 return gson.toJson(employeeRepository.findAll());
	 }
         
         @RequestMapping(value = "/get/{ID}", method = RequestMethod.GET)
	 public String get(HttpServletRequest request, @PathVariable Integer ID) throws Exception
	 {	
                 return gson.toJson(employeeRepository.findById(ID).<Employees>get());
	 }
	 
	 @RequestMapping(value = "/delete/{ID}", method = RequestMethod.GET)
	 public String delete(@PathVariable Integer ID) throws Exception
	 {	
		 employeeRepository.deleteById(ID);
		 return "employees";
	 }
}