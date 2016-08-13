<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Carousel extends CI_Controller {

	public function Carousel()
	{
		parent::__construct();

		$this->load->model('CarouselMng', 'carousel_mng');
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

		if (!isset($_REQUEST['article_id']) || intval($_REQUEST['article_id']) <= 0 ||
			!isset($_REQUEST['begin_time']) || strlen($_REQUEST['begin_time']) == 0 ||
			!isset($_REQUEST['end_time']) || strlen($_REQUEST['end_time']) == 0)
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

		$ret = $this->carousel_mng->add($_REQUEST['article_id'], $_REQUEST['begin_time'],
		                                $_REQUEST['end_time'], $carousel_url);
		if ($ret === false)
		{
			output_cgi_data(ERR_SYSTEM, 'add carousel failed');
			return false;
		}

		output_cgi_data(0, 'succ');
		return true;
	}

	public function modify()
	{
		if (!check_login())
		{
			output_cgi_data(ERR_NO_LOGIN, 'user no login');
			return false;
		}

		if (!check_role_editor())
		{
			output_cgi_data(ERR_PERMISSION_DENIED, 'modify carousel denied to you');
			return false;
		}

		if (!isset($_REQUEST['carousel_id']) || intval($_REQUEST['carousel_id']) <= 0 ||
			!isset($_REQUEST['article_id']) || intval($_REQUEST['article_id']) <= 0 ||
			!isset($_REQUEST['begin_time']) || strlen($_REQUEST['begin_time']) == 0 ||
			!isset($_REQUEST['end_time']) || strlen($_REQUEST['end_time']) == 0)
		{
			output_cgi_data(ERR_PARAMS, 'params error');
			return false;
		}

		$carousel_url = '';
		if (isset($_REQUEST['carouselimg']) && strlen($_REQUEST['carouselimg']) > 0)
		{
			$carousel_url = $this->upload_mng->upload_carousel_img();
			if ($carousel_url === false)
			{
				output_cgi_data(ERR_UPLOAD_FILE, $this->upload_mng->get_err_msg());
				return false;
			}
		}

		$ret = $this->carousel_mng->modify($_REQUEST['carousel_id'], $_REQUEST['article_id'],
			                               $_REQUEST['begin_time'], $_REQUEST['end_time'], $carousel_url);
		if ($ret === false)
		{
			output_cgi_data(ERR_SYSTEM, 'modify carousel info failed');
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

		if (!check_role_editor())
		{
			output_cgi_data(ERR_PERMISSION_DENIED, 'remove carousel denied to you');
			return false;
		}

		if (!isset($_REQUEST['carousel_id']) || intval($_REQUEST['carousel_id']) <= 0)
		{
			output_cgi_data(ERR_PARAMS, 'params error');
			return false;
		}

		$ret = $this->carousel_mng->remove($_REQUEST['carousel_id']);
		if ($ret === false)
		{
			output_cgi_data(ERR_SYSTEM, 'remove carousel info failed');
			return false;
		}

		output_cgi_data(0, 'succ');
		return false;
	}

	public function get_effect_list()
	{
		$ret = $this->carousel_mng->get_effect_list();
		if ($ret === false)
		{
			output_cgi_data(ERR_SYSTEM, 'get effect carouse list failed');
			return false;
		}

		output_cgi_data(0, 'succ', array('count' => count($ret), 'items' => $ret));
		return true;
	}

	public function get_history_list()
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

		$list = $this->carousel_mng->get_history_list($num, $num * ($page - 1));
		if ($list === false)
		{
			output_cgi_data(ERR_SYSTEM, 'get history list failed');
			return false;
		}

		output_cgi_data(0, 'succ', $list);
		return true;
	}

}
