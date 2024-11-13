package com.springbootstudy.bbs.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.springbootstudy.bbs.domain.Member;

@Mapper
public interface MemberMapper {
	
	// 회원 정보를 회원 테이블에 저장하는 메서드
	public void addMember(Member member);
	
	// 회원 ID에 해달하는 회원 정보를 member 테이블에서 읽어와 반화하는 메서드
	public Member getMember(String id);
}
