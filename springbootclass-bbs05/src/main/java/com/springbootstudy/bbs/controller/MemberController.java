package com.springbootstudy.bbs.controller;

import java.io.IOException;
import java.io.PrintWriter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttributes;

import com.springbootstudy.bbs.domain.Member;
import com.springbootstudy.bbs.service.MemberService;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

@Controller
@SessionAttributes("member")
public class MemberController {

	//회원 관련 Business 로직을 담당하는 객체를 의존성 주입하도록 설정
	@Autowired
	private MemberService memberService;
	
	// "/memberlogout"으로 들어오는 GET방식 요청 처리 메서드
	@GetMapping("memberLogout")
	public String logout(HttpSession session) {
	//	log.info("MemberController.logout(HttpSession session)");
		session.invalidate();
		return "redirect:/loginForm";
	}
	
	
	@PostMapping("/login")
	public String login(Model model, @RequestParam("userId") String id,
			@RequestParam("pass") String pass,
			HttpSession session, HttpServletResponse response)
				throws ServletException, IOException {
		
		int result = memberService.login(id,  pass);
			
		if(result == -1) {
			response.setContentType("text/html; charset=utf-8");
			PrintWriter out = response.getWriter();
			out.println("<script>");
			out.println("alert('존재하지 않는 아이디입니다.');");
			out.println("history.back();");
			out.println("</script>");
			
			return null;
		} else if(result == 0) {
			response.setContentType("text/html; charset=utf-8");
			PrintWriter out = response.getWriter();
			out.println("<script>");
			out.println("alert('비밀번호가 다릅니다.');");
			out.println("location.href='loginForm'");
			out.println("</script>");
			
			return null;
			
		}
		Member member = memberService.getMember(id);
		session.setAttribute("isLogin", true);
		
		model.addAttribute("member", member);
		System.out.println("member.name : " + member.getName());
		
		return "redirect:/boardList";
	}
}
