<?php
include('connect.php');
$fusername = strip_tags($username);
$hash = $_GET['hash'];
if ($_GET['build'] == $build && $score == base64_decode($hash) && $score < 200000) {
  $query = "INSERT INTO scores
  SET name = '$fusername'
     , clan = '$clan'
     , score = '$score'
     , mode = '$usermode'
     , ts = CURRENT_TIMESTAMP
     ON DUPLICATE KEY UPDATE
     ts = if('$score'>score,CURRENT_TIMESTAMP,ts), score = if ('$score'>score, '$score', score);";
     $result = mysql_query($query) or die('Failed: ' . mysql_error());
  if (mysql_query($query)) { die('Submitted score!'); }
} else {
  die('invalid');
}