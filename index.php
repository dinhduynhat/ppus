<?php
$beta = $_GET['beta'];
$tricksplit = false;
if (strpos($_SERVER['HTTP_HOST'],'trick') !== false) {
  include './include/config/tricksplit.php';
  $tricksplit = true;
} else {
  include './include/config/config.php';
}
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Come and play the largest and most active agario server network, featuring chat, custom gamemodes, skins, music, and more!">
    <meta name="keywords" content="agario, agar, io, cell, cells, virus, bacteria, blob, game, games, web game, html5, fun, flash">
    <meta name="robots" content="index, follow">
    <meta name="viewport" content="minimal-ui, width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="google-site-verification" content="ty7PW_OEdI4BMJZZqV2jPwZDPFWHSRmGjbpjbhSTc2k" />
    <title><?php echo $name; if ($tricksplit) { echo ' - Unblocked Agar'; }?></title>
    <link id="favicon" rel="icon" type="image/png" href="/assets/img/favicon.png" />
    <link href="https://fonts.googleapis.com/css?family=Montserrat:600|Cutive+Mono:600" rel="stylesheet">
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css" rel="stylesheet">
    <link href="/assets/css/<?php echo $cssfile; ?>.css?<?php echo $build; ?>" rel="stylesheet" type="text/css">
    <script src="//code.jquery.com/jquery-1.11.3.min.js"></script>
    <audio id="music" src="" onended="musicPlayer();"></audio>
