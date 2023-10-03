/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package main.java.Controllers;

import com.google.gson.Gson;
import jakarta.servlet.http.HttpServletRequest;
import main.java.Models.LinkedTasks;
import main.java.Repositories.LinkedTasksRepository;
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
@RequestMapping("/linkedtask")
public class LinkedTaskController {
        @Autowired
	private LinkedTasksRepository linkedtaskRepository;
        
        Gson gson = new Gson();
	
         
         @RequestMapping(value = "/createupdate", method = RequestMethod.POST)
	 public LinkedTasks create(@RequestBody String requestBody) throws Exception
	 {	
            	LinkedTasks linkedtasks = gson.fromJson(requestBody, LinkedTasks.class);
		return linkedtaskRepository.save(linkedtasks); 
	 }
	
	 @RequestMapping(value = "/read", method = RequestMethod.GET)
	 public String read(HttpServletRequest request) throws Exception
	 {	
		 return gson.toJson(linkedtaskRepository.findAll());
	 }
         
         
         @RequestMapping(value = "/get/{ID}", method = RequestMethod.GET)
	 public String get(HttpServletRequest request, @PathVariable Integer ID) throws Exception
	 {	
                 return gson.toJson(linkedtaskRepository.findById(ID).<LinkedTasks>get());
	 }
         
         @RequestMapping(value = "/delete/{ID}", method = RequestMethod.GET)
	 public String delete(@PathVariable Integer ID) throws Exception
	 {	
		 linkedtaskRepository.deleteById(ID);
		 return "linkedtasks";
	 }
    
    
    
    
}
