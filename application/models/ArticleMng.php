<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class ArticleMng extends CI_Model {

	private $table_article = 'article';
	private $table_article_all_info = 'article_all_info';
	private $table_article_like = 'article_like';
	private $table_article_click = 'article_click';
	private $table_article_author_info = 'article_author_info';
	private $table_comment = 'comment';
	private $table_comment_like = 'comment_like';

	private $field_info_detail = 'id,type_id,title,author,author_desp,author_head_url,create_time,cover_url,like_cnt,click_cnt,comment_cnt,collect_cnt';
	private $field_info_list = 'id,type_id,title,create_time,cover_url,like_cnt,click_cnt,comment_cnt,collect_cnt,summary';
	private $field_info_min = 'id,title,create_time';

	public function ArticleMng()
	{
		parent::__construct();
		$this->load->model('DBOptMng', 'db_opt_mng');
	}

	public function get_info_list($article_id)
	{
		$arr_where = array('id' => $article_id);
		$ret = $this->db_opt_mng->select($this->table_article_all_info, $arr_where, $this->field_info_list);
		if ($ret === false)
		{
			return false;
		}

		if (count($ret) == 0)
		{
			return array();
		}

		return $ret[0];
	}

	public function get_info_detail($article_id)
	{
		$arr_where = array('id' => $article_id);
		$ret = $this->db_opt_mng->select(
			$this->table_article_all_info, $arr_where, $this->field_info_detail);
		if ($ret === false)
		{
			return false;
		}

		if (count($ret) == 0)
		{
			return array();
		}

		return $ret[0];
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
		$arr_where = array('state' => STATE_PUBLISH);
		$items = $this->db_opt_mng->select_conditions(
			$this->table_article_all_info, $arr_where, $this->field_info_list, $num, $offset, 
			'like_cnt,collect_cnt,comment_cnt,click_cnt,create_time');
		if ($items === false)
		{
			return false;
		}

		$count = $this->db_opt_mng->get_count($this->table_article, $arr_where);
		if ($count === false)
		{
			return false;
		}

		return array('count' => $count, 'items' => $items);
	}

	public function get_type_list($type_id, $num, $offset)
	{
		$arr_where = array('type_id' => intval($type_id), 'state' => STATE_PUBLISH);
		$items = $this->db_opt_mng->select_conditions(
			$this->table_article_all_info, $arr_where, $this->field_info_list, $num, $offset, 
			'create_time,like_cnt,collect_cnt,comment_cnt,click_cnt');
		if ($items === false)
		{
			return false;
		}

		$count = $this->db_opt_mng->get_count($this->table_article, $arr_where);
		if ($count === false)
		{
			return false;
		}

		return array('count' => $count, 'items' => $items);
	}

	public function get_latest_list($num, $offset, $detail = false)
	{
		$arr_where = array('state' => STATE_PUBLISH);
		$count = $this->db_opt_mng->get_count($this->table_article, $arr_where);
		if ($count === false)
		{
			return false;
		}

		$items = null;
		if ($detail)
		{
			$items = $this->db_opt_mng->select_conditions(
				$this->table_article_all_info, $arr_where, $this->field_info_list, $num, $offset,
				'create_time,like_cnt,collect_cnt,comment_cnt,click_cnt');
		}
		else
		{
			$items = $this->db_opt_mng->select_conditions(
				$this->table_article, $arr_where, $this->field_info_min, $num, $offset, 'create_time');
		}

		if ($items === false)
		{
			return false;
		}
		
		return array('count' => $count, 'items' => $items);
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

	public function check_like($article_id)
	{
		$arr_where = array(
			'article_id' => intval($article_id),
			'user_name' => get_user_name());
		$count = $this->db_opt_mng->get_count($this->table_article_like, $arr_where);
		if ($count === false || $count === 0)
		{
			return false;
		}
		return true;
	}

	public function click($article_id)
	{
		$arr_value = array(
			'article_id' => intval($article_id), 
			'user_name' => get_user_name(),
			'click_time' => date('y-m-d H:i:s', time()));
		return $this->db_opt_mng->insert($this->table_article_click, $arr_value);
	}

	public function search($key_word, $num, $offset = 0)
	{
		$ret = $this->db->select($this->field_info_list)->from($this->table_article_all_info)
			->where('state', STATE_PUBLISH)
			->or_group_start()
				->like('title', $key_word)
				->like('author', $key_word)
				->like('summary', $key_word)
			->group_end()
			->limit($num, $offset)
			->get();
		if ($ret === false)
		{
			return false;
		}
		$items = $ret->result_array();

		$count = $this->db->select($this->field_info_list)->from($this->table_article_all_info)
			->where('state', STATE_PUBLISH)
			->or_group_start()
				->like('title', $key_word)
				->like('author', $key_word)
				->like('summary', $key_word)
			->group_end()
			->limit($num, $offset)
			->count_all_results();
		if ($count === false)
		{
			$count = count($items);
		}

		return array('count' => $count, 'items' => $items);
	}

	private function gen_summary($content)
	{
		$str = strip_tags($content);
		$len = strlen($str);
		if ($len > 100)
		{
			$len = 100;
		}
		return mb_substr($str, 0, $len, 'utf-8');
	}

	public function add($title, $author_id, $type_id, $cover_url, $content)
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
			'uuid' => $uuid,
			'state' => STATE_PUBLISH);
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

	public function modify($article_id, $title, $author_id, $type_id, $content, $cover_url = '')
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
			'content' => $content);
		if (strlen($head_url) > 0)
		{
			$arr_value['cover_url'] = $cover_url;
		}

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
			return $this->add($title, $author_id, $type_id, $cover_url, $content);
		}
		else
		{
			return $this->modify($article_id, $title, $author_id, $type_id, $cover_url, $content);
		}

		return false;
	}

	public function remove($article_id)
	{
		$arr_where = array('id' => $article_id);
		$arr_value = array('state' => STATE_DELETE);
		
		// 标记文章状态为删除
		$ret = $this->db_opt_mng->update($this->table_article, $arr_value, $arr_where);
		if ($ret === false)
		{
			return false;
		}

		// 标记文章评论数据为删除
		$this->db_opt_mng->update($this->table_comment, $arr_value, $arr_where);
		
		return true;
	}

}
