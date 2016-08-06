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

	public function get_info($article_id)
	{
		$arr_where = array('id' => $article_id);
		$str_fields = 'id,title,author,author_desp,author_head_url,tags,create_time,cover_url,like_cnt,click_cnt';
		$ret = $this->db_opt_mng->select($this->table_article_all_info, $arr_where, $str_fields);
		if ($ret === false)
		{
			return false;
		}

		if (count($ret) == 0)
		{
			return array();
		}

		$article = $ret[0];
		$arr_where = array('article_id' => $article_id, 'user_name' => get_user_name());
		$ret = $this->db_opt_mng->get_count($this->table_article_like, $arr_where);
		if ($ret === false)
		{
			$article['has_like'] = 0;
		}
		else
		{
			$article['has_like'] = $ret;
		}

		return $article;
	}

	public function get_content($article_id)
	{
		$arr_where = array('id' => $article_id);
		$str_fields = 'content';
		$ret = $this->db_opt_mng->select($this->table_article, $arr_where, $str_fields);

		if ($ret === false)
		{
			return false;
		}

		if (count($ret) == 0)
		{
			return '';
		}

		return $ret[0]['content'];
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
		$arr_where = array(
			'article_id' => intval($article_id),
			'user_name' => get_user_name());
		$ret = $this->db_opt_mng->get_count($this->table_article_like, $arr_where);
		if ($ret === false || $ret > 0)
		{
			return false;
		}

		$arr_value = array(
			'article_id' => intval($article_id), 
			'user_name' => get_user_name(),
			'like_time' => date('y-m-d H:i:s', time()));
		return $this->db_opt_mng->insert($this->table_article_like, $arr_value);
	}

	public function click($article_id)
	{
		$arr_value = array(
			'article_id' => intval($article_id), 
			'user_name' => get_user_name(),
			'click_time' => date('y-m-d H:i:s', time()));
		return $this->db_opt_mng->insert($this->table_article_click, $arr_value);
	}

	public function search($key_word)
	{
		$str_fields = 'id,title,author,author_head_url,tags,create_time,summary,cover_url,like_cnt,click_cnt';
		$this->db->select($str_fields);

		$arr_like = array(
			'title' => $key_word,
			'author' => $key_word,
			'tags' => $key_word,
			'summary' => $key_word);
		$this->db->or_like($arr_like);

		$this->db->order_by('like_cnt,click_cnt,create_time', 'desc');
		$ret = $this->db->get($this->table_article_all_info);
		if ($ret === false)
		{
			return array();
		}
		return $ret->result_array();
	}

	private function gen_summary($content)
	{
		$str = strip_tags($content);
		$len = strlen($str);
		if ($len > 200)
		{
			$len = 200;
		}
		return mb_substr($str, 0, $len, 'utf-8');
	}

	private function insert_article($title, $author_id, $type_id, $cover_url, $content)
	{
		$uuid = get_uuid();
		$arr_value = array(
			'title' => $title,
			'author_id' => $author_id,
			'editor' => get_user_name(),
			'type_id' => $type_id,
			'tags' => "",
			'create_time' => date('y-m-d H:i:s', time()),
			'modify_time' => date('y-m-d H:i:s', time()),
			'summary' => $this->gen_summary($content),
			'cover_url' => $cover_url,
			'content' => $content,
			'uuid' => $uuid);
		$ret = $this->db_opt_mng->insert($this->table_article, $arr_value);
		if ($ret === false)
		{
			return false;
		}

		$arr_where = array('title' => $title, 'uuid' => $uuid);
		$ret = $this->db_opt_mng->select($this->table_article, $arr_where, 'id');
		if ($ret === false || count($ret) <= 0)
		{
			return true;
		}
		return $ret[0]['id'];

	}

	private function update_article($article_id, $title, $author_id, $type_id, $cover_url, $content)
	{
		$arr_where = array('id' => $article_id);
		$arr_value = array(
			'title' => $title,
			'author_id' => $author_id,
			'editor' => get_user_name(),
			'type_id' => $type_id,
			'tags' => "",
			'modify_time' => date('y-m-d H:i:s', time()),
			'summary' => $this->gen_summary($content),
			'cover_url' => $cover_url,
			'content' => $content);
		$ret = $this->db_opt_mng->update($this->table_article, $arr_value, $arr_where);
		if ($ret === false)
		{
			return false;
		}
		return $article_id;
	}

	public function save($article_id, $title, $author_id, $type_id, $cover_url, $content)
	{
		if ($article_id == 0)
		{
			return $this->insert_article($title, $author_id, $type_id, $cover_url, $content);
		}
		else
		{
			return $this->update_article($article_id, $title, $author_id, $type_id, $cover_url, $content);
		}

		return false;
	}

}
