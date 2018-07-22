package webshop.service;

import java.io.IOException;
import java.sql.SQLException;
import java.text.MessageFormat;
import java.util.Properties;

import javax.mail.MessagingException;
import javax.mail.Session;
import javax.management.RuntimeErrorException;

import org.apache.commons.dbutils.handlers.ScalarHandler;

import cn.itcast.commons.CommonUtils;
import cn.itcast.mail.Mail;
import cn.itcast.mail.MailUtils;

import webshop.dao.UserDao;
import webshop.model.User;

public class Userservice {
 
	private UserDao userDao=new UserDao();
	
	
	//登录
	public User login(User user){
		try {
			return userDao.findByLoginnameAndLoginpass(user.getLoginname(), user.getLoginpass());
		} catch (SQLException e) {
			throw new RuntimeException();
		}
		
	}
	
	
	
	
	
	
	//激活
	public void activation(String code) throws UserException{
		try {
			User user=userDao.findByCode(code);
			if(user == null){
				throw new UserException("无效激活码！");
			}
			if(user.getStatus()){
				throw new UserException("您已经激活，不要二次激活");
			}
			userDao.updateStatus(user.getUid(), true);
		} catch (SQLException e) {
			throw new RuntimeException(e);
		}
	}
	
	
	
	
	
	
	//用户是否注册
	public boolean ajaxValidateLoginname(String loginname) {
		try {
			return userDao.ajaxValidateLoginname(loginname);
		} catch (SQLException e) {
			throw new RuntimeException(e);
		}
	}
	//email是否注册
	public boolean ajaxValidateEmail(String email) {
			
			try {
				return userDao.ajaxValidateEmail(email);
			} catch (SQLException e) {
				throw new RuntimeException(e);
			}
	}
	//补齐数据
	public void regist(User user){
		user.setUid(CommonUtils.uuid());
		user.setStatus(false);
		user.setActivationCode(CommonUtils.uuid()+CommonUtils.uuid());
		try {
			userDao.add(user);
		} catch (SQLException e) {
			throw new RuntimeException(e);
		}
		
		//发邮箱
		//配置文件
				Properties prop=new Properties();
				try {
					prop.load(this.getClass().getClassLoader().getResourceAsStream("email_template.properties"));
				} catch (IOException e1) {
					throw new RuntimeException(e1);
				}
		//登录邮件服务器
		String host=prop.getProperty("host");
		String name=prop.getProperty("username");
		String pass=prop.getProperty("password");
		Session session=MailUtils.createSession(host, name, pass);
		//创建mail对象
		String from=prop.getProperty("from");
		String to=user.getEmail();
		String subject=prop.getProperty("subject");
		String content=MessageFormat.format(prop.getProperty("content"), user.getActivationCode());
		Mail mail=new Mail(from, to, subject, content);
		//发送
		try {
			MailUtils.send(session, mail);
		} catch (MessagingException e) {
			throw new RuntimeException(e);
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
		
		
		
		
		
	}
}
