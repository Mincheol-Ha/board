$(function() {
	
	//회원정보 수정 폼에서 비밀번호 확인 버튼이 클릭될 때 이벤트 처리
	$("#btnPassCheck").click(function(){
		let oldId = $("#id").val();
		let oldPass = $("@oldPass").val();
		
		if($trim(oldPass).length == 0){
			alert("기존 비밀번호가 입력되지 않았습니다.\n기존 비밀번호를 입력해주세요.");
			return false;
		}
		
		let data = "id=" + oldId + "&pass=" + oldPass;
		console.log("data : " + data);
		
		$.ajax({
			
			"url" : "passCheck.ajax",
			"type" : "get",
			"data" : data,
			"dataType": "json",
			"success" : function(resData) {
				if(resData.result) {
					alert("비밀번호가 확인되었습니다.\n 비밀번호를 수정해주세요");
					$("#btnPassCheck").prop("disabled", true);
					$("#oldPass").prop("readonly", true);
					$("#pass1").focus();
					
				} else {
					
					alert("비밀번호가 틀립니다.\n비밀번호를 다시 확인해주세요");
					$("#oldPass").val("").focus();
				}
			},
			"error":function(xhr, status) {
				console.log("error : " + status);
			}
		});
		
	});
	
	// 회원정보 수정 폼에서 수정하기 버튼이 클릭되면 유효성 검사를 하는 함수
	$("#memberUpdateForm").on("submit", function() {
		
		if(! $("#btnPassCheck").prop("disabled")) {
			
			alert("기존 비밀번호를 확인해야 비밀번호를 수정할 수 있습니다.\n"
				+ "기존 비밀번호를 입력하고 비밀번호 확인 버튼을 클릭해 주세요.");
				return false;
		}
		// joinFormCheck() 함수에서 폼 유효선 검사를 통과하지 못하면 false가 반환되기 때문에
		// 그대로 반화하면 폼이 서브밋 되지 않는다.
		return joinFormCheck();
		
	})
	
	
	// 회원 가입 폼 회원 정보 수정 폼에서 폼 컨트롤에서 키보드 입력을 체크
	// 유효한 값을 입력 받을 수 있도록 keyup 이벤트 처리
	
	$("#id").on("keyup", function(){
	
		let regExp = /[^A-Za-z0-9]/gi;
		if(regExp.test($(this).val())){
			alert("영문 대소문자, 숫자만 입력할 수 있습니다.");
			$(this).val($(this).val().replace(regExp, ""));
		}
			
	});
	
	$("#pass1").on("keyup", inputCharReplace);
	$("#pass2").on("keyup", inputCharReplace);
	$("#emaiId").on("keyup", inputCharReplace);
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
		
		window.open(url, "idCheck", "toolbar=no, scrollbars=no, resizeable=no, "
			+ "status=no, memubar=no, width=500, height=330");
		
		
	});
	
	$("#idCheckForm").on("submit", function() {
		let id = $("checkId").val();
		
		if(id.length == 0) {
			alert("아이디를 입력해주세요");
			return flase;
			
		}
		
		if(id.length < 5) {
			alert("아이디는 5자 이상 입력해주세요.")
			return false;
			
		}
		
	});
	
	//아이디 사용 버튼이 클릭외면 아이디를 부모창의 회원 가입 폼에 입력해 주는 함수
	$("#btnIdCheckClose").on("click", function(){
		let id = $(this).attr("data-id-value");
		opener.document.joinForm.id.value = id;
		opener.document.joinForm.isIdCheck.value = true;
		window.close();
		
	});
	// 회원 가입 폼과 회원정보 수정 폼에서 우편번호 검색 버튼 클릭 이벤트 처이
	$("#btnZipcode").click(findZipcode);
	
	// 이메일 입력 셀렉트 박스에서 선택된 도메임을 설정하는 함수
	$("#selectDomain").on("change", function(){

		let str = $(this).val();
		
		if(str == "직접입력") {
			$("#emailDomain").val("");
			$("#emailDomain").prop("readonly", false);
			
		} else if(str == "네이버"){
		$("#emailDomain").val("naver.com");
		$("#emailDomain").prop("readonly", true);
			
		} else if(str == "다음"){
		$("#emailDomain").val("daum.ne");
		$("#emailDomain").prop("readonly", true);
			
		} else if(str == "한메일"){
		$("#emailDomain").val("hanmail.net");
		$("#emailDomain").prop("readonly", true);
			
		} else if(str == "구글"){
		$("#emailDomain").val("gmail.com");
		$("#emailDomain").prop("readonly", true);
		
		}
	});
	
	// 회원 가입 폼이 서브밋 될 때 이벤트 처리 - 폼 유효성 검사
	$("#joinForm").on("submit", function() {
		
		return joinFormCheck();
		
		
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
	let regExp = /[^a-z0-9\.]/gi;
	if(regExp.test($(this).val())) {
		alert("이메일 도메인은 영문 소문자, 숫자, 점(.)만 입력할 수 있습니다.");
		$(this).val($(this).val().replace(regExp, ""));
	}
}

function joinFormCheck() {
	let name = $("#name").vla();
	let id = $("#id").vla();
	let pass1 = $("#pass1").val();
	let pass2 = $("#pass2").val();
	let zipcode = $("#zipcode").val();
	let address1 = $("#address1").val();
	let emailId = $("#emailId").val();
	let emailDomain = $("#emailDomain").val();
	let modile2 = $("#modile2").val();
	let modile3 = $("#modile3").val();
	let isIdCheck = $("#isIdCheck").val();
	
	if(name.lenth == 0) {
		alert("이름이 입력되지 않았습니다.\n이름을 입력해주세요.")
			return false;
		
	}

		if(name.lenth == 0) {
			alert("이름이 입력되지 않았습니다.\n이름을 입력해주세요.");
				return false;
	}

			if(id.lenth == 0) {
				alert("아이디가 입력되지 않았습니다.\n아이디를 입력해주세요.");
					return false;
    }

			if(isJoinForm && isIdCheck == 'false') {
				alert("아이디 중복 체크를 하지  않았습니다.\n아이디 중복 체크를 해주세요.");
					return false;
	}

			if(pass.lenth == 0) {
				alert("비밀번호가 입력되지 않았습니다.\n비밀번호를 입력해주세요.");
					return false;
   }

			if(pass2.lenth == 0) {
				alert("비밀번호 확인이 입력되지 않았습니다.\n비밀번호 확인을 입력해주세요.");
					return false;
   }

			if(pass1 !== pass2) {
				alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
					return false;
	}

			if(zipcode.length == 0) {
				alert("우편번호가 입력되지 않았습니다.\n 우변번호를 입력해주세요.");
					return false;
	}

			if(address.length == 0) {
				alert("주소가 입력되지 않았습니다.\n 주소를 입력해주세요.");
					return false;
	}

			if(emailId.length == 0) {
				alert("이메일 아이디가 입력되지 않았습니다.\n 이메일 아이디를 입력해주세요.");
					return false;
	}

			if(emailDomail.length == 0) {
				alert("이메일 도메인이 입력되지 않았습니다.\n 이메일 도메인을 입력해주세요.");
					return false;
	}

			if(mobile2.length == 0 || mobile3.lenth == 0) {
				alert("휴대폰 번호가 입력되지 않았습니다.\n 휴대폰 번호를 입력해주세요.");
					return false;
	}

}

	// 우편번호 찾기 - daum 우편번호 찾기 API 이용
	// 회원 가입 촘과 회원정보 수정 폼에서 "우편번호 검색" 버튼이 클릭되면 호출되는 함수
function findZipcode() {
	new daum.Postcode({
		oncomplete: function(data) {
			let addr = '';
			let extraAddr = '';
			
			addr = data.roadAddress;
			
			if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
				extraAddr += data.bname;
			}
			// 건물명이 있고, 공동주택일 경우 추가한다.
			if(data.buildingName !== '' && data.apartment === 'Y'){
				extraAddr += (extraAddr !== '' ?
								', ' + data.buildingName : data.buildingName);
			}
			
			if(extraAddr !== ''){
				extraAddr = ' (' + extraAddr + ')';
			}
			
			//조합된 참고 항목을 상세주소에 추가
			addr += extraAddr;
			
			// 우편번호와 주소 정보를 해당 입력상자에 출력
			$("#zipcode").val(data.zonecode);
			$("#address1").val(addr);
			
			$("#adress2").focus();
			
		}
		
	}).open();
}
