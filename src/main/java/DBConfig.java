/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package main.java;

import org.h2.jdbcx.JdbcDataSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jdbc.repository.config.AbstractJdbcConfiguration;
import org.springframework.data.jdbc.repository.config.EnableJdbcRepositories;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcOperations;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.support.JdbcTransactionManager;
import org.springframework.transaction.PlatformTransactionManager;
import javax.sql.DataSource;


@Configuration
@EnableJdbcRepositories
public class DBConfig extends AbstractJdbcConfiguration {
    
    @Bean
    DataSource dataSource(){
        JdbcDataSource ds = new JdbcDataSource();
        ds.setURL("jdbc:h2:~/db");
        ds.setUser("sa");
        ds.setPassword("");
        return ds;
    }

    @Bean
    PlatformTransactionManager transactionManager(DataSource ds){
        return new JdbcTransactionManager(ds);
    }

    @Bean NamedParameterJdbcOperations namedParameter(DataSource ds){
        return new NamedParameterJdbcTemplate(ds);
    }
     
}

