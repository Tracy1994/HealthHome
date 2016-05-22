<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class DBOptMng extends CI_Model
{
	public function DBOptMng()
	{
		// $this->load->database();
	}

	public function get_count($table_name, $arr_where, $arr_where_or=array())
	{
		if (is_array($arr_where) && count($arr_where) > 0)
		{
			$this->db->where($arr_where);
		}
		if (is_array($arr_where_or) && count($arr_where_or) > 0)
		{
			$this->db->or_where($arr_where_or);
		}
		$this->db->from($table_name);
		return $this->db->count_all_results();
	}

	public function select_conditions($table_name, $arr_where, $str_fields = '', $num = 0, $offset = 0, $str_order_by = '', $str_order_type = 'desc')
	{
		if (is_array($arr_where) && count($arr_where) > 0)
		{
			$this->db->where($arr_where);
		}

		$num = intval($num);
		$offset = intval($offset);
		if ($num > 0 && $offset >= 0)
		{
			$this->db->limit($num, $offset);
		}

		if (strlen($str_fields) > 0)
		{
			$this->db->select($str_fields);
		}

		if (strlen($str_order_by) > 0)
		{
			$this->db->order_by($str_order_by, $str_order_type);
		}

		$ret = $this->db->get($table_name);
		if ($ret === false)
		{
			return false;
		}

		$arr_result = $ret->result_array();
		return $arr_result;

	}

	public function select($table_name, $arr_where, $str_fields = '')
	{	
		return $this->select_conditions($table_name, $arr_where, $str_fields);
	}

	public function select_limit($table_name, $arr_where, $num, $offset, $str_fields = '')
	{
		return $this->select_conditions($table_name, $arr_where, $str_fields, $num, $offset);
	}

	public function update($table_name, $arr_values, $arr_where)
	{
		if (!is_array($arr_values) || count($arr_values) <= 0)
		{
			return false;
		}

		if (!is_array($arr_where) || count($arr_where) <= 0)
		{
			return false;
		}

		return $this->db->update($table_name, $arr_values, $arr_where);
	}

	public function insert($table_name, $arr_values)
	{
		if (!is_array($arr_values) || count($arr_values) <= 0)
		{
			return false;
		}

		return $this->db->insert($table_name, $arr_values);
	}

	public function save($table_name, $arr_values, $arr_where = array())
	{
		if (!is_array($arr_values) || count($arr_values) <= 0)
		{
			return false;
		}

		if (!is_array($arr_where) || count($arr_where) <= 0)
		{
			return $this->db->insert($table_name, $arr_values);
		}
		else
		{
			return $this->db->update($table_name, $arr_values, $arr_where);
		}
	}

	public function delete($table_name, $arr_where)
	{
		if (!is_array($arr_where) || count($arr_where) <= 0)
		{
			return false;
		}
		return $this->db->delete($table_name, $arr_where);
	}
}
