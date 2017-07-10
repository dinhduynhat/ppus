<?php
if (strpos($_GET['name'],'trick') !== false) {
  include '../include/config/tricksplit.php';
} else {
  include '../include/config/config.php';
}
header('Content-type: text/plain');
echo json_encode(get_defined_vars());