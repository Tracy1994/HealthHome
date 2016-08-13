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

	public function get_my_collection($num, $offset)
	{
		$arr_where = array('user_name' => get_user_name());
		$items = $this->db_opt_mng->select_conditions(
			$this->table_name, $arr_where, 'article_id,collect_time', $num, $offset, 'collect_time');
		if ($items === false)
		{
			return false;
		}

		$count = $this->db_opt_mng->get_count($this->table_name, $arr_where);
		if ($count === false)
		{
			return false;
		}

		return array('count' => $count, 'items' => $items);
	}
}
