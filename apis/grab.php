<?php
include('../include/config/config.php');
header('Content-type: text/plain');
$type = $_GET['type'];
$file = $_GET['file'];
if ($type=='img') { $ext = 'png';
} else if ($type=='sounds') { $ext = 'mp3';
} else if ($type=='tracks') { $ext = 'mp3';
} else { $ext = $type; }
if ($type=='min.js') { $type='js'; }
$full = '../assets/'.$type.'/'.$file.'.'.$ext;
if (file_exists($full)) {
  echo file_get_contents($full);
} else { 
  http_response_code(404);
}