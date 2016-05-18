<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Register extends CI_Controller {

	public function index()
	{
		if (!isset($_REQUEST['user_name']) || !isset($_REQUEST['passwd']))
		{
			output_cgi_data(-10001, 'user name or password is empty', '');
			return false;
		}

		$this->load->model('UsersMng', 'users_mng');
		if ($this->users_mng->is_user_exists($_REQUEST['user_name']))
		{
			$str_errmsg = 'user: '.$_REQUEST['user_name'].' has exists';
			output_cgi_data(-10003, $str_errmsg, '');
			return false;
		}

		$ret = $this->users_mng->add_user($_REQUEST['user_name'], $_REQUEST['passwd']);
		if ($ret !== false)
		{
			output_cgi_data(0, 'register succ', '');
			return true;
		}
		else
		{
			output_cgi_data(-10004, $ret, '');
			return false;
		}
		return false;
	}

}