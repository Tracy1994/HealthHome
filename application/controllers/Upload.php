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

    public function index()
    {
        $this->load->view('upload_form', array('error' => ' ' ));
    }

    public function do_upload()
    {
        if (!$this->upload->do_upload('userfile'))
        {
            $error = array('error' => $this->upload->display_errors());
            $this->load->view('upload_form', $error);
        }
        else
        {
            $data = array('upload_data' => $this->upload->data());
            $this->load->view('upload_success', $data);
        }
    }
}
