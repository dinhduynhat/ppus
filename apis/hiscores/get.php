<?php
include('connect.php');
header('Content-type: text/html');
$limit = $_GET['limit'];
if (!$limit) { $limit = 10; }
if ($limit > 1000) { $limit = 10; }
if ($usermode && $usermode != 'all') { $query = "SELECT * FROM scores WHERE mode = \"".ucwords($usermode)."\" ORDER by score DESC, ts ASC LIMIT ".$limit."";
} else { $query = "SELECT * FROM scores ORDER by score DESC, ts ASC LIMIT ".$limit.""; }
$result = mysql_query($query) or die('<span align="center">Sorry, we\'re having some issues at the moment.</span>');
$result_length = mysql_num_rows($result); ?>
<table class="table table-hover"><tr><td>Place</td><td>Name</td><td>Clan</td><td>Mode</td><td>Score</td></tr>
<?php for($i = 0; $i < $result_length; $i++) {
    $row = mysql_fetch_array($result);
    $place = $i + 1;
    preg_match_all("/\[[^\]]*\]/", $row['name'], $matches);
    if ($matches) {
      $thisName = str_replace($matches[0],'',$row['name']);
    }
    if ($thisName == '') {
      $thisName = 'An unnamed cell';
    }
    echo '<tr><td>#'.$place.'</td><td>'.$thisName.'</td><td>'.$row['clan'].'</td><td>'.$row['mode'].'</td><td>'.$row['score'].'</td></tr>';
} ?></table>