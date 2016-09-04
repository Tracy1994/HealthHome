<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class CommentMng extends CI_Model {

	private $table_all_info = 'comment_all_info';
	private $table_comment = 'comment';
	private $table_like = 'comment_like';

	public function CommentMng()
	{
		parent::__construct();
		$this->load->model('DBOptMng', 'db_opt_mng');
	}

	public function add($article_id, $content, $parent_id = '')
	{
		$id = get_uuid();
		$arr_values = array(
			'id' => $id,
			'user_name' => get_user_name(),
			'article_id' => $article_id,
			'comment_time' => date('y-m-d H:i:s', time()),
			'parent_id' => $parent_id,
			'content' => $content,
			'state' => STATE_PUBLISH);
		$ret = $this->db_opt_mng->insert($this->table_comment, $arr_values);
		if ($ret === false)
		{
			return false;
		}
		return $id;
	}

	public function remove($id)
	{
		$arr_values = array('state' => STATE_DELETE);
		$arr_where = array('parent_id' => $id);
		$ret = $this->db_opt_mng->update($this->table_comment, $arr_values, $arr_where);
		if ($ret === false)
		{
			return false;
		}

		$arr_where = array('id' => $id);
		return $this->db_opt_mng->delete($this->table_comment, $arr_where);
	}

	public function like($comment_id)
	{
		if ($this->check_like($comment_id))
		{
			return false;
		}

		$arr_values = array(
			'comment_id' => $comment_id,
			'user_name' => get_user_name(),
			'opt_type' => 1,
			'opt_time' => date('y-m-d H:i:s', time()));
		return $this->db_opt_mng->insert($this->table_like, $arr_values);
	}

	public function unlike($comment_id)
	{
		if ($this->check_unlike($comment_id))
		{
			return false;
		}

		$arr_values = array(
			'comment_id' => $comment_id,
			'user_name' => get_user_name(),
			'opt_type' => 2,
			'opt_time' => date('y-m-d H:i:s', time()));
		return $this->db_opt_mng->insert($this->table_like, $arr_values);
	}

	public function get_article_comments($article_id, $num, $offset)
	{
		$arr_where = array(
			'article_id' => $article_id,
			'state' => STATE_PUBLISH);
		$count = $this->db_opt_mng->get_count($this->table_comment, $arr_where);
		if ($count === false)
		{
			return false;
		}

		$items = $this->db_opt_mng->select_conditions(
			$this->table_all_info, $arr_where, '', $num, $offset, 'comment_time');
		if ($items === false)
		{
			return false;
		}

		foreach ($items as &$item)
		{
			$item['parent_name'] = "";
			$item['parent_content'] = "";
			if (strlen($item['parent_id']) != 0)
			{
				$arr_where = array('id' => $item['parent_id']);
				$parent_item = $this->db_opt_mng->select($this->table_comment, $arr_where);
				if (count($parent_item) > 0)
				{
					$parent_item = $parent_item[0];
					$item['parent_name'] = $parent_item['user_name'];
					$item['parent_content'] = $parent_item['content'];
				}
			}
		}

		return array('count' =>$count, 'items' => $items);
	}

	public function check_like($comment_id)
	{
		$arr_where = array(
			'comment_id' => $comment_id, 
			'user_name' => get_user_name(),
			'opt_type' => 1);
		$count = $this->db_opt_mng->get_count($this->table_like, $arr_where);
		return $count > 0 ? true : false;
	}

	public function check_unlike($comment_id)
	{
		$arr_where = array(
			'comment_id' => $comment_id, 
			'user_name' => get_user_name(),
			'opt_type' => 2);
		$count = $this->db_opt_mng->get_count($this->table_like, $arr_where);
		return $count > 0 ? true : false;
	}
}
