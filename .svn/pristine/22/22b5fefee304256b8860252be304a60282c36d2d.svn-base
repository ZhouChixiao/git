package webshop.web.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.omg.CORBA.Request;

import webshop.model.User;
import webshop.service.UserException;
import webshop.service.Userservice;

import cn.itcast.commons.CommonUtils;
import cn.itcast.servlet.BaseServlet;

public class UserServlet extends BaseServlet {


	private Userservice userService=new Userservice(); 
	
	//登录
	public String login(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {		
		User formUser=CommonUtils.toBean(request.getParameterMap(), User.class);
		
		Map<String,String> errors=validateLogin(formUser, request.getSession());
		if(errors.size()>0){
			request.setAttribute("form", formUser);
			request.setAttribute("errors", errors);
			return "f:/jsps/user/login.jsp";
		}
		User user=userService.login(formUser);
		if(user==null){
			request.setAttribute("msg", "用户名密码错误!");
			request.setAttribute("user", formUser);
			return "f:/jsps/user/login.jsp"; 
		}else if(!user.getStatus()){
			request.setAttribute("msg", "用户还没有激活!");
			request.setAttribute("user", formUser);
			return "f:/jsps/user/login.jsp"; 
		}else{
			request.getSession().setAttribute("sessionUser",user);
			//创建cookie
			String loginname=user.getLoginname();
			loginname=URLEncoder.encode(loginname,"UTF-8");
			Cookie cookie=new Cookie("loginname", loginname);
			cookie.setMaxAge(60*60*24);
			response.addCookie(cookie);
			return "r:/index.jsp";
		}
	}
	//校验
	private Map<String,String> validateLogin(User formUser,HttpSession session){
		Map<String,String> errors=new HashMap<String, String>();
		
		return errors;
	}
	
	
	
	
	
	
	
	
	
	//用户名
	public String ajaxValidateLoginname(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {		
		//获取用户名
		String loginname=request.getParameter("loginname");
		boolean b=userService.ajaxValidateLoginname(loginname);
		response.getWriter().print(b);
		
		
		return null;
	}
	//email
	public String ajaxValidateEmail(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {		
		//email
				String email=request.getParameter("email");
				boolean b=userService.ajaxValidateEmail(email);
				response.getWriter().print(b);
				
		
		return null;
	}
	//验证码
	public String ajaxValidateVerifyCode(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {		
		//获取输入验证码
		String verifyCode=request.getParameter("verifyCode");
		
		//获取图片验证码
		String vcode=(String)request.getSession().getAttribute("randCheckCode");
		//忽略大小写
		boolean b=verifyCode.equalsIgnoreCase(vcode);
		response.getWriter().print(b);
		
		return null;
	}
	
	public String regist(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {		
		//封装表单数据
		User  formUser=CommonUtils.toBean(request.getParameterMap(), User.class);
		//校验
		Map<String,String> errors=validateRegister(formUser, request.getSession());
		if(errors.size()>0){
			request.setAttribute("form", formUser);
			request.setAttribute("errors", errors);
			return "f:/jsps/user/regist.jsp";
		}
		//使用service
		userService.regist(formUser);
		//保存  穿发msg.jsp
		request.setAttribute("code", "success");
		request.setAttribute("msg", "注册功能，请到邮箱激活！");
	
		return "f:/jsps/msg.jsp";
	}
	
	private Map<String,String> validateRegister(User formUser,HttpSession session){
		Map<String,String> errors=new HashMap<String, String>();
		//用户名
		String loginname=formUser.getLoginname();
		if(loginname==null || loginname.trim().isEmpty()){
			errors.put("loginname", "用户名不能为空！");
		}else if(loginname.length()<3 || loginname.length()>20){
			errors.put("loginname", "长度必须在3—20！");
		}else if(!userService.ajaxValidateLoginname(loginname)){
			errors.put("loginname", "用户名已经注册！");
		}
		//密码
		String loginpass=formUser.getLoginpass();
		if(loginpass==null || loginpass.trim().isEmpty()){
			errors.put("loginpass", "密码不能为空！");
		}else if(loginpass.length()<3 || loginpass.length()>20){
			errors.put("loginpass", "密码必须在3—20！");
		}
		//确认密码
		String reloginpass=formUser.getReloginpass();
		if(reloginpass==null || reloginpass.trim().isEmpty()){
			errors.put("reloginpass", "确认密码不能为空！");
		}else if(!reloginpass.equals(loginpass)){
			errors.put("reloginpass", "密码必须一致！");
		}
		//email
		String email=formUser.getEmail();
		if(email==null || email.trim().isEmpty()){
			errors.put("email", "email不能为空！");
		}else if(!email.matches("^(\\w-*\\.*)+@(\\w-?)+(\\.\\w{2,})+$")){
			errors.put("email", "email格式错误！");
		}else if(!userService.ajaxValidateEmail(email)){
			errors.put("reloginpass", "email已经被注册！");
		}
		//验证码
		String verifyCode=formUser.getVerifyCode();
		String vcode=(String) session.getAttribute("randCheckCode");
		if(verifyCode==null || verifyCode.trim().isEmpty()){
			errors.put("verifyCode", "验证码不能为空！");
		}else if(!verifyCode.equalsIgnoreCase(vcode)){
			errors.put("verifyCode", "验证码错误！");
		}
		return errors;
	}
	//激活
	public String activation(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		 //获取激活码
		String code =request.getParameter("activationCode");
		try {
			userService.activation(code);
			request.setAttribute("code", "success");
			request.setAttribute("msg", "恭喜激活成功！");
		} catch (UserException e) {
			//调用service  异常获取	
			request.setAttribute("msg", e.getMessage());
			request.setAttribute("code","error");
		}
		return "f:/jsps/msg.jsp";
	}

}
