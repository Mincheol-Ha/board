$(function() {
	
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