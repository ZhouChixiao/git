$(function(){
	
	$(".errorClass").each(function(){
		showError($(this));
		
	});

	$("#submitBtn").hover(
		function(){
			$("#submitBtn").attr("src","/goods/images/regist2.jpg");
		},	
        function(){
			$("#submitBtn").attr("src","/goods/images/regist1.jpg")
		}	
	);
	//得到焦点
	$(".inputStyle").focus(function(){
		var labelId=$(this).attr("id")+"Error";
		$("#"+labelId).text("");
		showError($("#"+labelId));
	});
	//失去焦点
	$(".inputStyle").blur(function(){
		var id=$(this).attr("id");
		var funName="validate"+id.substring(0,1).toUpperCase()+id.substring(1)+"()";
		eval(funName);
	});
	//表单校验
	$("#registForm").submit(function(){
		var bool=true;
		if(!validateLoginname()){
			bool=false;
		}
		if(!validateLoginpass()){
			bool=false;
		}
		if(!validateReloginpass()){
			bool=false;
		}
		if(!validateEmail()){
			bool=false;
		}
		if(!validateVerifyCode()){
			bool=false;
		}
		return bool;
		
	
	});
	
	
	
	
	
	
});

function showError(ele){
	var text=ele.text();
	if(!text){
		ele.css("display","none");
	}else{
		ele.css("display","");
	}
}

function _hyz(){
	
	$("#imgVerifyCode").attr("src","/goods/VerifyCodeServlet?a="+new Date().getTime());
}

function validateLoginname(){
	var id="loginname";
	var value=$("#"+id).val();
    //为空校验
	if(!value){
		$("#"+id+"Error").text("用户名不能为空");
		showError($("#"+id+"Error"));
		return false;
	}
	//长度校验
	if(value.length<3 || value.length>20){
		$("#"+id+"Error").text("长度必须3—20");
		showError($("#"+id+"Error"));
		return false;
	}
	//是否注册校验
	$.ajax({
		url:"/goods/UserServlet",
		data:{method:"ajaxValidateLoginname",loginname:value},
		type:"POST",
		dataType:"json",
		async:false,
		cache:false,
		success:function(result){
			if(!result){
				$("#"+id+"Error").text("用户名已被注册");
				showError($("#"+id+"Error"));
				return false;
			}
		}
	});
	return true;
}
//密码校验
function validateLoginpass(){
	var id="loginpass";
	var value=$("#"+id).val();
	//为空校验
	if(!value){
		$("#"+id+"Error").text("密码不能为空");
		showError($("#"+id+"Error"));
		return false;
	}
	//长度校验
	if(value.length<3 || value.length>20){
		$("#"+id+"Error").text("长度必须3—20");
		showError($("#"+id+"Error"));
		return false;
	}
	return true;
}
//确认密码
function validateReloginpass(){
	var id="reloginpass";
	var value=$("#"+id).val();
	//为空校验
	if(!value){
		$("#"+id+"Error").text("不能为空");
		showError($("#"+id+"Error"));
		return false;
	}
	//长度校验
	if(value.length<3 || value.length>20){
		$("#"+id+"Error").text("长度必须3—20");
		showError($("#"+id+"Error"));
		return false;
	}
	//是否一致
	if(value != $("#loginpass").val()){
		$("#"+id+"Error").text("两次输入不同！");
		showError($("#"+id+"Error"));
		return false;
	}
	return true;
}
//email
function validateEmail(){
	var id="email";
	var value=$("#"+id).val();
	//为空校验
	if(!value){
		$("#"+id+"Error").text("email不能为空");
		showError($("#"+id+"Error"));
		return false;
	}
	//格式
	if(!/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(value)){
		$("#"+id+"Error").text("格式不对！");
		showError($("#"+id+"Error"));
		return false;
	}
	$.ajax({
		url:"/goods/UserServlet",
		data:{method:"ajaxValidateEmail",email:value},
		type:"POST",
		dataType:"json",
		async:false,
		cache:false,
		success:function(result){
			if(!result){
				$("#"+id+"Error").text("email已被注册");
				showError($("#"+id+"Error"));
				return false;
			}
		}
	});
	return true;
}
//验证码
function validateVerifyCode(){
	var id="verifyCode";
	var value=$("#"+id).val();
	//为空校验
	if(!value){
		$("#"+id+"Error").text("验证码不能为空");
		showError($("#"+id+"Error"));
		return false;
	}
	//长度
	if(value.length!=4){
		$("#"+id+"Error").text("验证码错误");
		showError($("#"+id+"Error"));
		return false;
	}
	
	$.ajax({
		url:"/goods/UserServlet",
		data:{method:"ajaxValidateVerifyCode",verifyCode:value},
		type:"POST",
		dataType:"json",
		async:false,
		cache:false,
		success:function(result){
			if(!result){
				$("#"+id+"Error").text("验证码错误！");
				showError($("#"+id+"Error"));
				return false;
			}
		}
	});
	
	
	
	return true;

	
}

