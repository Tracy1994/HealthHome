<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Comment extends CI_Controller {

	public function Comment()
	{
		parent::__construct();

		$this->load->model('CommentMng', 'comment_mng');
	}

	public function add()
	{
		if (!check_login())
		{
			output_cgi_data(ERR_NO_LOGIN, 'user no login');
			return false;
		}

		if (!isset($_REQUEST['article_id']) || intval($_REQUEST['article_id']) == 0 ||
			!isset($_REQUEST['content']) || strlen($_REQUEST['content']) == 0)
		{
			output_cgi_data(ERR_PARAMS, 'params error');
			return false;
		}

		$parent_id = '';
		if (isset($_REQUEST['parent_id']))
		{
			$parent_id = $_REQUEST['parent_id'];
		}

		$ret = $this->comment_mng->add($_REQUEST['article_id'], $_REQUEST['content'], $parent_id);
		if ($ret === false)
		{
			output_cgi_data(ERR_SYSTEM, 'system errror');
			return false;
		}

		output_cgi_data(0, 'succ', array('comment_id' => $ret));
		return true;
	}

	public function remove()
	{
		if (!check_login())
		{
			output_cgi_data(ERR_NO_LOGIN, 'user no login');
			return false;
		}

		if (!isset($_REQUEST['comment_id']) || strlen($_REQUEST['comment_id']) == 0)
		{
			output_cgi_data(ERR_PARAMS, 'params error');
			return false;
		}

		$ret = $this->comment_mng->remove($_REQUEST['comment_id']);
		if ($ret === false)
		{
			output_cgi_data(ERR_SYSTEM, 'system errror');
			return false;
		}

		output_cgi_data(0, 'succ');
		return true;
	}

	public function like()
	{
		if (!check_login())
		{
			output_cgi_data(ERR_NO_LOGIN, 'user no login');
			return false;
		}

		if (!isset($_REQUEST['comment_id']) || strlen($_REQUEST['comment_id']) == 0)
		{
			output_cgi_data(ERR_PARAMS, 'params error');
			return false;
		}

		$ret = $this->comment_mng->like($_REQUEST['comment_id']);
		if ($ret === false)
		{
			output_cgi_data(ERR_SYSTEM, 'system errror');
			return false;
		}

		output_cgi_data(0, 'succ');
		return true;
	}

	public function unlike()
	{
		if (!check_login())
		{
			output_cgi_data(ERR_NO_LOGIN, 'user no login');
			return false;
		}

		if (!isset($_REQUEST['comment_id']) || strlen($_REQUEST['comment_id']) == 0)
		{
			output_cgi_data(ERR_PARAMS, 'params error');
			return false;
		}

		$ret = $this->comment_mng->unlike($_REQUEST['comment_id']);
		if ($ret === false)
		{
			output_cgi_data(ERR_SYSTEM, 'system errror');
			return false;
		}

		output_cgi_data(0, 'succ');
		return true;
	}

	public function get_article_comments()
	{
		if (!isset($_REQUEST['article_id']) || intval($_REQUEST['article_id']) == 0)
		{
			output_cgi_data(ERR_PARAMS, 'params error');
			return false;
		}

		$check = check_login();

		$ret = $this->comment_mng->get_article_comments($_REQUEST['article_id']);
		if ($ret === false)
		{
			output_cgi_data(ERR_SYSTEM, 'system errror');
			return false;
		}

		if (check_login())
		{
			foreach ($ret['items'] as $item) 
			{
				$item['has_like'] = $this->comment_mng->check_like($_REQUEST['article_id']) ? 1 : 0;
				$item['has_unlike'] = $this->comment_mng->check_unlike($_REQUEST['article_id']) ? 1 : 0;
			}
		}
		else
		{
			foreach ($ret['items'] as $item) 
			{
				$item['has_like'] = 0;
				$item['has_unlike'] = 0;
			}
		}

		output_cgi_data(0, 'succ', $ret);
		return true;
	}
}
