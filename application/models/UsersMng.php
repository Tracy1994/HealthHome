<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class UsersMng extends CI_Model
{
	private $str_salt = 'hnegailntxhm_hyosmqel_ci*';
	private $table_name = 'users';

	public function UsersMng()
	{
		$this->load->model('DBOptMng', 'db_opt_mng');
	}

	public function check_user_info($user_name, $passwd)
	{
		$passwd = hash("sha256", $this->str_salt + $passwd);
		$arr_user_info = array('user_name' => $user_name, 'passwd' => $passwd);
		$ret = $this->db_opt_mng->get_count($this->table_name, $arr_user_info);
		if ($ret === false || $ret == 0)
		{
			return false;
		}
		return true;
	}

	public function is_user_exists($user_name)
	{
		$arr_user_info = array('user_name' => $user_name);
		$ret = $this->db_opt_mng->get_count($this->table_name, $arr_user_info);
		if ($ret === false || $ret == 0)
		{
			return false;
		}
		return true;
	}

	public function add_user($user_name, $passwd)
	{
		$passwd = hash("sha256", $this->str_salt + $passwd);
		$arr_user_info = array('user_name' => $user_name, 'passwd' => $passwd);
		return $this->db_opt_mng->insert($this->table_name, $arr_user_info);
	}
}