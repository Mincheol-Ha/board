# Spring Boot 게시판 프로젝트

## 📌 프로젝트 개요

### Spring Boot와 JPA를 활용한 간단한 게시판 프로젝트입니다. CRUD 기능을 포함하여 회원가입, 검색, 페이징 처리, 게시글 수정 시 비밀번호 체크, 게시글 상세보기 시 로그인 검증, 댓글 기능을 추가하였습니다.

## 🛠 기술 스택

Backend: Spring Boot, Spring Security, JPA (Hibernate), MySQL

Frontend: Thymeleaf, Bootstrap

Build Tool: Maven 또는 Gradle

Deployment: 로컬 환경 실행 (Docker 지원 가능)

📂 프로젝트 구조

📦 src/main/java/com/example/board<br>
 ┣ 📂 config         # 설정 관련 클래스<br>
 ┣ 📂 controller     # 컨트롤러 (API 엔드포인트)<br>
 ┣ 📂 domain         # DTO (Data Transfer Object)<br>
 ┣ 📂 service        # 서비스 레이어<br>
 ┣ 📂 interceptor    # 로그인 검증<br>
 ┣ 📂 mapper         # Mybatis Mapper.java<br>
 ┗ 📜 BoardApplication.java  # 메인 애플리케이션 실행 파일<br>

✨ 주요 기능

1. 회원가입 & 로그인

Spring Security를 활용한 로그인 및 회원가입 기능

비밀번호 암호화 (BCrypt)

2. 게시판 CRUD

게시글 작성, 조회, 수정, 삭제 가능

게시글 수정 시 비밀번호 확인 (비회원 글 작성 시)

3. 게시글 검색 & 페이징 처리

제목 및 내용 검색 기능

4. 게시글 상세보기 접근 제어

로그인한 사용자만 게시글 상세 페이지 접근 가능

5. 댓글 기능

로그인한 사용자만 댓글 작성 가능

댓글 CRUD 기능 제공

🔧 프로젝트 실행 방법

### 1. 프로젝트 클론

### https://github.com/Mincheol-Ha/board.git

## 🎥 실행 화면 (예시)

### 기능
![메인페이지](https://github.com/user-attachments/assets/2bfe6c11-9414-43af-bfe6-f1d3078a2a89)

### 로그인 페이지
![로그인](https://github.com/user-attachments/assets/c96f7097-b15a-4e43-b2b2-e66a4d9c209f)
![로그인모달](https://github.com/user-attachments/assets/2ae762ef-1262-47b0-9ba5-f59679e56c9d)

### 게시글 작성
![게시글작성](https://github.com/user-attachments/assets/db741d06-7d29-4464-842a-094b5839c69d)

### 댓글 기능
![댓글](https://github.com/user-attachments/assets/33625ac9-c1b6-46a8-b5ef-087b045b6f87)

