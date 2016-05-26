<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Author extends CI_Controller {
	
	public function Author()
	{
		parent::__construct();

		$config['upload_path']      = './uploads/';
        $config['allowed_types']    = 'gif|jpg|png';
        $config['max_size']     	= 1024;
        $config['max_width']        = 1024;
        $config['max_height']       = 1024;
        $this->load->library('upload', $config);

		$this->load->model('AuthorMng', 'author_mng');
	}

	public function get_all_authors()
	{
		if (!check_login())
		{
			output_cgi_data(ERR_NO_LOGIN, 'user no login');
			return false;
		}

		if (!check_role_editor())
		{
			output_cgi_data(ERR_PERMISSION_DENIED, 'get all authors info denied to you');
			return false;
		}

		$ret = $this->author_mng->get_all_authors();
		if ($ret === false)
		{
			output_cgi_data(ERR_SYSTEM, '系统错误');
			return false;
		}

		output_cgi_data(0, 'succ', $ret);
		return true;
	}

	public function save_author()
	{
		if (!check_login())
		{
			output_cgi_data(ERR_NO_LOGIN, 'user no login');
			return false;
		}

		if (!check_role_editor())
		{
			output_cgi_data(ERR_PERMISSION_DENIED, 'add author info denied to you');
			return false;
		}

		if (!isset($_REQUEST['id']) || !isset($_REQUEST['author']) || !isset($_REQUEST['desp']))
		{
			output_cgi_data(ERR_PARAMS, 'params error');
			return false;
		}

		if (!$this->upload->do_upload('headimg'))
		{
			output_cgi_data(ERR_UPLOAD_FILE, array('error' => $this->upload->display_errors()));
			return false;
		}

		$data = $this->upload->data();
		$headimg_name = date('ymdHis', time()) + '_' + strval(rank(100000, 999999)) + $data['file_ext'];
		$headimg_path = $data['file_path'] + '../headimgs/';
		$ret = rename($data['full_path'], $headimg_path.$headimg_name);
		if ($ret === false)
		{
			output_cgi_data(ERR_SYSTEM, 'system error');
			return false;
		}

		$id = $_REQUEST['id'];
		$author = $_REQUEST['author'];
		$desp = $_REQUEST['desp'];
		$url = '/headimgs/' + $headimg_name;
		$ret = $this->author_mng->add_author($id, $author, $desp, $url);

		if ($id == 0)
		{
			$ret = $this->author_mng->get_author_id($author, $desp, $url);
			if ($ret !== false)
			{
				$id = $ret;
			}
		}

		output_cgi_data(0, 'succ', array('author_id' => $id));
		return true;
	}
}
