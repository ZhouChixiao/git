<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>注册</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	
	<link rel="stylesheet" type="text/css" href="jsps/css/user/regist.css">
	<script type="text/javascript" src="jquery/jquery-1.5.1.js"></script>
	<script type="text/javascript" src="jsps/js/user/regist.js"></script>


  </head>
  
  <body>
  <div  id="divMain">
     <div id="divTitle">
     <span id="spanTitle">新用户注册</span>
     </div>
     <div id="divBody">
   <form action="${pageContext.request.contextPath}/UserServlet" method="post" id="registForm">
     <input type="hidden" name="method" value="regist"/>
        <table id="tableForm" >
            <tr >
                <td class="tdText">用户名：</td>
                <td class="tdInput">
                    <input type="text" name="loginname" id="loginname" value="${form.loginname}" class="inputStyle"/>
                </td>
                <td class="tdError">
                    <label class="errorClass" id="loginnameError">${errors.loginname}</label>
                </td>
            </tr>
            
            <tr>
                <td class="tdText">密码：</td>
                <td>
                    <input type="password" name="loginpass" id="loginpass" value="${form.loginpass}" class="inputStyle"/>
                </td>
                <td>
                    <label class="errorClass" id="loginpassError">${errors.loginpass}</label>
                </td>
            </tr>
            
            <tr>
                <td class="tdText">确认密码：</td>
                <td>
                    <input type="password" name="reloginpass" id="reloginpass" value="${form.reloginpass}" class="inputStyle"/>
                </td>
                <td>
                    <label class="errorClass" id="reloginpassError">${errors.reloginpass}</label>
                </td>
            </tr>
            
            <tr>
                <td class="tdText">email：</td>
                <td>
                    <input type="text" name="email" id="email" value="${form.email}"  class="inputStyle"/>
                </td>
                <td>
                    <label class="errorClass" id="emailError">${errors.email}</label>
                </td>
            </tr>
            
            <tr>
                <td class="tdText">验证码：</td>
                <td>
                    <input type="text" name="verifyCode" id="verifyCode" value="${form.verifyCode}" class="inputStyle"/>
                </td>
                <td>
                    <label class="errorClass" id="verifyCodeError">${errors.verifyCode}</label>
                </td>
            </tr>
            
            <tr>
                <td></td>
                <td>
                    <div id="divverifyCode"><img  src="VerifyCodeServlet"  id="imgVerifyCode"/></div>
                </td>
                <td>
                    <label><a href="javascript:_hyz()">换一张</a></label>
                </td>
            </tr>
            
            <tr>
                <td></td>
                <td>
                    <input type="image" src="images/regist1.jpg"   id="submitBtn"/>
                </td>
                <td>
                    <label></label>
                </td>
            </tr>
        </table>
 </form>
     </div>
  </div>
  </body>
</html>
