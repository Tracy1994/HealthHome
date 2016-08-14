<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class CarouselMng extends CI_Model {

	private $table_name = 'carousel';

	public function CarouselMng()
	{
		parent::__construct();
		$this->load->model('DBOptMng', 'db_opt_mng');
	}

	public function add($article_id, $begin_time, $end_time, $priority, $img_url)
	{
		$arr_values = array(
			'article_id' => $article_id,
			'create_user' => get_user_name(),
			'modify_user' => get_user_name(),
			'create_time' => date('y-m-d H:i:s', time()),
			'modify_time' => date('y-m-d H:i:s', time()),
			'begin_time' => $begin_time,
			'end_time' => $end_time,
			'img_url' => $img_url,
			'state' => STATE_PUBLISH,
			'priority' => $priority);
		return $this->db_opt_mng->insert($this->table_name, $arr_values);
	}

	public function modify($id, $article_id, $begin_time, $end_time, $priority, $img_url = '')
	{
		$arr_where = array('id' => $id);
		$arr_values = array(
			'article_id' => $article_id,
			'modify_user' => get_user_name(),
			'modify_time' => date('y-m-d H:i:s', time()),
			'begin_time' => $begin_time,
			'end_time' => $end_time);
		
		if (intval($priority) > 0)
		{
			$arr_values['priority'] = $priority;
		}

		if (strlen($img_url) > 0)
		{
			$arr_values['img_url'] = $img_url;
		}

		return $this->db_opt_mng->update($this->table_name, $arr_values, $arr_where);
	}

	public function remove($id)
	{
		$arr_where = array('id' => $id);
		$arr_values = array('state' => STATE_DELETE);
		return $this->db_opt_mng->update($this->table_name, $arr_values, $arr_where);
	}

	public function get_effect_list()
	{
		$now = date('y-m-d H:i:s', time());
		$arr_where = array(
			'begin_time<=' => $now, 
			'end_time >=' => $now,
			'state' => STATE_PUBLISH);
		$ret = $this->db_opt_mng->select_order($this->table_name, $arr_where, 'priority,create_time');
		if ($ret === false)
		{
			return false;
		}

		return array('count' => count($ret), 'items' => $ret);
	}

	public function get_history_list($num, $offset)
	{
		$arr_where = array('state' => STATE_PUBLISH);
		$count = $this->db_opt_mng->get_count($this->table_name, $arr_where);
		if ($count === false)
		{
			return false;
		}

		$list = $this->db_opt_mng->select_conditions(
			$this->table_name, $arr_where, '', $num, $offset, 'create_time');
		if ($list === false)
		{
			return false;
		}

		return array('count' => $count, 'items' => $list);
	}

}
