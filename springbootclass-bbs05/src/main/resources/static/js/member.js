$(function() {
	
	// 회원 가입 폼 회원 정보 수정 폼에서 폼 컨트롤에서 키보드 입력을 체크
	// 유효한 값을 입력 받을 수 있도록 keyup 이벤트 처리
	
	$("#id").on("keyup", function(){
	
		let regExp = /[^A-Za-Z0-9]/gi;
		if(regExp.test($(this).val())){
			alert("영문 대소문자, 숫자만 입력할 수 있습니다.");
			$(this).val($(this).val().replace(regExp, ""));
		}
			
	});
	
	$("#pass1").on("keyup", inputCharReplace);
	$("#pass2").on("keyup", inputCharReplace);
	$("#emaild").on("keyup", inputCharReplace);
	$("#emailDomain").on("keyup", inputEmailDomainReplace);
	
	// 회원 가입 폼에서 아이디 중복확인 버튼이 클릭되면
	// 아이디 중복을 확인할 수  있는 새 창을 띄워주는 함수
	$("#btnOverlapId").on("click", function() {
		
		let id = $("#id").val();
		url="overlapIdCheck?id=" + id;
		
		if(id.length == 0) {
			alert("아이디를 입력해주세요");
			return flase;
		}
		
		if(id.lenth < 5) {
			alert("아이디는 5자 이상 입력해 주세요.");
			return false;
		}
		
		window.open(url, "idCheck", "toolbar=no, scrollbars=no, resizeable=no,"
			+ "status=no, memubar=no, width=500, height=330");
		
		
	});
	
	//회원 로그인 폼이 submit될 때 폼 유효성 검사를우 ㅣ한 이벤트 처리
	$("#loginForm").submit(function() {
		let id = $("#userId").val();
		let pass = $("#userPass").val();
		
		if(id.length <= 0) {
			alert("아이디가 입력되지 않았네요!\n아이디를 입력해주세요.");
			$("#userId").focus();
			return false;
		}
		if(pass.length <= 0) {
			
			alert("비밀번호가 입력되지 않았어요!\n 비밀번호를 입력해주세요.");
			$("#userPass").focus();
			return false;
		}
		
		});
		
		// 모달 로그인 폼이 submit 될 때 폼 유효성 검사를 위한 이벤트처리
		$("#modalLoginForm").submit(function() {
			let id = $("#modalUserId").val();
			let pass = $("#modalUserPass").val();
			
			if(id.length <= 0) {
				alert("아이디가 입력되지 않았네요!\n아이디를 입력해주세요.");
				$("#modalUserId").focus();
				return false;
			}
			if(pass.length <= 0) {
				
				alert("비밀번호가 입력되지 않았어요!\n 비밀번호를 입력해주세요.");
				$("#modalUserPass").focus();
				return false;
			}
			
		
	});
	
});

function inputCharReplace() {
	
	let regExp = /[^A-Za-z0-9]/gi;
	if(regExp.test($(this).val())) {
		alert("영문 대소분자, 숫자만 입력할 수 있습니다.");
		$(this).val($(this).val().replace(regExp, ""));
	}
}

function inputEmailDomainReplace() {
	
	let regExp = /[^A-z0-9\.]/gi;
	if(regExp.test($(this).val())) {
		alert("이메일 도메인은 영문 소문자, 숫자, 점(.)만 입력할 수 있습니다.");
		$(this).val($(this).val().replace(regExp, ""));
	}
}


