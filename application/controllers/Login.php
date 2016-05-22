<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Login extends CI_Controller {
	
	public function index()
	{
		if (!session_id())
		{
			session_cache_limiter('private');
			session_cache_expire(15);
			session_start(); 
		}

		if (!isset($_SESSION['user_info']))
		{
			if (!isset($_REQUEST['user_name']) || !isset($_REQUEST['passwd']))
			{
				output_cgi_data(ERR_PARAMS, 'user name or password is empty', '');
				return false;
			}
			
			$this->load->model('UsersMng', 'users_mng');
			$ret = $this->users_mng->check_user_info($_REQUEST['user_name'], $_REQUEST['passwd']);
			if ($ret == true)
			{
				$user_info["user_name"] = $_REQUEST['user_name'];
				$user_info["passwd"] = $_REQUEST['passwd'];
				$_SESSION['user_info'] = $user_info;
				setcookie('user_name',  $_REQUEST['user_name'], time() + 60 * 30, '/');
				output_cgi_data(0, 'login succ', array('user_name' => $_REQUEST['user_name']));
				return true;
			}
			else
			{
				output_cgi_data(ERR_PARAMS, 'user name or password error', '');
				return false;
			}
		}
		else
		{
			output_cgi_data(0, 'user has login', array('user_name' => $_SESSION['user_info']['user_name']));
			setcookie('user_name',  $_SESSION['user_info']['user_name'], time() + 60 * 30, '/');
			return true;
		}
	}

	public function logout()
	{
		if (session_id())
		{
			unset($_SESSION['user_info']);
			session_destroy();
		}
	}
}