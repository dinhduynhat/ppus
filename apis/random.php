<?php
$type = $_GET['type'];
$file = '../assets/extras/'.$type.'.txt';
if (!is_file($file)) { die(); }
$array = json_decode(file_get_contents($file));
echo $array[array_rand($array)];