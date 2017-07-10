<?php
include('../../include/config/config.php');
$db = mysql_connect('localhost','root','#Minecraft71802') or die('Failed to connect: ' . mysql_error());
mysql_select_db('popsplit') or die('Failed to access database');
$username = mysql_real_escape_string($_GET['name'], $db);
$clan = mysql_real_escape_string($_GET['clan'], $db);
$score = mysql_real_escape_string($_GET['score'], $db);
$usermode = mysql_real_escape_string($_GET['mode'], $db);
header('Content-type: text/plain');