package com.springbootstudy.bbs.configurations;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
@EnableWebSecurity  //요청 URL이 스프링 시큐리티의 제어를 받도록 지정하는 어노테이션
public class SecurityConfig {
	
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	@Bean
	SecurityFilterChain fiterChain(HttpSecurity http) throws Exception {
		http.authorizeHttpRequests(
				authorizerHttpRequests ->
					authorizerHttpRequests.requestMatchers(
							new AntPathRequestMatcher("/**"))
					.permitAll())
			.csrf(csrf -> csrf.ignoringRequestMatchers(
					new AntPathRequestMatcher("/h2-console/**")))
					.csrf(csrf -> csrf.disable())
					.logout((logout) -> logout
							.logoutSuccessUrl("/loginForm")
							.invalidateHttpSession(true));
			
		
			return http.build();	
		
	}
	
}
