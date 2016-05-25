<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class ArticleMng extends CI_Model {

	private $table_article = 'article';
	private $table_article_all_info = 'article_all_info';
	private $table_article_like = 'article_like';
	private $table_article_click = 'article_click';

	public function ArticleMng()
	{
		parent::__construct();
		$this->load->model('DBOptMng', 'db_opt_mng');
	}

	public function get_detail($id)
	{
		$arr_where = array('id' => $id);
		$str_fields = 'id,title,author,author_desp,author_head_url,tags,create_time,cover_url,like_cnt,click_cnt,content';
		$ret = $this->db_opt_mng->select($this->table_article_all_info, $arr_where, $str_fields);
		if ($ret === fasle || count($ret) != 1)
		{
			return fasle;
		}
		$article = $ret[0];

		$arr_where = array('article_id' => $id, 'user_name' => get_user_name());
		$ret = $this->db_opt_mng->get_count($this->table_article_like, $arr_where);
		if ($ret === fasle)
		{
			$article['has_like'] = 0;
		}
		else
		{
			$article['has_like'] = $ret;
		}

		return $article;
	}

	public function get_recommend_list($num, $offset)
	{
		$arr_where = array('create_time >' => date('y-m-d H:i:s', time() - 31 * 3600 * 24));
		$str_fields = 'id,title,author,author_desp,author_head_url,tags,create_time,summary,cover_url,like_cnt,click_cnt';
		return $this->db_opt_mng->select_conditions(
			$this->table_article_all_info, $arr_where, $str_fields, $num, $offset, 'like_cnt,click_cnt');
	}

	public function get_type_list($type_id, $num, $offset)
	{
		$arr_where = array('type_id' => intval($type_id));
		$str_fields = 'id,title,author,author_desp,author_head_url,tags,create_time,summary,cover_url,like_cnt,click_cnt';
		return $this->db_opt_mng->select_conditions(
			$this->table_article_all_info, $arr_where, $str_fields, $num, $offset, 'create_time,like_cnt,click_cnt');
	}

	public function like($article_id)
	{
		$arr_value = array(
			'article_id' => $article_id, 
			'user_name' => get_user_name(),
			'like_time' => date('y-m-d H:i:s', time()));
		return $this->db_opt_mng->insert($this->article_like, $arr_value);
	}

	public function click($article_id)
	{
		$arr_value = array(
			'article_id' => $article_id, 
			'user_name' => get_user_name(),
			'click_time' => date('y-m-d H:i:s', time()));
		return $this->db_opt_mng->insert($this->article_click, $arr_value);
	}

}
