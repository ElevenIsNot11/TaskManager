/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package main.java.Controllers;

import com.google.gson.Gson;
import jakarta.servlet.http.HttpServletRequest;
import main.java.Models.Users;
import main.java.Repositories.UserRepository;
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
@RequestMapping("/user")
public class UserController {
        @Autowired
	private UserRepository userRepository;
        
        Gson gson = new Gson();
	
         
         @RequestMapping(value = "/createupdate", method = RequestMethod.POST)
	 public Users create(@RequestBody String requestBody) throws Exception
	 {	
            	Users users = gson.fromJson(requestBody, Users.class);
		return userRepository.save(users); 
	 }
	
	 @RequestMapping(value = "/check/{LOGIN}/{PASSWORD}", method = RequestMethod.GET)
	 public String read(HttpServletRequest request, @PathVariable String LOGIN, @PathVariable String PASSWORD) throws Exception
	 {	
		 return gson.toJson(userRepository.checkUser(LOGIN, PASSWORD));
	 }
         
         
         @RequestMapping(value = "/get/{ID}", method = RequestMethod.GET)
	 public String get(HttpServletRequest request, @PathVariable Integer ID) throws Exception
	 {	
                 return gson.toJson(userRepository.findById(ID).<Users>get());
	 }
         
         @RequestMapping(value = "/delete/{ID}", method = RequestMethod.GET)
	 public String delete(@PathVariable Integer ID) throws Exception
	 {	
		 userRepository.deleteById(ID);
		 return "users";
	 }
    
    
    
    
}
