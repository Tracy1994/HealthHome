<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Register extends CI_Controller {

	private function send_mail($email, $user_name, $active_code)
	{
		// 邮箱的配置在config/email.php中，由于涉及到密码，所以并不上传到Github上
		$this->load->library('email');
		$this->email->clear();
		$this->email->from('kljianhui@163.com', '健康之家');
		$this->email->to($email);
		$this->email->subject('健康之家注册激活');
		$str_message='http://119.29.197.121/register/active_account?user_name='.$user_name.'&active_code='.$active_code;
		$this->email->message('<p>'.$str_message.'</p>');
		$ret = $this->email->send();
		return $ret;
	}

	public function index()
	{
		if (!isset($_REQUEST['email']) || !isset($_REQUEST['user_name']) || !isset($_REQUEST['passwd']))
		{
			output_cgi_data(ERR_PARAMS, 'user name, Email or password is empty', '');
			return false;
		}

		$user_name = $_REQUEST['user_name'];
		$email = $_REQUEST['email'];
		$passwd = $_REQUEST['passwd'];

		$this->load->model('UsersMng', 'users_mng');
		if ($this->users_mng->is_user_exists($user_name, $email))
		{
			$str_errmsg = 'user: '.$user_name.' or email: '.$_REQUEST['email'].' has exists';
			output_cgi_data(ERR_PARAMS, $str_errmsg, '');
			return false;
		}

		$active_code = hash("md5", $user_name + date('y-m-d h:i:s', time() + rand()));
		$ret = $this->send_mail($email, $user_name, $active_code);
		if ($ret === false)
		{
			output_cgi_data(ERR_SYSTEM, 'send mail error, return: '.strval($ret), '');
			return false;
		}
		$ret = $this->users_mng->add_user($user_name, $email, $passwd, $active_code);
		if ($ret === false)
		{
			output_cgi_data(ERROR_SYSTEM, 'system error, return: '.$ret, '');
			return false;
		}

		output_cgi_data(0, 'please go to to active your account', '');
		return true;
	}

	public function active_account()
	{
		if (!isset($_REQUEST['user_name']) || !isset($_REQUEST['active_code']))
		{
			output_cgi_data(ERR_PARAMS, 'user name or active code is empty', '');
			return false;
		}

		$this->load->model('UsersMng', 'users_mng');
		$ret = $this->users_mng->update_user_state($_REQUEST['user_name'], $_REQUEST['active_code']);
		if ($ret == false)
		{
			output_cgi_data(ERR_CHECK, 'active error', '');
			return false;
		}

		output_cgi_data(0, 'active succ', '');
		$this->load->view('active_account_succ');
		return true;
	}
}