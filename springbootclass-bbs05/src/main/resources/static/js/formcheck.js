$(function(){
	
	// 게시글 상세보기에서 게시글 삭제 요청 처리
	$("#detailDelete").on("click", function(){
		
		let pass = $("#pass").val();
		if(pass.length <= 0) {
			alert("게시글을 삭제하려먼 비밀번호를 입력해주세요");
			return false;
			
		}
		$("#rPass").val(pass);
		$("#checkForm").attr("action", "delete");
		$("#checkForm").attr("method", "post");
		$("#checkForm").submit();
	});
	
	// 게시글 수정 폼 유효성 검사
	$("#updateForm").on("submit", function() {
		if($("#writer").val().length <= 0) {
			alert("작성자가 입력되지 않았습니다.\n작성자를 입력해주세요");
			$("#writer").focus();
			return false;
		}
		if($("#title").val().length <= 0) {
			alert("제목이 입력되지 않았습니다.\n제목을 입력해주세요");
			$("#title").focus();
			return false;
		}
		if($("#pass").val().length <= 0) {
			alert("비밀번호가 입력되지 않았습니다.\n비밀번호를 입력해주세요");
			$("#pass").focus();
			return false;
		}
		if($("#content").val().length <= 0) {
			alert("내용이 입력되지 않았습니다.\n내용을 입력해주세요");
			$("#content").focus();
			return false;
		}
	});
	
	//게시글 상세보기에서 게시글 수정 폼 요청 처리
	$("#detailUpdate").on("click", function(){
		
		let pass = $("#pass").val();
		if(pass.length <= 0) {
			alert("게시글을 수정하려먼 비밀번호를 입력해주세요");
			return false;
			
		}
		$("#rPass").val(pass);
		$("#checkForm").attr("action", "updateForm");
		$("#checkForm").attr("method", "post");
		$("#checkForm").submit();
	});
	
	
	// 게시글 쓰기 폼 유효성 검사
	$("#writForm").on("submit", function(){
		if($("#writer").val().length <= 0) {
			alert("작성자를 입력해주세요.");
			$("#writer").focus();
			return false;
		}
		if($("#title").val().length <= 0){
			alert("제목을 입력해주세요.");
			$("#title").focus();
			return false;
		}
		if($("#pass").val().length <= 0){
			alert("비밀번호를 입력해주세요.");
			$("#pass").focus();
			return false;
		}
		if($("#content").val().length <= 0){
			alert("내용을 입력하지 않으셨습니다. 내용을 입력해주세요.");
			$("#content").focus();
			return false;
		}
		
	});
	
});