</head>
<body>
  <div id="preloader"></div>
  <div id="dmca">
    <a class="btn btn-warning" onclick="ui.modal('online');">Online <span id="onlineCounter" class="badge">Loading...</span></a>
    <a class="btn btn-success" onclick="ui.modal('hiscores'); eventTracker('Engagement', 'hiscores', 'Opened hiscores');">Hiscores</a>
    <a class="btn btn-primary" onclick="ui.modal('information'); ui.info('changelog'); eventTracker('Engagement', 'credits', 'Opened changelog');">Changelog</a>
  </div>
  <div id="sliders" style="display: none;">
    <div id="skinPack1Slider">
      <div class="slider animated bounceIn" style="height: 130px; background-image: url('<?php echo $skinpack1_background; ?>');">
        <div align="center">
          <h2 style="font-weight: 900; color: #<?php echo $skinpack1_slidertitlecolor; ?>"><?php echo $skinpack1_slidertitle; ?></h2>
          <button class="btn btn-danger btn-sm" onclick="ui.modal('skinPack1Modal'); eventTracker('Engagement', 'skinslider1', 'Used skin slider 1');">Browse Skins</button>
        </div>
      </div>
    </div>
    <div id="skinPack2Slider">
      <div class="slider animated bounceIn" style="height: 130px; background-image: url('<?php echo $skinpack2_background; ?>');">
        <div align="center">
          <h2 style="font-weight: 900; color: #<?php echo $skinpack2_slidertitlecolor; ?>"><?php echo $skinpack2_slidertitle; ?></h2>
          <button class="btn btn-danger btn-sm" onclick="ui.modal('skinPack2Modal'); eventTracker('Engagement', 'skinslider2', 'Used skin slider 2');">Browse Skins</button>
        </div>
      </div>
    </div>
    <div id="songSlider">
      <div class="slider animated bounceIn" style="height: 130px; background-image: url('<?php echo $songbackground; ?>');">
        <div align="center" style="color: #fff">
          <h2>Featured Song</h2>
          <button class="btn btn-warning btn-sm" onclick="musicPlayer(<?php echo $song; ?>);  eventTracker('Engagement', 'song', 'Played featured song');"><?php echo $songartist; ?> - <?php echo $songtitle; ?></button>
        </div>
      </div>
    </div>
    <div id="donateSlider">
      <div class="slider animated bounceIn" style="height: 130px; background-color: #1af2d1;">
        <div align="center" style="color: #fff; margin: 15px;">
          <h2>Support Us!</h2>
          <button class="btn btn-info btn-sm" onclick="window.open('http://paypal.me/chewythepig', '_blank');  eventTracker('Engagement', 'donated', 'Used donate button');" style="color: #FFFFFF; border-color: #1af2d1;">Donate</button>
        </div>
      </div>
    </div>
  </div>
    <div class="modal fade" id="inPageModal" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 id="inPageModalTitle" class="modal-title">Loading...</h4>
                </div>
                <div id="inPageModalBody" class="modal-body" style="overflow-y: scroll; height: 400px;">
                    <div class="center">
                        <div class="loader"></div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="playlist" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 id="playlistTitle" class="modal-title">Loading...</h4>
                </div>
                <div id="playlistBody" class="modal-body" style="overflow-y: scroll; height: 400px;">
                    <div class="center">
                        <div class="loader"></div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="welcome" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-body">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <div class="center" align="center">
                        <h1>Welcome!</h1>
                        <p>Welcome to <?php echo $name; ?>, one of the most actively updated and played agario alternatives. <?php echo $name; ?> features some pretty cool gamemodes, like Crazy, Instant, Vanilla FFA, and loads more! We also stay up-to-date on the latest and greatest skins released from Agar.io, which will be announced here. If you want to join our Discord gaming community, just use our invite link: <a href="<?php echo $discordlink; ?>"><?php echo $discordlink; ?></a>. We hope to see you in-game, thanks for playing!</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="musicDiscord" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content" style="color: #fff; background-color: #2C2F33;">
                <div class="modal-body">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <div class="center" align="center">
                        <h1>That One Music Server</h1>
                        <p>Come and join the official radio for <?php echo $name; ?>! With 5 genres, you can listen to the best music hand picked by our supporters.</p>
                        <a class="btn btn-primary btn-lg" style="border-color: rgba(0,0,0,0.1);" href="https://discord.gg/YTHJEK6" style="background-color: #7289DA;">Join Now</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="party" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-body">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <div class="center" align="center">
                      <h2>Join Party</h2>
                      <div class="form-group" style="width: 100%;">
                        <p class="text-muted" style="margin-bottom: 10px;">Use your party code to play with your friends.</p>
                        <input type="text" maxlength="5" id="partyCodeBox" class="form-control" placeholder="Party Code" style="width: 100%; margin-bottom: 10px;">
                        <a onclick="party.join($('#partyCodeBox').val()); ui.modal('party');  eventTracker('Engagement', 'mparty', 'Manually joined party');" class="btn-primary btn btn-success" style="width: 100%;">Join Party</a>
                      </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="online" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-body">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <div id="onlineCounterModal" class="center text-muted" align="center">
                      <h1><b>Total Online:</b> <span id="onlineTotal">Loading...</span></h1>
                      <h2><b>Alive:</b> <span id="onlineAlive">Loading...</span> | <b>Spec:</b> <span id="onlineSpec">Loading...</span> <br/> <b>Latency:</b> <span id="onlineLag">Loading...</span></h2>
                      <p class="text-muted">Players / Playing / Spectating / Max</p>
                      <table id="onlineCounterTable" class="table table-hover table-bordered table-condensed" style="width: 100%"></table>
                    </div>
                  </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="settings" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-body">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h2 id="title">All Settings</h2><br>
            <div class="form-group checkbox checkbox-grid<?php if ($tricksplit) { echo ' text-muted'; } ?>" style="margin-left: 20px;">
              <div style="margin: 6px;">
                  <label><input type="checkbox" class="save" data-box-id="11" onchange="setSkins(!$(this).is(':checked'));"> No skins</label>
                  <label><input type="checkbox" class="save" data-box-id="12" onchange="setNames(!$(this).is(':checked'));"> No names</label>
                  <label><input type="checkbox" class="save" data-box-id="13" onchange="setDarkTheme(!$(this).is(':checked'));"> Light Theme</label>
                  <label><input type="checkbox" class="save" data-box-id="14" onchange="setColors($(this).is(':checked'));"> No colors</label>
                  <label><input type="checkbox" class="save" data-box-id="15" onchange="setShowMass(!$(this).is(':checked'));"> Hide mass</label>
                  <label><input type="checkbox" class="save" data-box-id="17" onchange="setChatHide($(this).is(':checked'));"> Hide Chat</label>
                  <label><input type="checkbox" class="save" data-box-id="18" onchange="setShowGrid($(this).is(':checked'));"> Show Grid</label>
                  <label><input type="checkbox" class="save" data-box-id="19" onchange="setTransparent($(this).is(':checked'));">Trans Cells</label>
                  <label><input type="checkbox" class="save" data-box-id="20" onchange="setDetailedVirus(!$(this).is(':checked'));"> Simple Vir</label>
                  <label><input type="checkbox" class="save" data-box-id="21" onchange="sounds = !$(this).is(':checked');"> No Sounds</label>
                  <label><input type="checkbox" class="save" data-box-id="22" onchange="setMonoZoom($(this).is(':checked'));"> Mono Zoom</label>
                  <label><input type="checkbox" class="save" data-box-id="23" onchange="setSmooth(!$(this).is(':checked'));"> Animations</label>
                  <label><input type="checkbox" class="save" data-box-id="24" onchange="setTextOutline($(this).is(':checked'));"> Text Borders</label>
                  <label><input type="checkbox" class="save" data-box-id="25" onchange="setCellOutline($(this).is(':checked'));"> Cell Borders</label>
                  <label><input type="checkbox" class="save" data-box-id="26" onchange="setClippedNames($(this).is(':checked'));"> Clip Names</label>
                  <label><input type="checkbox" class="save" data-box-id="27" onchange="setBigNames($(this).is(':checked'));"> Small Names</label>
                  <label><input type="checkbox" class="save" data-box-id="28" onchange="setAutoRespawn($(this).is(':checked'));"> Auto Respawn</label>
                  <label><input type="checkbox" class="save" data-box-id="28" onchange="enableLogging($(this).is(':checked'));"> Logging</label>
                  <label><input type="checkbox" class="save" data-box-id="29" onchange="setSpinnerMode($(this).is(':checked'));"> Spinner Mode</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="term" style="display: none; overflow-x: hidden;">
      <div style="font-family: 'Cutive Mono', monospace; background: #111; width: 100%; height: 100vh; overflow-y: scroll;">
        <div id="terminal" style="background: #111; padding: 0px;">
          <div id="log" style="padding: 10px; opacity: 0.5;">
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="hiscores" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 id="inPageModalTitle" class="modal-title">Hiscores</h4>
                </div>
                <div class="modal-body" style="overflow-y: scroll; height: 400px;">
                    <div id="hiscoresBlock"><div class="loader"></div></div>
                </div>
                <div class="modal-footer">
                    <select id="hiscoresLimit" class="form-control pull-left" style="width: 100px;" onchange="eventTracker('Engagement', 'lhiscores', 'Adjust hiscores limit');" required>
                      <option selected disabled>Limit</option>
                      <option value="10">10</option>
                      <option value="20">20</option>
                      <option value="30">30</option>
                      <option value="50">50</option>
                      <option value="70">70</option>
                      <option value="100">100</option>
                      <option value="200">200</option>
                      <option value="1000">1000</option>
                      <option value="2000">2000</option>
                    </select>
                    <select id="hiscoresMode" class="form-control pull-left" style="width: 100px;" onchange="eventTracker('Engagement', 'mhiscores', 'Adjust hiscores mode');" required>
                      <option value="all" selected>All</option>
                    </select>
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="information" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 id="inPageModalTitle" class="modal-title">Information</h4>
                </div>
                <div class="modal-body" style="overflow-y: scroll; height: 400px;">
                    <div id="informationBody" class="center" align="center">
                        <div class="loader"></div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="skinPack1Modal" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-body">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <div class="center" align="center">
                        <h2><?php echo $skinpack1_title; ?></h2>
                        <li class="skin" onclick="eventTracker('Engagement', 'fskin', 'Used featured skin'); $('#nick').val('[' + $(this).find('.title').text() + '] '); ui.updateSkin(); $('#nick').focus();" data-dismiss="modal">
                            <div class="circular" style='background-image: url("/skins/<?php echo $skinpack1_1; ?>.png")'></div>
                            <h4 class="title"><?php echo $skinpack1_1; ?></h4>
                        </li>
                        <li class="skin" onclick="eventTracker('Engagement', 'fskin', 'Used featured skin'); $('#nick').val('[' + $(this).find('.title').text() + '] '); ui.updateSkin(); $('#nick').focus();" data-dismiss="modal">
                            <div class="circular" style='background-image: url("/skins/<?php echo $skinpack1_2; ?>.png")'></div>
                            <h4 class="title"><?php echo $skinpack1_2; ?></h4>
                        </li>
                        <li class="skin" onclick="eventTracker('Engagement', 'fskin', 'Used featured skin'); $('#nick').val('[' + $(this).find('.title').text().trim() + '] '); ui.updateSkin(); $('#nick').focus();" data-dismiss="modal">
                            <div class="circular" style='background-image: url("/skins/<?php echo $skinpack1_3; ?>.png")'></div>
                            <h4 class="title"><?php echo $skinpack1_3; ?> <span class="badge"><span class="glyphicon glyphicon-star" aria-hidden="true"></span></span></h4>
                        </li>
                        <p><?php echo $skinpack1_subtitle; ?></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="skinPack2Modal" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-body">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <div class="center" align="center">
                        <h2><?php echo $skinpack2_title; ?></h2>
                        <li class="skin" onclick="eventTracker('Engagement', 'fskin', 'Used featured skin'); $('#nick').val('[' + $(this).find('.title').text() + '] '); ui.updateSkin(); $('#nick').focus();" data-dismiss="modal">
                            <div class="circular" style='background-image: url("/skins/<?php echo $skinpack2_1; ?>.png")'></div>
                            <h4 class="title"><?php echo $skinpack2_1; ?></h4>
                        </li>
                        <li class="skin" onclick="eventTracker('Engagement', 'fskin', 'Used featured skin'); $('#nick').val('[' + $(this).find('.title').text() + '] '); ui.updateSkin(); $('#nick').focus();" data-dismiss="modal">
                            <div class="circular" style='background-image: url("/skins/<?php echo $skinpack2_2; ?>.png")'></div>
                            <h4 class="title"><?php echo $skinpack2_2; ?></h4>
                        </li>
                        <li class="skin" onclick="eventTracker('Engagement', 'fskin', 'Used featured skin'); $('#nick').val('[' + $(this).find('.title').text().trim() + '] '); ui.updateSkin(); $('#nick').focus();" data-dismiss="modal">
                            <div class="circular" style='background-image: url("/skins/<?php echo $skinpack2_3; ?>.png")'></div>
                            <h4 class="title"><?php echo $skinpack2_3; ?> <span class="badge"><span class="glyphicon glyphicon-star" aria-hidden="true"></span></span></h4>
                        </li>
                        <p><?php echo $skinpack2_subtitle; ?></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div id="overlays">
      <div id="warning">
          <div id="warningInner" style="width: 350px; margin: 200px auto; padding: 5px; padding-top: 0px; z-index: 3000;" align="center" class="alert alert-danger">
              <h2>Warning</h2>
              <p id="warningText">Loading...</p><br/>
          </div>
      </div>
        <div id="helloDialog">
          <div class="container-fluid">
            <div class="col-xs-4">
              <div class="form-group">
                  <h2 id="title" align="center">Skin</h2>
              </div>
              <div id="mySkin" style="width: 100%; text-align: center; padding-top: 20%; height: 150px; background: no-repeat center; border-radius: 15px;" onclick="openSkinsList(); ui.modal('inPageModal');"><h2 id="skinName" style="color: #fff; margin-top: 0px;"></h2></div><br>
              <div class="form-group">
                  <button align="center" style="width: 100%;" class="btn btn-primary" onclick="eventTracker('Engagement', 'cskin', 'Used skin button'); openSkinsList(); ui.modal('inPageModal');">Choose Skin</button><br/>
              </div>
              <div class="form-group">
                  <button align="center" style="width: 49%;" class="btn btn-success" onclick="eventTracker('Engagement', 'rskin', 'Chose random skin'); $('#nick').val('['+sentencer.gen.skin()+'] '); ui.updateSkin(); ui.skinColor(); $('#nick').focus();">Random</button>
                  <button align="center" style="width: 49%;" class="btn btn-info animated infinite pulse" onclick="eventTracker('Engagement', 'nskin', 'Used new skins button'); ui.modal('skinPack2Modal');">New Skins</button>
              </div>
              <div id="slider">
              </div>
            </div>
            <div class="col-xs-4">
              <form role="form">
                <div class="form-group">
                    <h2 id="title" align="center"><?php echo $name; ?><?php if ($_GET['beta']) { echo '*'; } ?></h2>
                </div>
                <div class="form-group">
                    <input id="clan" class="form-control save" style="margin-bottom: 10px; width: 30%; float: left;" data-box-id="100" placeholder="Clan" maxlength="3">
                    <input id="nick" class="form-control save" style="margin-bottom: 10px; width: 68%; float: right;" data-box-id="0" placeholder="Nick" maxlength="45">
                    <input id="customSkin" class="form-control save" style="margin-bottom: 10px; width: 100%;" data-box-id="101" placeholder="Skin URL" maxlength="50">
                    <select id="gamemode" class="form-control" style="margin-bottom: 0px; width: 100%;" onchange="eventTracker('Game', 'server', 'Switched server'); connector($(this).val()); party.leave(true);" required></select>
                    <br clear="both" />
                </div>
                <div class="form-group" id="serverConnecting" style="height: 100vh; text-align: center; vertical-align: center; padding-top: 70px;">
                  <h3 class="text-muted" id="serverConnectingText">Searching...</h3>
                  <a id="serverInactiveButton" onclick="eventTracker('System', 'active', 'Went active'); activity.reset();" class="btn btn-info" style="width: 100%; display: none;">Reconnect</a>
                </div>
                <div id="mainButtons" style="display: none;">
                  <div class="form-group">
                      <div class="mb-10" style="width: 100%;">
                        <div id="partyDisconnected">
                          <a onclick="party.create();" class="btn-primary btn btn-info" style="width: 49%;">Create Party</a>
                          <a onclick="eventTracker('Engagement', 'partymodal', 'Opened party modal'); ui.modal('party')" class="btn-primary btn btn-warning" style="width: 49%; float: right;">Join Party</a>
                        </div>
                        <div id="partyConnected" style="display: none;">
                          <a onclick="party.leave(false);" class="btn-primary btn party-btn btn-danger" style="width: 100%;">Leave Party</a>
                        </div>
                      </div>
                      <button style="width: 100%;" type="button" id="play-btn" onclick="eventTracker('Game', 'play', 'Pressed play'); play(document.getElementById('nick').value); ui.skinColor(); return false;" class="btn btn-play btn-primary btn-needs-server">Play</button>
                      <br clear="both" />
                  </div>
                  <div class="form-group">
                      <button id="spectate-btn" onclick="eventTracker('Game', 'spectate', 'Pressed spectate'); spectate(); ui.skinColor(); return false;" style="width: 100%" class="btn btn-warning btn-spectate btn-needs-server">Spectate</button>
                  </div>
                </div>
                <div id="settings" class="checkbox" style="display:none;"></div>
            </form>
            <div id="musicStart" align="center">
              <button style="width: 49%" class="btn btn-success" onclick="eventTracker('Music', 'smusic', 'Started music'); musicPlayer();">Play Music</button>
              <button align="center" style="width: 49%;" class="btn" onclick="eventTracker('Engagement', 'rname', 'Chose random name'); sentencer.gen.name();">Random Name</button>
            </div>
            <div id="musicControls" align="center" style="display: none;">
              <div class="form-group">
                  <button style="width: 32%" class="btn btn-success" onclick="eventTracker('Music', 'plmusic', 'Resumed music'); document.getElementById('music').play();">Play</button>
                  <button style="width: 32%" class="btn btn-success" onclick="eventTracker('Music', 'pamusic', 'Paused music'); document.getElementById('music').pause();">Pause</button>
                  <button style="width: 32%" class="btn btn-success" onclick="eventTracker('Music', 'skmusic', 'Skipped music'); musicPlayer();">Skip</button>
              </div>
              <div class="form-group">
                  <a style="width: 100%;" class="btn btn-danger" onclick="eventTracker('Music', 'lmusic', 'Opened playlist'); openPlaylist(); ui.modal('playlist');">Open Playlist</a>
              </div>
              <input id="musicVolume" type="range" style="width: 100%;" min="0" max="1" step="0.1" value="0.5" onchange="document.getElementById('music').volume = $(this).val();" />
              <label style="width: 48%;"><input id="repeatMusic" type="checkbox" onchange="setRepeat($(this).is(':checked'))"> Repeat</label>
              <label style="width: 48%;"><input id="muteMusic" type="checkbox" onchange="muteMusic($(this).is(':checked'))"> Mute</label>
              <br/><p id="musicStatus" class="text-muted"></p>
            </div><br/>
            <div id="bottomBlock" class="form-group">
              <button class="btn" onclick="window.open('http://discord.me/nerdsunited', '_blank')" style="border-color: rgba(0,0,0,0.1); color: #fff; background-color: #7289DA; width: 100%;"><img src="/assets/img/discord-white.png" alt="Discord" height="50px;"></button>
            </div>
            <div id="instructions"></div>
            </div>
            <div class="col-xs-4">
              <div class="form-group">
                <h2 id="title" align="center">Instructions</h2>
              </div>
              <div class="form-group" align="center">
                <span class="text-muted">
                  Move your mouse to control your cell<br/>
                  Press <b>Space</b> to split your cell<br/>
                  Hold <b>W</b> to eject some mass<br/>
                  Press <b>D</b> or <b>2</b> to doublesplit<br/>
                  Press <b>A</b> or <b>3</b> to triplesplit<br/>
                  Press <b>Shift</b> or <b>4</b> to tricksplit<br/>
                  Press <b>C</b> to popsplit<br/>
                </span>
              </div>
              <div class="form-group">
                <h2 id="title" align="center">Settings</h2>
              </div>
              <div class="form-group checkbox checkbox-grid<?php if ($tricksplit) { echo ' text-muted'; } ?>" style="margin-left: 20px;">
                <div style="margin: 6px;">
                    <label><input type="checkbox" class="save" data-box-id="11" onchange="setSkins(!$(this).is(':checked'));"> No skins</label>
                    <label><input type="checkbox" class="save" data-box-id="12" onchange="setNames(!$(this).is(':checked'));"> No names</label>
                    <label><input type="checkbox" class="save" data-box-id="13" onchange="setDarkTheme(!$(this).is(':checked'));"> Light Theme</label>
                    <label><input type="checkbox" class="save" data-box-id="14" onchange="setColors($(this).is(':checked'));"> No colors</label>
                    <label><input type="checkbox" class="save" data-box-id="15" onchange="setShowMass(!$(this).is(':checked'));"> Hide mass</label>
                    <label><input type="checkbox" class="save" data-box-id="17" onchange="setChatHide($(this).is(':checked'));"> Hide Chat</label>
                    <label><input type="checkbox" class="save" data-box-id="18" onchange="setShowGrid($(this).is(':checked'));"> Show Grid</label>
                    <label><input type="checkbox" class="save" data-box-id="19" onchange="setTransparent($(this).is(':checked'));">Trans Cells</label>
                    <label><input type="checkbox" class="save" data-box-id="20" onchange="setDetailedVirus(!$(this).is(':checked'));"> Simple Vir</label>
                    <label><input type="checkbox" class="save" data-box-id="21" onchange="sounds = !$(this).is(':checked');"> No Sounds</label>
                    <label><input type="checkbox" class="save" data-box-id="22" onchange="setMonoZoom($(this).is(':checked'));"> Mono Zoom</label>
                    <label><input type="checkbox" class="save" data-box-id="23" onchange="setSmooth(!$(this).is(':checked'));"> Animations</label>
                </div>
              </div>
              <div align="center" style="margin-top: 15px;"><a class="btn btn-primary btn-sm" style="width: 75%;" onclick="ui.modal('settings');">All Settings</a></div>
            </div>
          </div>
        </div>
    </div>
    <div id="serverstatus" style="color: #fff;">
        <div style="margin: 100px auto; margin-top: 0px; border-radius: 0px; text-align: center;">
            <h3 id="statsName" style="margin: 1px; font-weight: 800;" class="animated infinite pulse">Connecting...</h3>
            <h4 id="alertText" style="margin: 1px; font-weight: 800;"></h4>
            <p style="font-weight: 800;">PLAYERS: <span id="statsPlayers">0</span> | PLAYING: <span id="statsPlaying">0</span> | SPEC: <span id="statsSpec">0</span><br/>
            FPS: <span id="statsFPS">0</span> | PING: <span id="statsPing">0 ms</span> | SCORE: <span id="statsScore">0</span></p>
        </div>
    </div>
    <canvas id="canvas" width="800" height="600"></canvas>
    <input type="text" id="chat_textbox" placeholder="Press enter to chat" maxlength="200">
    <div style="font-family:'Ubuntu'">&nbsp;</div>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
    <script src="/api/<?php if ($beta) { echo 'pre'; } else { echo 'build'; } ?>/config"></script>
    <script src="/api/<?php if ($beta) { echo 'pre'; } else { echo 'build'; } ?>/dependencies"></script>
    <script src="/api/<?php if ($beta) { echo 'pre'; } else { echo 'build'; } ?>/libraries"></script>
    <script src="/api/<?php if ($beta) { echo 'pre'; } else { echo 'build'; } ?>/connector"></script>
    <script src="/api/<?php if ($beta) { echo 'pre'; } else { echo 'build'; } ?>/messenger"></script>
    <script src="/api/<?php if ($beta) { echo 'pre'; } else { echo 'build'; } ?>/sentencer"></script>
    <script src="/api/<?php if ($beta) { echo 'pre'; } else { echo 'build'; } ?>/stats"></script>
    <script src="/api/<?php if ($beta) { echo 'pre'; } else { echo 'build'; } ?>/<?php if ($tricksplit) { echo 'trick'; } ?>analytics"></script>
    <script src="/api/<?php if ($beta) { echo 'pre'; } else { echo 'build'; } ?>/initialize"></script>
    <script src="/api/<?php if ($beta) { echo 'pre'; } else { echo 'build'; } ?>/interface"></script>
    <script src="/api/<?php if ($beta) { echo 'pre'; } else { echo 'build'; } ?>/engine"></script>
</body>
</html>
