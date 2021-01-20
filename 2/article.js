$(document).ready(function() {
	function load0(){
		$.ajax({
            url: "load0.php",
            method: "POST",
            data: {},
            //dataType: JSON.stringify(),
            async: false,
            //processData: false,
            //contentType: false,
            success: function(data) {
                //alert(data);
                console.log(data);
                if(data==1)$('#edit_button').show();
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                alert(XMLHttpRequest.status);
                alert(XMLHttpRequest.readyState);
                alert(textStatus);
            },
            complete: function() {}
        })
	}
	load0();
    function load1() {
        $("#feature").hide();
        $.ajax({
            url: "getArticleData.php",
            method: "POST",
            data: {},
            dataType: JSON.stringify(),
            //async: false,
            //processData: false,
            //contentType: false,
            success: function(data) {
                //alert('success');
                console.log(data);
                $('#post_nickname').text("發文者 : " + data[0].nickname);
                $('#post_accountName').text(" @" + data[0].accountName);
                $('#post_date').text("發文日期 : " + data[0].postDate.substr(0, 16));
                $('#post_title').text("標題 : " + data[0].title);
                $('#post_context').attr("value",data[0].context);
                if(data[0].picture!="picture/"){
                    $('#img1').attr("src", data[0].picture);
                }
				
				
            },
            // error: function(XMLHttpRequest, textStatus, errorThrown) {
            //     alert(XMLHttpRequest.status);
            //     alert(XMLHttpRequest.readyState);
            //     alert(textStatus);
            // },
            complete: function() {}
        })
        $("img").each(function(){   
            if($(this).width() > $(this).height()){    
                if($(this).width()>400)$(this).width(400);
            }
            else{
                if($(this).height()>400)$(this).height(400);
            }
        });
    }
	function readmode(){
		$('#post_context').attr("disabled", "disabled");
		$("#edit_button").css("display", "block");
        $("#okbutt").css("display", "none");
	} 
	function editmode(){
		$('#post_context').removeAttr("disabled");
		$('#introction').removeAttr("disabled");
		$("#edit_button").css("display", "none");
        $("#okbutt").css({ "display": "block", "margin-left": "580px", "margin-top": "-30px" });
	}
    load1();
	readmode();
	
	$('#edit_button').click(function() {
        editmode();
    });
	$('#okbutt').click(function(){
        var formData = new FormData();

        formData.append("post_context",$("#post_context").val());


        $.ajax({
            url: "edit_article.php",
            data: formData,
            type: "POST",
            async: false,
            processData: false,
            contentType: false,
            beforeSend: function() {
            },
            success: function(msg) {
            
            },
            error: function(xhr) {
                alert('Ajax request 發生錯誤');
            },
            complete: function() {
            }
        });
        
		load1();
        readmode();

    })
    function load2() {
        $("#feature").hide();
        $.ajax({
            url: "getCommentData.php",
            method: "POST",
            data: {},
            dataType: JSON.stringify(),
            async: false,
            //processData: false,
            //contentType: false,
            success: function(data) {
                //alert('success');
                console.log(data);
              
				
				content='';
				$("#tbody1").append(content);
                for (i = 0; i < data.length; i++) {
                   
                    let content =
                    "<hr/>" + data[i].accountName+"<br/>"+
                    data[i].commentTime+"<br/>"+
                    data[i].comment;
                    $("#tbody1").append(content);
                }
            },
            // error: function(XMLHttpRequest, textStatus, errorThrown) {
            //     alert(XMLHttpRequest.status);
            //     alert(XMLHttpRequest.readyState);
            //     alert(textStatus);
            // },
            complete: function() {}
        })
      
    }
    load2();

    


    $('#butt1-4').click(function() {
        $('#feature').toggle();
    });
    $('#feature').click(function() {
        let feature = event.srcElement.id;
        if (feature == 'logout') {
            $.ajax({
                url: "logout.php",
                data: {},
                type: "POST",
                async: false,
                beforeSend: function() {},
                success: function(msg) {
                    //console.log(msg);
                    window.location = "/../final/login.html";
                },
                error: function(xhr) {
                    alert('Ajax request 發生錯誤');
                },
                complete: function() {}
            });
        }

    });

})