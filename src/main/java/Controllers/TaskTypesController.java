/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package main.java.Controllers;

import com.google.gson.Gson;
import jakarta.servlet.http.HttpServletRequest;
import main.java.Models.TaskTypes;
import main.java.Repositories.TaskTypesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Eleven
 */

@RestController
@RequestMapping("/tasktype")
public class TaskTypesController {
        @Autowired
	private TaskTypesRepository taskTypesRepository;
        
        Gson gson = new Gson();
	
	 @RequestMapping(value = "/create", method = RequestMethod.POST)
	 public String create(HttpServletRequest request) throws Exception
	 {	
		 TaskTypes taskTypes = new TaskTypes();
		 taskTypes.set_Name(request.getParameter("name"));
		 taskTypesRepository.save(taskTypes);
		 request.setAttribute("taskTypes", taskTypesRepository.findAll()); 
		 return "taskTypes";
	 }
	
	 @RequestMapping(value = "/read", method = RequestMethod.GET)
	 public String read(HttpServletRequest request) throws Exception
	 {	
		 return gson.toJson(taskTypesRepository.findAll());
	 }
         
         @RequestMapping(value = "/get/{ID}", method = RequestMethod.GET)
	 public String get(HttpServletRequest request, @PathVariable Integer ID) throws Exception
	 {	
                 return gson.toJson(taskTypesRepository.findById(ID).<TaskTypes>get());
	 }
    
    
    
    
}
