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
		$arr_user_info = array('user_name' => $user_name, 'passwd' => $passwd, 'state' => 1);
		$ret = $this->db_opt_mng->get_count($this->table_name, $arr_user_info);
		if ($ret === false || $ret == 0)
		{
			return false;
		}
		return true;
	}

	public function is_user_exists($user_name, $email)
	{
		$arr_user_info = array('user_name' => $user_name, 'email' => $email);
		$ret = $this->db_opt_mng->get_count($this->table_name, array(), $arr_user_info);
		if ($ret === false || $ret == 0)
		{
			return false;
		}
		return true;
	}

	public function add_user($user_name, $email, $passwd, $active_code)
	{
		$passwd = hash("sha256", $this->str_salt + $passwd);
		$arr_user_info = array(
			'user_name' => $user_name, 
			'email' => $email, 
			'passwd' => $passwd,
			'state' => 0,
			'active_code' =>$active_code);
		return $this->db_opt_mng->insert($this->table_name, $arr_user_info);
	}

	public function update_user_state($user_name, $active_code)
	{
		$ret = $this->db_opt_mng->get_count(
			$this->table_name, array('user_name' =>$user_name, 'active_code' =>$active_code));
		if ($ret == 0 || $ret === false)
		{
			return false;
		}

		$arr_values = array(
			'register_time' => date('y-m-d h:i:s', time()),
			'state' => 1);
		$arr_where = array('user_name' => $user_name);
		return $this->db_opt_mng->update($this->table_name, $arr_values, $arr_where);
	}
}