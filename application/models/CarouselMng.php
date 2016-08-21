<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class CarouselMng extends CI_Model {

	private $table_carousel = 'carousel';
	private $table_carousel_publish = 'carousel_publish';
	private $table_effect_carousel = 'effect_carousel';

	public function CarouselMng()
	{
		parent::__construct();
		$this->load->model('DBOptMng', 'db_opt_mng');
	}

	public function add($article_id, $img_url)
	{
		$arr_values = array(
			'article_id' => $article_id,
			'create_user' => get_user_name(),
			'create_time' => date('y-m-d H:i:s', time()),
			'img_url' => $img_url);
		return $this->db_opt_mng->insert($this->table_carousel, $arr_values);
	}

	public function publish($carousel_ids)
	{
		$arr_ids = explode("_", $carousel_ids);
		foreach ($arr_ids as $carousel_id) 
		{
			$arr_where = array('id' => $carousel_ids);
			$count = $this->db_opt_mng->get_count($this->table_carousel, $arr_where);
			if ($count === 0)
			{
				return -1;
			}
		}

		$arr_values = array(
			'publish_user' => get_user_name(),
			'publish_time' => date('y-m-d H:i:s', time()),
			'carousel_ids' => $carousel_ids);
		$ret = $this->db_opt_mng->insert($this->table_carousel_publish, $arr_values);
		if ($ret === false)
		{
			return -2;
		}
		return 0;
	}

	public function get_effect_list()
	{
		$ret = $this->db_opt_mng->select($this->table_effect_carousel);
		if ($ret === false)
		{
			return false;
		}

		if (count($ret) == 0)
		{
			return array('count' => 0, 'items' => array());
		}

		$arr_ids = explode("_", $ret[0]['carousel_ids']);
		$arr_carousel = array();
		foreach ($arr_ids as $carousel_id) 
		{
			$arr_where = array('id' => $carousel_id);
			$ret = $this->db_opt_mng->select($this->table_carousel, $arr_where);
			if ($ret === false || count($ret) == 0)
			{
				continue;
			}

			array_push($arr_carousel, $ret[0]);
		}

		return array('count' => count($ret), 'items' => $arr_carousel);
	}

	public function get_list($num, $offset)
	{
		$count = $this->db_opt_mng->get_count($this->table_carousel);
		if ($count === false)
		{
			return false;
		}

		$items = $this->db_opt_mng->select_conditions(
			$this->table_carousel, array(), '', $num, $offset, 'create_time,id');
		if ($items === false)
		{
			return false;
		}

		return array('count' => $count, 'items' => $items);
	}

}
