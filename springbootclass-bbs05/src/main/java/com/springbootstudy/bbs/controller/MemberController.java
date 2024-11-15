package com.springbootstudy.bbs.controller;

import java.io.IOException;
import java.io.PrintWriter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttributes;

import com.springbootstudy.bbs.domain.Member;
import com.springbootstudy.bbs.service.MemberService;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
@Slf4j
@Controller
@SessionAttributes("member")
public class MemberController {

	//회원 관련 Business 로직을 담당하는 객체를 의존성 주입하도록 설정
	@Autowired
	private MemberService memberService;
	
	
	// 회원 수정 폼에서 들어오는 요청을 처리하는 메서드
	@PostMapping("/memberUpdateResult")
	public String memberUpdateInfo(Model model, Member member,
			@RequestParam("pass1") String pass1,
			@RequestParam("emailId") String emailId,
			@RequestParam("emailDomain") String emailDomain,
			@RequestParam("mobile1") String mobile1,
			@RequestParam("mobile2") String mobile2,
			@RequestParam("mobile3") String mobile3,
			@RequestParam("phone1") String phone1,
			@RequestParam("phone2") String phone2,
			@RequestParam("phone3") String phone3,
			@RequestParam(value="emailGet", required=false,
			defaultValue="false")boolean emailGet) {
	
		member.setPass(pass1);
		member.setEmail(emailId + "@" + emailDomain);
		member.setMobile(mobile1 + "-" + mobile2 + "-" + mobile3);
		
		if(phone2.equals("") || phone3.equals("")) {
			member.setPhone("");
		} else {
			member.setPhone(phone1 + "-" + phone2 + "-" + phone3);
		}
		member.setEmailGet(Boolean.valueOf(emailGet));
		
		//MemberService를 통해서 회원 가입 폼에서 들어온 데이터를 DB서 수정한다.
		memberService.updateMember(member);
		log.info("memberUpdateResult : " + member.getId());
		
/*		클래스 레벨에 @SessionAttributes({"member")
		어노테이션을 지정하고 컨트롤러의 메서드에서 아래와 같이 동일한
		이름으로 모델에 추가하면 스프링이 세션 영역에 데이터를 지정해 줌.*/
		model.addAttribute("member", member);
	
		
		return "redirect:boardList";
	
}
	
	@GetMapping("/memberUpdateForm")
	public String updateForm(Model model, HttpSession session) {
		// 로그인 처리를 할 때 세션 영역에 회원 정보를 저장했기 떄문에 뷰의 정보만 반환한다
		return "member/memberUpdateForm";
	}
	
	@PostMapping("/joinResult")
	public String joinResult(Model model, Member member,
			@RequestParam("pass1") String pass1,
			@RequestParam("emailId") String emailId,
			@RequestParam("emailDomain") String emailDomain,
			@RequestParam("mobile1") String mobile1,
			@RequestParam("mobile2") String mobile2,
			@RequestParam("mobile3") String mobile3,
			@RequestParam("phone1") String phone1,
			@RequestParam("phone2") String phone2,
			@RequestParam("phone3") String phone3,
			@RequestParam(value="emailGet", required=false,
			defaultValue="false")boolean emailGet) {
		
			member.setPass(pass1);
			member.setEmail(emailId + "@" + emailDomain);
			member.setMobile(mobile1 + "-" + mobile2 + "-" + mobile3);
			
			if(phone2.equals("") || phone3.equals("")) {
				member.setPhone("");
			} else {
				member.setPhone(phone1 + "-" + phone2 + "-" + phone3);
			}
			member.setEmailGet(Boolean.valueOf(emailGet));
			
			//MemberService를 통해서 회원 가입 폼에서 들어온 데이터를 DB에 저장한다.
			memberService.addMember(member);
			log.info("joinResult : " + member.getName());
			
			return "redirect:loginForm";
		
	}
			
	@RequestMapping("/overlapIdCheck")
	//@GetMapping("overlapIdCheck")
	public String overlapIdCheck(Model model, @RequestParam("id") String id) {
		
		// 회원 아이디 중복 여부를 받아 온다.
		boolean overlap = memberService.overlapIdCheck(id);
		
		// model에 회원 ID와 회원 ID중복 여부를 지정한다.
		model.addAttribute("id", id);
		model.addAttribute("overlap", overlap);
		
		return "member/overlapIdCheck.html";
	}
	
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
