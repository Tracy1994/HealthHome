<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Carousel extends CI_Controller {

	public function Carousel()
	{
		parent::__construct();

		$this->load->model('CarouselMng', 'carousel_mng');
		$this->load->model('ArticleMng', 'article_mng');
		$this->load->model('UploadMng', 'upload_mng');
	}

	public function add()
	{
		if (!check_login())
		{
			output_cgi_data(ERR_NO_LOGIN, 'user no login');
			return false;
		}

		if (!check_role_editor())
		{
			output_cgi_data(ERR_PERMISSION_DENIED, 'add carousel denied to you');
			return false;
		}

		if (!isset($_REQUEST['article_id']) || intval($_REQUEST['article_id']) <= 0)
		{
			output_cgi_data(ERR_PARAMS, 'params error');
			return false;
		}

		$carousel_url = $this->upload_mng->upload_carousel_img();
		if ($carousel_url === false)
		{
			output_cgi_data(ERR_UPLOAD_FILE, $this->upload_mng->get_err_msg());
			return false;
		}

		$ret = $this->carousel_mng->add($_REQUEST['article_id'], $carousel_url);
		if ($ret === false)
		{
			output_cgi_data(ERR_SYSTEM, 'add carousel failed');
			return false;
		}

		output_cgi_data(0, 'succ');
		return true;
	}

	public function publish()
	{
		if (!check_login())
		{
			output_cgi_data(ERR_NO_LOGIN, 'user no login');
			return false;
		}

		if (!check_role_editor())
		{
			output_cgi_data(ERR_PERMISSION_DENIED, 'publish carousel denied to you');
			return false;
		}

		if (!isset($_REQUEST['carousel_ids']) || strlen($_REQUEST['carousel_ids']) == 0)
		{
			output_cgi_data(ERR_PARAMS, 'params error');
			return false;
		}

		$ret = $this->carousel_mng->publish($_REQUEST['carousel_ids']);
		if ($ret === -1)
		{
			output_cgi_data(ERR_PARAMS, 'carousel id in carousel_ids has at least one is not exist');
			return false;
		}
		if ($ret === -2)
		{
			output_cgi_data(ERR_SYSTEM, 'publish carousel failed');
			return false;
		}

		output_cgi_data(0, 'succ');
		return true;
	}

	private function merge_article_info_list($carousels)
	{
		$arr_article_ids = array();
		foreach ($carousels as $carousel) 
		{
			array_push($arr_article_ids, $carousel['article_id']);
		}

		$articles = $this->article_mng->get_info_list($arr_article_ids);
		if ($articles === false)
		{
			return false;
		}

		$items = array();
		foreach ($carousels as $carousel) 
		{
			foreach ($articles['items'] as $article) 
			{ 
				if ($article['id'] == $carousel['article_id'])
				{
					array_push($items, array_merge($article, $carousel));
					break;
				}
			}
		}
		return $items;
	}

	public function get_effect_list()
	{
		$carousels = $this->carousel_mng->get_effect_list();
		if ($carousels === false)
		{
			output_cgi_data(ERR_SYSTEM, 'get effect carouse list failed');
			return false;
		}

		$items = $this->merge_article_info_list($carousels['items']);
		if ($items === false)
		{
			output_cgi_data(ERR_SYSTEM, 'get article info list failed');
		}

		output_cgi_data(0, 'succ', array('count' => $carousels['count'], 'items' => $items));
		return true;
	}

	public function get_list()
	{
		if (!check_login())
		{
			output_cgi_data(ERR_NO_LOGIN, 'user no login');
			return false;
		}

		if (!check_role_editor())
		{
			output_cgi_data(ERR_PERMISSION_DENIED, 'get history carousel list denied to you');
			return false;
		}

		$num = isset($_REQUEST['num']) ? intval($_REQUEST['num']) : 10;
		$page = isset($_REQUEST['page']) ? intval($_REQUEST['page']) : 1;

		$carousels = $this->carousel_mng->get_list($num, $num * ($page - 1));
		if ($carousels === false)
		{
			output_cgi_data(ERR_SYSTEM, 'get carousel list failed');
			return false;
		}

		$items = $this->merge_article_info_list($carousels['items']);
		if ($items === false)
		{
			output_cgi_data(ERR_SYSTEM, 'get article info list failed');
		}

		output_cgi_data(0, 'succ', array('count' => $carousels['count'], 'items' => $items));
		return true;
	}

}
