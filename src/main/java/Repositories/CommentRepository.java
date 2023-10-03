/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package main.java.Repositories;

import main.java.Models.Comments;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

/**
 *
 * @author Eleven
 */
public interface CommentRepository extends CrudRepository<Comments, Integer> {
    
@Query("SELECT * FROM COMMENTS WHERE task = :id")
  Iterable<Comments> getCommentsByTask(@Param("id") long id);   

}
