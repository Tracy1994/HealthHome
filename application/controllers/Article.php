<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Article extends CI_Controller {

	public function Article()
	{
		parent::__construct();

		$this->load->helper(array('form', 'url'));
		$config['upload_path']      = './uploads/';
		$config['allowed_types']    = 'gif|jpg|png';
		$config['max_size']     	= 1024;
		$config['max_width']        = 1024;
		$config['max_height']       = 1024;
		$this->load->library('upload', $config);

		$this->load->model('ArticleMng', 'article_mng');
		$this->load->model('AuthorMng', 'author_mng');
	}

	public function get_info()
	{
		if (!isset($_REQUEST['article_id']))
		{
			output_cgi_data(ERR_PARAMS, 'params error');
			return false;
		}

		$ret = $this->article_mng->get_info($_REQUEST['article_id']);
		if ($ret === false)
		{
			output_cgi_data(ERR_SYSTEM, 'system errror');
			return false;
		}

		output_cgi_data(0, 'succ', $ret);
		return true;
	}

	public function get_content()
	{
		if (!isset($_REQUEST['article_id']))
		{
			output_cgi_data(ERR_PARAMS, 'params error');
			return false;
		}

		$ret = $this->article_mng->get_content($_REQUEST['article_id']);
		if ($ret === false)
		{
			output_cgi_data(ERR_SYSTEM, 'system errror');
			return false;
		}

		$this->article_mng->click($_REQUEST['article_id']);
		echo $ret;
		return true;
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
		$page = isset($_REQUEST['page']) ? intval($_REQUEST['page']) : 1;
		$num = isset($_REQUEST['num']) ? intval($_REQUEST['num']) : 10;
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

	public function search()
	{
		if (!isset($_REQUEST['key_word']))
		{
			output_cgi_data(ERR_PARAMS, 'key word is empty');
			return false;
		}

		$key_word = $_REQUEST['key_word'];
		$ret = $this->article_mng->search($key_word);
		output_cgi_data(0, 'succ', $ret);
		return true;
	}

	private function upload_cover()
	{	
		if (!$this->upload->do_upload('coverimg'))
		{
			output_cgi_data(ERR_UPLOAD_FILE, 'upload cover error', 
				strip_tags($this->upload->display_errors()));
			return false;
		}

		$data = $this->upload->data();
		$coverimg_name = 'img'.date('YmdHis', time()).strval(mt_rand(100000, 999999)).$data['file_ext'];
		$coverimg_path = $data['file_path'].'../imgs/cover/';
		$ret = rename($data['full_path'], $coverimg_path.$coverimg_name);
		if ($ret === false)
		{
			output_cgi_data(ERR_SYSTEM, 'system error');
			return false;
		}

		return '/coverimgs/'.$coverimg_name;
	}

	private function add_author()
	{
		if (!$this->upload->do_upload('headimg'))
		{
			output_cgi_data(ERR_UPLOAD_FILE, strip_tags($this->upload->display_errors()));
			return false;
		}

		$data = $this->upload->data();
		$headimg_name = 'img'.date('YmdHis', time()).strval(mt_rand(100000, 999999)).$data['file_ext'];
		$headimg_path = $data['file_path'].'../headimgs/';
		$ret = rename($data['full_path'], $headimg_path.$headimg_name);
		if ($ret === false)
		{
			output_cgi_data(ERR_SYSTEM, 'system error');
			return false;
		}

		$author = $_REQUEST['author'];
		$desp = $_REQUEST['author_desp'];
		$url = '/headimgs/'.$headimg_name;
		$ret = $this->author_mng->add_author(0, $author, $desp, $url);
		if ($ret === false)
		{
			return 0;
		}

		return $ret;
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
			output_cgi_data(ERR_PERMISSION_DENIED, 'save article is denied to you');
			return false;
		}

		if (!isset($_REQUEST['title']) || 
			!isset($_REQUEST['author']) || !isset($_REQUEST['author_desp']) || 
			!isset($_REQUEST['type']) || !isset($_REQUEST['content']))
		{
			output_cgi_data(ERR_PARAMS, 'params error');
			return false;
		}

		$article_id = 0;
		if (isset($_REQUEST['article_id']))
		{
			$article_id = intval($_REQUEST['article_id']);
		}

		$type = $_REQUEST['type'];
		$type_id = 0;
		if (array_key_exists($type, $GLOBALS['arr_types']))
		{
			$type_id = $GLOBALS['arr_types'][$type];
		}

		$cover_url = $this->upload_cover();
		if ($cover_url == false)
		{
			output_cgi_data(-1, 'cover url is empty');
			$cover_url = '';
		}

		$author_id = $this->add_author();
		if ($author_id === false)
		{
			output_cgi_data(-1, 'add user failed');
			$author_id = 0;
		}

		$ret = $this->article_mng->save(
			$article_id, $_REQUEST['title'], $author_id, 
			$type_id, $cover_url, $_REQUEST['content']);
		if ($ret === false)
		{
			output_cgi_data(ERR_SYSTEM, 'save article failed');
			return false;
		}

		// $this->load->view('welcome_message');
		output_cgi_data(0, 'succ', $ret);
		return true;
	}
}
