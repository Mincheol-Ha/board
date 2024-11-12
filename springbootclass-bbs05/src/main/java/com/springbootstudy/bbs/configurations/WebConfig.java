package com.springbootstudy.bbs.configurations;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
	
	@Override
	public void addViewControllers(ViewControllerRegistry registry) {
		registry.addViewController("/writeForm").setViewName("views/writeForm");
		registry.addViewController("/writeBoard").setViewName("views/writeForm");
		
		registry.addViewController("/loginForm").setViewName("member/loginForm");
	}
	@Override
	public  void addResourceHandlers(ResourceHandlerRegistry registry) {
		
		registry.addResourceHandler("/resources/file/**")
			.addResourceLocations("file:./src/main/resources/static/files/")
			.setCachePeriod(1);
		
		
	}
}
