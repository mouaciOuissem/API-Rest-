package com.quest.etna.config;

import java.util.Arrays;

import javax.annotation.PostConstruct;
import javax.servlet.Filter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.WebSecurityConfigurer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.quest.etna.model.User;
import com.quest.etna.model.UserRole;
import com.quest.etna.repositories.UserRepository;
@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter{

    @Autowired
    private JwtRequestFilter jwtRequestFilter;

    @Autowired
    private JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

    @Autowired
    private JwtUserDetailsService jwtUserDetailsService;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    

	@Autowired
	private  UserRepository userRepository;
	

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }


   @Override
   protected void configure(HttpSecurity http) throws Exception {
        http.cors().and().csrf().disable()
                .authorizeRequests()
                .antMatchers("/register", "/authenticate").permitAll()
                .anyRequest().authenticated()
                .and()
                .exceptionHandling().authenticationEntryPoint(jwtAuthenticationEntryPoint)
                .and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);

    }
   @Bean
   public CorsConfigurationSource corsConfigurationSource() {
       CorsConfiguration config = new CorsConfiguration();
       config.setAllowedOrigins(Arrays.asList("*"));
       config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE"));
       config.setAllowedHeaders(Arrays.asList("authorization", "content-type"));
       UrlBasedCorsConfigurationSource aa = new UrlBasedCorsConfigurationSource();
       aa.registerCorsConfiguration("/**", config);
       return aa;
   }
   @Autowired
   public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
       auth.userDetailsService(jwtUserDetailsService).passwordEncoder(passwordEncoder());
   }
   @PostConstruct
   public void addAdminUser() {
	    // Crée un objet User avec les informations de l'admin
	   User admin = userRepository.findByUsername("admin");
       if (admin == null) {
    	   
    	    User newAdmin = new User();
    	    newAdmin.setUsername("admin");
    	    newAdmin.setPassword(passwordEncoder.encode("password")); 
    	    newAdmin.setRole(UserRole.ROLE_ADMIN);
		    
		    // Ajoute l'utilisateur à la base de données
		    userRepository.save(newAdmin);
	}}

}
