// DOM(Document Object Model)이 준비되면
$(function() {
	
	// 추천/땡큐 Ajax
	$(".btnCommend").click(function() {
		
		let com = $(this).attr("id");
		console.log("com : " + com);
		
		$.ajax({			
			url: "recommend.ajax",
			
			// type을 지정하지 않으면 기본은 get 방식 요청이다.
			type: "post",
			
			// 파라미터로 보낼 데이터를 객체 리터럴로 작성
			data : { recommend: com, no : $("#no").val()},

			dataType: "json",
			success: function(data) {	
				/* 추천/땡큐가 반영된 것을 사용자에게 알리고 
				 * 응답으로 받은 갱신된 추천하기 데이터를 화면에 표시한다.
				 **/ 
				let msg = com == 'commend' ? "추천이" : "땡큐가";
				alert(msg + " 반영 되었습니다.");
				$("#commend > .recommend").text(" (" + data.recommend + ")");
				$("#thank > .recommend").text(" (" + data.thank + ")");				
			},
			error: function(xhr, status, error) {
				alert("error : " + xhr.statusText + ", " + status + ", " + error);
			}
		});
	});	
});