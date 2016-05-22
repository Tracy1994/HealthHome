<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class RoleMng extends CI_Model
{
	private $table_name = 'role';
	public function RoleMng()
	{
		parent::__construct();
		$this->load->model('DBOptMng', 'db_opt_mng');
	}

	public function get_user_role($user_name)
	{
		$arr_where = array('user_name' => $user_name);
		$ret = $this->db_opt_mng->select($this->table_name, $arr_where, 'role_id');
		if ($ret == false || count($ret) < 1)
		{
			return 0;
		}
		return intval($ret[0]['role_id']);
	}
}