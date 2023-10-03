/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package main.java.Repositories;

import main.java.Models.Comments;
import main.java.Models.Users;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

/**
 *
 * @author Eleven
 */
public interface UserRepository extends CrudRepository<Users, Integer> {
    @Query("SELECT * FROM USERS WHERE login = :login AND password = :password")
  Iterable<Users> checkUser(@Param("login") String login, @Param("password") String password);   
}
