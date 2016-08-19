<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Article extends CI_Controller {

	public function Article()
	{
		parent::__construct();

		$this->load->model('ArticleMng', 'article_mng');
		$this->load->model('AuthorMng', 'author_mng');
		$this->load->model('UploadMng', 'upload_mng');
	}

	public function get_info()
	{
		return $this->get_info_detail();
	}

	public function get_info_list()
	{
		if (!isset($_REQUEST['article_ids']))
		{
			output_cgi_data(ERR_PARAMS, 'params error');
			return false;
		}

		$ret = $this->article_mng->get_info_list($_REQUEST['article_ids']);
		if ($ret === false)
		{
			output_cgi_data(ERR_SYSTEM, 'system errror');
			return false;
		}

		output_cgi_data(0, 'succ', $ret);
		return true;
	}

	public function get_info_detail()
	{
		if (!isset($_REQUEST['article_id']))
		{
			output_cgi_data(ERR_PARAMS, 'params error');
			return false;
		}

		$info = $this->article_mng->get_info_detail($_REQUEST['article_id']);
		if ($info === false)
		{
			output_cgi_data(ERR_SYSTEM, 'system errror');
			return false;
		}

		$info['has_like'] = 0;
		if (check_login())
		{
			$has_like = $this->article_mng->check_like($_REQUEST['article_id']);
			$info['has_like'] = $has_like ? 1 : 0;
		}

		output_cgi_data(0, 'succ', $info);
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
			output_cgi_data(ERR_SYSTEM, 'get article list failed');
			return false;
		}

		output_cgi_data(0, 'succ', $ret);
		return true;
	}

	public function get_latest_list()
	{
		$num = isset($_REQUEST['num']) && intval($_REQUEST['num']) > 0 ? intval($_REQUEST['num']) : 10;
		$page = isset($_REQUEST['page']) && intval($_REQUEST['page']) > 0 ? intval($_REQUEST['page']) : 1;
		$detail = isset($_REQUEST['detail']) && intval($_REQUEST['detail']) == 0 ? false : true;

		$ret = $this->article_mng->get_latest_list($num, $num * ($page-1), $detail);
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

		$num = isset($_REQUEST['num']) && intval($_REQUEST['num']) > 0 ? intval($_REQUEST['num']) : 10;
		$page = isset($_REQUEST['page']) && intval($_REQUEST['page']) > 0 ? intval($_REQUEST['page']) : 1;
		$key_word = $_REQUEST['key_word'];
		$ret = $this->article_mng->search($key_word, $num, $num * ($page - 1));
		if ($ret === false)
		{
			output_cgi_data(ERR_SYSTEM, 'get search result failed');
			return false;
		}

		output_cgi_data(0, 'succ', $ret);
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
			output_cgi_data(ERR_PERMISSION_DENIED, 'save article is denied to you');
			return false;
		}

		if (!isset($_REQUEST['title']) || strlen($_REQUEST['title']) == 0 ||
			!isset($_REQUEST['author']) || strlen($_REQUEST['author']) == 0 ||
			!isset($_REQUEST['author_desp']) || strlen($_REQUEST['author_desp']) == 0 ||
			((!isset($_REQUEST['type_id']) || intval($_REQUEST['type_id']) <= 0) && 
			 (!isset($_REQUEST['type']) || strlen($_REQUEST['type']) == 0)) ||
			!isset($_REQUEST['content']) || strlen($_REQUEST['content']) == 0)
		{
			output_cgi_data(ERR_PARAMS, 'params error');
			return false;
		}

		// 与第一版兼容
		$type_id = 0;
		if (isset($_REQUEST['type_id']))
		{
			$type_id = intval($_REQUEST['type_id']);
		}
		else
		{
			$type = $_REQUEST['type'];
			if (array_key_exists($type, $GLOBALS['arr_types']))
			{
				$type_id = $GLOBALS['arr_types'][$type];
			}
			else
			{
				output_cgi_data(ERR_PARAMS, 'params type error');
				return false;
			}
		}

		$cover_url = $this->upload_mng->upload_cover_img();
		if ($cover_url == false)
		{
			output_cgi_data(ERR_UPLOAD_FILE, 'upload cover failed, '.$this->upload_mng->get_err_msg());
			return false;
		}

		$head_url = $this->upload_mng->upload_head_img();
		if ($head_url === false)
		{
			output_cgi_data(ERR_UPLOAD_FILE, 'upload author head failed, '.$this->upload_mng->get_err_msg());
			return false;
		}

		$author_id = $this->author_mng->add($_REQUEST['author'], $_REQUEST['author_desp'], $head_url);
		if ($author_id === false)
		{
			output_cgi_data(ERR_SYSTEM, 'add user failed');
			return false;
		}

		$ret = $this->article_mng->add(
			$_REQUEST['title'], $author_id, 
			$type_id, $cover_url, $_REQUEST['content']);
		if ($ret === false)
		{
			output_cgi_data(ERR_SYSTEM, 'save article failed');
			return false;
		}

		output_cgi_data(0, 'succ', array('article_id' => $ret));
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
			output_cgi_data(ERR_PERMISSION_DENIED, 'save article is denied to you');
			return false;
		}

		if (!isset($_REQUEST['article_id']) || intval($_REQUEST['article_id']) <= 0 ||
			!isset($_REQUEST['title']) || strlen($_REQUEST['title']) == 0 ||
			!isset($_REQUEST['author']) || strlen($_REQUEST['author']) == 0 ||
			!isset($_REQUEST['author_desp']) || strlen($_REQUEST['author_desp']) == 0 ||
			!isset($_REQUEST['type_id']) || intval($_REQUEST['type_id']) <= 0 ||
			!isset($_REQUEST['content']) || strlen($_REQUEST['content']) == 0)
		{
			output_cgi_data(ERR_PARAMS, 'params error');
			return false;
		}
	
		$article_id = intval($_REQUEST['article_id']);
		$type_id = intval($_REQUEST['type_id']);

		$cover_url = '';
		if (isset($_FILES['coverimg']))
		{
			$cover_url = $this->upload_mng->upload_cover_img();
			if ($cover_url == false)
			{
				output_cgi_data(ERR_UPLOAD_FILE, 'upload cover failed, '.$this->upload_mng->get_err_msg());
				return false;
			}
		}

		$head_url = '';
		if (isset($_FILES['headimg']))
		{
			$head_url = $this->upload_mng->upload_head_img();
			if ($head_url === false)
			{
				output_cgi_data(ERR_UPLOAD_FILE, 'upload author head failed, '.$this->upload_mng->get_err_msg());
				return false;
			}
		}

		$author_id = $this->author_mng->modify($_REQUEST['author'], $_REQUEST['author_desp'], $head_url);
		if ($author_id === false)
		{
			output_cgi_data(ERR_SYSTEM, 'add user failed');
			return false;
		}

		$ret = $this->article_mng->modify($article_id,
			$_REQUEST['title'], $author_id, 
			$type_id, $_REQUEST['content'], $cover_url);
		if ($ret === false)
		{
			output_cgi_data(ERR_SYSTEM, 'save article failed');
			return false;
		}

		output_cgi_data(0, 'succ', array('article_id' => $ret));
		return true;
	}

	public function upload_content_img()
	{
		if (!check_login())
		{
			output_cgi_data(ERR_NO_LOGIN, 'user no login');
			return false;
		}

		if (!check_role_editor())
		{
			output_cgi_data(ERR_PERMISSION_DENIED, 'upload content is denied to you');
			return false;
		}

		$img_url = $this->upload_mng->upload_article_img();
		if ($img_url === false)
		{
			output_cgi_data(ERR_UPLOAD_FILE, $this->upload_mng->get_err_msg());
			return false;
		}

		output_cgi_data(0, 'succ', array('img_url' => $img_url));
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
			output_cgi_data(ERR_PERMISSION_DENIED, 'remove article is denied to you');
			return false;
		}

		if (!isset($_REQUEST['article_id']) || intval($_REQUEST['article_id']) <= 0)
		{
			output_cgi_data(ERR_PARAMS, 'params error');
			return false;
		}

		$ret = $this->article_mng->remove($_REQUEST['article_id']);
		if ($ret === false)
		{
			output_cgi_data(ERR_SYSTEM, 'remove article failed');
			return false;
		}

		output_cgi_data(0, 'succ');
		return true;
	}
}
