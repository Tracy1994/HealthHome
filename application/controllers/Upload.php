<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Upload extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->helper(array('form', 'url'));

        $config['upload_path']      = './uploads/';
        $config['allowed_types']    = 'gif|jpg|png|txt|pdf|doc';
        $config['max_size']     	= 1024;
        $config['max_width']        = 1024;
        $config['max_height']       = 1024;
        $this->load->library('upload', $config);
    }

    public function do_upload()
    {
        if (!isset($_REQUEST['input_name']))
        {
        	output_cgi_data(ERR_PARAMS, 'the name of input tag in html is not set', '');
        	return false;
        }

        if (!$this->upload->do_upload($_REQUEST['input_name']))
        {
            $error = array('error' => $this->upload->display_errors());
            $this->load->view('upload_failed');
        }
        else
        {
            $data = array('upload_data' => $this->upload->data());
            $this->load->view('upload_success', $data);
        }
    }
}
