<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Collection extends CI_Controller {

	public function Collection()
	{
		parent::__construct();

		$this->load->model('CollectionMng', 'collection_mng');
		$this->load->model('ArticleMng', 'article_mng');
	}

	public function add()
	{
		if (!check_login())
		{
			output_cgi_data(ERR_NO_LOGIN, 'user no login');
			return false;
		}

		if (!isset($_REQUEST['article_id']) || intval($_REQUEST['article_id']) == 0)
		{
			output_cgi_data(ERR_PARAMS, 'params error');
			return false;
		}

		$ret = $this->collection_mng->add($_REQUEST['article_id']);
		if ($ret === false)
		{
			output_cgi_data(ERR_SYSTEM, 'system errror');
			return false;
		}

		output_cgi_data(0, 'succ');
		return true;
	}

	public function remove()
	{
		if (!check_login())
		{
			output_cgi_data(ERR_NO_LOGIN, 'user no login');
			return false;
		}

		if (!isset($_REQUEST['article_id']) || intval($_REQUEST['article_id']) == 0)
		{
			output_cgi_data(ERR_PARAMS, 'params error');
			return false;
		}

		$ret = $this->collection_mng->remove($_REQUEST['article_id']);
		if ($ret === false)
		{
			output_cgi_data(ERR_SYSTEM, 'system errror');
			return false;
		}

		output_cgi_data(0, 'succ');
		return true;
	}

	private function merge_article_info_list($collections)
	{
		$arr_article_ids = array();
		foreach ($collections as $collection) 
		{
			array_push($arr_article_ids, $collection['article_id']);
		}
		$articles = $this->article_mng->get_info_list($arr_article_ids);
		if ($articles === false)
		{
			return false;
		}

		$items = array();
		foreach ($collections as $collection) 
		{
			foreach ($articles['items'] as $article) 
			{
				if ($article['id'] == $collection['article_id'])
				{
					array_push($items, array_merge($article, $collection));
					break;
				}
			}
		}
		return $items;
	}

	public function get_my_collection()
	{
		if (!check_login())
		{
			output_cgi_data(ERR_NO_LOGIN, 'user no login');
			return false;
		}

		$num = isset($_REQUEST['num']) && intval($_REQUEST['num']) > 0 ? intval($_REQUEST['num']) : 10;
		$page = isset($_REQUEST['page']) && intval($_REQUEST['page']) > 0 ? intval($_REQUEST['page']) : 1;

		$colletcions = $this->collection_mng->get_my_collection($num, $num * ($page - 1));
		if ($colletcions === false)
		{
			output_cgi_data(ERR_SYSTEM, 'get my collection data failed');
			return false;
		}

		$items = $this->merge_article_info_list($colletcions['items']);
		if ($items === false)
		{
			output_cgi_data(ERR_SYSTEM, 'get article info list failed');
			return false;
		}

		output_cgi_data(0, 'succ', array('count' => $colletcions['count'], 'items' => $items));
		return true;
	}
}
