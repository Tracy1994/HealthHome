<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class AuthorMng extends CI_Model {
	
	private $table_name = 'author';

	public function AuthorMng()
	{
		parent::__construct();
		$this->load->model('DBOptMng', 'db_opt_mng');
	}

	public function get_all_authors()
	{
		$ret = $this->db_opt_mng->select_conditions(
			$this->table_name, array(), '', 0, 0, 'create_time');
		return $ret;
	}

	public function add($author, $desp, $url)
	{
		$id = get_uuid();
		$arr_values = array(
			'id' => $id,
			'author' => $author,
			'description' => $desp,
			'head_url' => $url,
			'create_time' => date('y-m-d H:i:s', time()));

		$ret = $this->db_opt_mng->insert($this->table_name, $arr_values);
		if ($ret === false)
		{
			return false;
		}
		return $id;
	}

	public function modify($id, $author, $desp, $url)
	{
		$arr_values = array(
			'author' => $author,
			'description' => $desp);
		if (strlen($url) > 0)
		{
			$arr_values['head_url'] = $url;
		}

		$arr_where = array('id' => $id);
		$ret = $this->db_opt_mng->update($this->table_name, $arr_values, $arr_where);
		if ($ret === false)
		{
			return false;
		}
		return $id;
	}
}