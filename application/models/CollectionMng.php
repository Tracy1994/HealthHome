<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class CollectionMng extends CI_Model {

	private $table_name = 'collection';

	public function CollectionMng()
	{
		parent::__construct();
		$this->load->model('DBOptMng', 'db_opt_mng');
	}

	public function add($article_id)
	{
		$arr_values = array(
			'user_name' => get_user_name(),
			'article_id' => $article_id,
			'collect_time' => date('y-m-d H:i:s', time()));
		return $this->db_opt_mng->insert($this->table_name, $arr_values);
	}

	public function remove($article_id)
	{
		$arr_where = array(
			'user_name' => get_user_name(),
			'article_id' => $article_id);
		return $this->db_opt_mng->delete($this->table_name, $arr_where);
	}

	public function get_my_collection()
	{
		$arr_where = array('user_name' => get_user_name());
		return $this->db_opt_mng->select($this->table_name, $arr_where, 'article_id,collect_time');
	}
}
