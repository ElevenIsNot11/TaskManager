/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package main.java.Controllers;

import com.google.gson.Gson;
import jakarta.servlet.http.HttpServletRequest;
import main.java.Models.Comments;
import main.java.Repositories.CommentRepository;
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
@RequestMapping("/comment")
public class CommentController {
        @Autowired
	private CommentRepository commentRepository;
        
        Gson gson = new Gson();
	
         
         @RequestMapping(value = "/createupdate", method = RequestMethod.POST)
	 public Comments create(@RequestBody String requestBody) throws Exception
	 {	
            	Comments comments = gson.fromJson(requestBody, Comments.class);
		return commentRepository.save(comments); 
	 }
	
	 @RequestMapping(value = "/read/{ID}", method = RequestMethod.GET)
	 public String read(HttpServletRequest request, @PathVariable Integer ID) throws Exception
	 {	
		 return gson.toJson(commentRepository.getCommentsByTask(ID));
	 }
         
         
         @RequestMapping(value = "/get/{ID}", method = RequestMethod.GET)
	 public String get(HttpServletRequest request, @PathVariable Integer ID) throws Exception
	 {	
                 return gson.toJson(commentRepository.findById(ID).<Comments>get());
	 }
         
         @RequestMapping(value = "/delete/{ID}", method = RequestMethod.GET)
	 public String delete(@PathVariable Integer ID) throws Exception
	 {	
		 commentRepository.deleteById(ID);
		 return "comments";
	 }
    
    
    
    
}
