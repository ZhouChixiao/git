package webshop.dao;

import java.sql.SQLException;

import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.handlers.BeanHandler;
import org.apache.commons.dbutils.handlers.ScalarHandler;

import webshop.model.User;

import cn.itcast.jdbc.TxQueryRunner;

public class UserDao {
	
	private QueryRunner  qr =new TxQueryRunner();

	public User findByLoginnameAndLoginpass(String loginname,String loginpass) throws SQLException{
		String sql="select * from t_user where loginname=? and loginpass=?";
		return qr.query(sql, new BeanHandler<User>(User.class),loginname,loginpass);
	}
	
	
	
	
	
	
	
	
	
	
	//用户名是否注册
	public boolean ajaxValidateLoginname(String loginname) throws SQLException{
		String sql="select count(1) from t_user where loginname=?";
		Number number=(Number)qr.query(sql, new ScalarHandler(),loginname);
		return number.intValue()==0;
	}
	//email是否注册
	public boolean ajaxValidateEmail(String email) throws SQLException{
			String sql="select count(1) from t_user where Email=?";
			Number number=(Number)qr.query(sql, new ScalarHandler(),email);
			return number.intValue()==0;
	}
	public void add(User user) throws SQLException{
		String sql="insert into t_user values(?,?,?,?,?,?)";
		Object[] params={user.getUid(),user.getLoginname(),
				         user.getLoginpass(),user.getEmail(),
				         user.getStatus(),user.getActivationCode()};
		qr.update(sql,params);
	}
	//通过激活码查询用户
	public  User findByCode(String code) throws SQLException{
		String sql="select * from t_user where activationCode=?";
		return qr.query(sql, new BeanHandler<User>(User.class),code);
	}
	//修改用户状态
	public void updateStatus(String uid,boolean status) throws SQLException{
		String sql="update t_user set status=? where uid=?";
		qr.update(sql,status,uid);
	}
	

}
