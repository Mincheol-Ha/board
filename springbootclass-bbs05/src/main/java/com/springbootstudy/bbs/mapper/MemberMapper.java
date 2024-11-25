package com.springbootstudy.bbs.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.springbootstudy.bbs.domain.Member;
import com.springbootstudy.bbs.domain.Reply;

/* @Mapper는 MyBatis 3.0부터 지원하는 애노테이션으로 이 애노테이션이 붙은
 * 인터페이스는 별도의 구현 클래스를 작성하지 않아도 MyBatis 맵퍼로 인식해
 * 스프링 Bean으로 등록되며 Service 클래스에서 주입 받아 사용할 수 있다. 
 * 
 * @Mapper 애노테이션을 적용한 인터페이스와 XML 맵퍼 파일은 namespace라는
 * 속성으로 연결되기 때문에 XML 맵퍼 파일의 namespace를 정의할 때 맵퍼 
 * 인터페이스의 완전한 클래스 이름과 동일한 namespace를 사용해야 한다. 
 **/
@Mapper
public interface MemberMapper {
	
	// 게시글 번호에 해당하는 댓글을 DB에 등록하는 메서드
	public void addReply(Reply reply);

	// 회원 ID에 해당하는 회원 정보를 member 테이블에서 읽어와 반환하는 메서드
	public Member getMember(String id);	
	
	// 회원 정보를 회원 테이블에 저장하는 메서드
	public void addMember(Member member);
	
	// 회원 정보 수정 시에 기존 비밀번호가 맞는지 체크하는 메서드
	public String memberPassCheck(String id);
	
	// 회원 정보를 회원 테이블에서 수정하는 메서드
	public void updateMember(Member member);
}
