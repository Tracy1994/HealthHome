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
		$ret = $this->db_opt_mng->select($this->table_name, array());
		return $ret;
	}

	public function add_author($id, $author, $desp, $url)
	{
		if ($id != 0)
		{
			return;
		}

		$arr_values = array(
			'author' => $author,
			'description' => $desp);
		$ret = $this->db_opt_mng->select($this->table_name, $arr_values);
		if (is_array($ret) && count($ret) > 0)
		{
			return $ret[0]['id'];
		}

		$arr_values['url'] = $url;
		return $this->db_opt_mng->insert($this->table_name, $arr_values);
	}

	public function get_author_id($author, $desp, $url)
	{
		$arr_where = array();
		$arr_where['author'] = $author;
		$arr_where['description'] = $desp;
		if (strlen($url) > 0)
		{
			$arr_where['head_url'] = $url;
		}

		$ret = $this->db_opt_mng->select($this->table_name, $arr_where);
		if (is_array($ret) && count($ret) != 1)
		{
			return $ret[0]['id'];
		}

		return false;
	}
}