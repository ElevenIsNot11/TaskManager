/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package main.java.Controllers;

import com.google.gson.Gson;
import jakarta.servlet.http.HttpServletRequest;
import main.java.Models.Projects;
import main.java.Models.Tasks;
import main.java.Repositories.TaskRepository;
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
@RequestMapping("/task")
public class TaskController {
        @Autowired
	private TaskRepository taskRepository;
        
        Gson gson = new Gson();
	
         @RequestMapping(value = "/createupdate", method = RequestMethod.POST)
	 public Tasks create(@RequestBody String requestBody) throws Exception
	 {	
            	Tasks tasks = gson.fromJson(requestBody, Tasks.class);
		return taskRepository.save(tasks); 
	 }
	
	 @RequestMapping(value = "/read", method = RequestMethod.GET)
	 public String read(HttpServletRequest request) throws Exception
	 {	
		 return gson.toJson(taskRepository.findAll());
	 }
         
         @RequestMapping(value = "/get/{ID}", method = RequestMethod.GET)
	 public String get(HttpServletRequest request, @PathVariable Integer ID) throws Exception
	 {	
                 return gson.toJson(taskRepository.findById(ID).<Tasks>get());
	 }
         
         
         @RequestMapping(value = "/delete/{ID}", method = RequestMethod.GET)
	 public String delete(@PathVariable Integer ID) throws Exception
	 {	
		 taskRepository.deleteById(ID);
		 return "tasks";
	 }
         

    
    
    
    
}
