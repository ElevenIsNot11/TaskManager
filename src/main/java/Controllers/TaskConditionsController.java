/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package main.java.Controllers;

import com.google.gson.Gson;
import jakarta.servlet.http.HttpServletRequest;
import main.java.Models.TaskConditions;
import main.java.Repositories.TaskConditionsRepository;
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
@RequestMapping("/taskcondition")
public class TaskConditionsController {
        @Autowired
	private TaskConditionsRepository taskConditionsRepository;
        
        Gson gson = new Gson();
	
	 @RequestMapping(value = "/create", method = RequestMethod.POST)
	 public String create(HttpServletRequest request) throws Exception
	 {	
		 TaskConditions taskConditions = new TaskConditions();
		 taskConditions.set_Name(request.getParameter("name"));
		 taskConditionsRepository.save(taskConditions);
		 request.setAttribute("taskConditions", taskConditionsRepository.findAll()); 
		 return "taskConditions";
	 }
	
	 @RequestMapping(value = "/read", method = RequestMethod.GET)
	 public String read(HttpServletRequest request) throws Exception
	 {	
		 return gson.toJson(taskConditionsRepository.findAll());
	 }
         
         @RequestMapping(value = "/get/{ID}", method = RequestMethod.GET)
	 public String get(HttpServletRequest request, @PathVariable Integer ID) throws Exception
	 {	
                 return gson.toJson(taskConditionsRepository.findById(ID).<TaskConditions>get());
	 }
    
    
    
    
}
