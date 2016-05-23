<?php
defined('BASEPATH') OR exit('No direct script access allowed');
?><!DOCTYPE html>
<html>
<head>
<title>Upload Form</title>
</head>
<body>

<h3>Your file was failed uploaded!</h3>

<p><?php echo anchor('upload', 'Upload File Failed!'); ?></p>
<p><?php echo $error; ?></p>

</body>
</html>