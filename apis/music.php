<?php
include '../include/config/config.php';
require_once('../include/getid3/getid3.php');
$type = $_GET['type'];
$getID3 = new getID3;
$track = $getID3->analyze('..'.$musicdir.$_GET['id'].'.mp3');
getid3_lib::CopyTagsToComments($track);
$artist = $track['comments_html']['artist'][0];
$title = $track['comments_html']['title'][0];
if (!$type) {
  echo $artist.' - '.$title;
} elseif ($type == 'full') {
  echo '<b>'.$artist.'</b> - <b>'.$title.'</b>';
} elseif ($type == 'artist') {
  echo $artist;
} elseif ($type == 'title') {
  echo $title;
}