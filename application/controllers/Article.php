<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Article extends CI_Controller {

	public function Article()
	{
		parent::__construct();
		$this->load->model('ArticleMng', 'article_mng');
	}

	public function get_detail()
	{
		if (!isset($_REQUEST['id']))
		{
			output_cgi_data(ERR_PARAMS, 'params error');
			return false;
		}

		$this->article_mng->get_detail($_REQUEST['id']);
	}

	public function get_list()
	{
		if (!isset($_REQUEST['type_id']))
		{
			output_cgi_data(ERR_PARAMS, 'params error');
			return false;
		}

		$ret = null;
		$type_id = intval($_REQUEST['type_id']);
		$page = isset($_REQUEST['page']) ? intval($_REQUEST['page']) : 0;
		$num = isset($_REQUEST['num']) ? intval($_REQUEST['num']) : 0;
		if ($type_id == 0)
		{
			$ret = $this->article_mng->get_recommend_list($num, $num * ($page-1));
		}
		else
		{
			$ret = $this->article_mng->get_type_list($type_id, $num, $num * ($page-1));
		}

		if ($ret === false)
		{
			output_cgi_data(ERR_SYSTEM, 'system error');
			return false;
		}

		output_cgi_data(0, 'succ', $ret);
		return true;
	}

	public function like()
	{
		if (!check_login())
		{
			output_cgi_data(ERR_NO_LOGIN, 'no login');
			return false;
		}

		if (!isset($_REQUEST['article_id']))
		{
			output_cgi_data(ERR_PARAMS, 'params error');
			return false;
		}

		$ret = $this->article_mng->like($_REQUEST['article_id']);
		if ($ret === false)
		{
			output_cgi_data(ERR_NO_RIGHT, 'you had like');
			return false;
		}

		output_cgi_data(0, 'succ');
	}

	public function click()
	{
		if (!isset($_REQUEST['article_id']))
		{
			output_cgi_data(ERR_PARAMS, 'params error');
			return false;
		}

		$ret = $this->article_mng->click($_REQUEST['article_id']);
		if ($ret === false)
		{
			output_cgi_data(ERR_SYSTEM, 'system error');
			return false;
		}

		output_cgi_data(0, 'succ');
	}

	private function get_summary()
	{

	}
}