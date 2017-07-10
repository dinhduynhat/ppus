<?php
include '../include/config/config.php';
$type = $_GET['type'];
$isoffline = false;

$crazy1 = json_decode(file_get_contents('http://'.$node0.':1000'), true);
$crazy2 = json_decode(file_get_contents('http://'.$node0.':1001'), true);
$ultra1 = json_decode(file_get_contents('http://'.$node0.':1500'), true);
$instant1 = json_decode(file_get_contents('http://'.$node1.':2000'), true);
$instant2 = json_decode(file_get_contents('http://'.$node1.':2001'), true);
$ffa1 = json_decode(file_get_contents('http://'.$node1.':3000'), true);
$blitz1 = json_decode(file_get_contents('http://'.$node2.':3001'), true);
$massive1 = json_decode(file_get_contents('http://'.$node2.':3002'), true);
$minions1 = json_decode(file_get_contents('http://'.$node2.':3003'), true);

$crazy1['output'] = $crazy1[$statstype].' / '.$crazy1['max_players'];
$crazy2['output'] = $crazy2[$statstype].' / '.$crazy2['max_players'];
$ultra1['output'] = $ultra1[$statstype].' / '.$ultra1['max_players'];

$instant1['output'] = $instant1[$statstype].' / '.$instant1['max_players'];
$instant2['output'] = $instant2[$statstype].' / '.$instant2['max_players'];
$ffa1['output'] = $ffa1[$statstype].' / '.$ffa1['max_players'];

$blitz1['output'] = $blitz1[$statstype].' / '.$blitz1['max_players'];
$massive1['output'] = $massive1[$statstype].' / '.$massive1['max_players'];
$minions1['output'] = ($minions1[$statstype]/2).' / '.$minions1['max_players'];

if ($crazy1[$statstype]=='' && $crazy1[$statstype]!='0')  { $crazy1['output'] = 'Offline'; $isoffline = true; }
if ($crazy2[$statstype]=='' && $crazy2[$statstype]!='0') { $crazy2['output'] = 'Offline'; $isoffline = true; }
if ($ultra1[$statstype]=='' && $ultra1[$statstype]!='0') { $ultra1['output'] = 'Offline'; $isoffline = true; }
if ($instant1[$statstype]=='' && $instant1[$statstype]!='0') { $instant1['output'] = 'Offline'; $isoffline = true; }
if ($instant2[$statstype]=='' && $instant2[$statstype]!='0') { $instant2['output'] = 'Offline'; $isoffline = true; }
if ($ffa1[$statstype]=='' && $ffa1[$statstype]!='0') { $ffa1['output'] = 'Offline'; $isoffline = true; }
if ($blitz1[$statstype]=='' && $blitz1[$statstype]!='0') { $blitz1['output'] = 'Offline'; $isoffline = true; }
if ($massive1[$statstype]=='' && $massive1[$statstype]!='0') { $massive1['output'] = 'Offline'; $isoffline = true; }
if ($minions1[$statstype]=='' && $minions1[$statstype]!='0') { $minions1['output'] = 'Offline'; $isoffline = true; }

$total = $crazy1[$statstype]+$crazy2[$statstype]+$crazy3[$statstype]+$ultra1[$statstype]+$instant1[$statstype]+$instant2[$statstype]+$instant3[$statstype]+$ffa1[$statstype]+$blitz1[$statstype]+$massive1[$statstype]+$minions1[$statstype];
$totalmax = $crazy1['max_players']+$crazy2['max_players']+$crazy3['max_players']+$ultra1['max_players']+$instant1['max_players']+$instant2['max_players']+$instant3['max_players']+$ffa1['max_players']+$blitz1['max_players']+$massive1['max_players']+$minions1['max_players'];

if ($type == 'total') { echo $total.' / '.$totalmax; 
} elseif ($type == 'totalonline') { echo $total;
} elseif ($type == 'totalmax') { echo $totalmax; 
} else if ($type == 'modal') {
  echo '
  <h2 align="center"><b>Total Online:</b> '.$total.' / '.$totalmax.'</h2>
  <h3 align="center" class="text-muted">
  <b>Crazy 1:</b> '.$crazy1['output'].'<br/>
  <b>Crazy 2:</b> '.$crazy2['output'].'<br/>
  <b>Ultra 1:</b> '.$ultra1['output'].'<br/>
  <b>Instant 1:</b> '.$instant1['output'].'<br/>
  <b>Instant 2:</b> '.$instant2['output'].'<br/>
  <b>FFA 1:</b> '.$ffa1['output'].'<br/>
  <b>Blitz 1:</b> '.$blitz1['output'].'<br/>
  <b>Massive 1:</b> '.$massive1['output'].'<br/>
  <b>Minions 1:</b> '.$minions1['output'].'<br/>
  <h3/>';
  if ($isoffline==true) {
    echo '<div class="alert alert-danger" role="alert"><span style=\"font-weight: 900;\">Oh Snap!</span> One of our servers are down.<br/>
    We\'ve sent our team of server monkeys to fix the problem</div>';
  }
} elseif ($type == '' || !$type) { echo 'No type was defined.'; }
if ($type == 'single') {
  $s = $_GET['server'];
  if ($s == 'crazy1') { $s = $crazy1;
  } elseif ($s == 'crazy2') { $s = $crazy2;
  } elseif ($s == 'crazy3') { $s = $crazy3;
  } elseif ($s == 'ultra1') { $s = $ultra1;
  } elseif ($s == 'instant1') { $s = $instant1;
  } elseif ($s == 'instant2') { $s = $instant2;
  } elseif ($s == 'instant3') { $s = $instant3;
  } elseif ($s == 'ffa1') { $s = $ffa1;
  } elseif ($s == 'blitz1') { $s = $blitz1;
  } elseif ($s == 'massive1') { $s = $massive1;
  } elseif ($s == 'minions1') { $s = $minions1;
  } else { die('invalid'); }
  if ($s[$statstype] >= $s['max_players'] && !$_GET['fullmessage']) { $s['output'] = 'full'; }
  echo $s['output'];
}