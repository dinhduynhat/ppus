var tried = 1;
var pastServers = [];
var connected = modes[Object.keys(modes)[0]];
var gid = JSON.stringify({'mode':connected.name.toLowerCase(),'id':0});
// eventTracker('System', 'connect', 'Connected to: '+$('#gamemode option:selected').text());
function connector(gamemode,identity) {
  if (gamemode=='random') gamemode = Object.keys(modes)[Math.floor(Math.random()*Object.keys(modes).length)];
  if (!gamemode) gamemode = modes[Object.keys(modes)[0]].name.toLowerCase();
  var toArray = Object.keys(modes);
  var id = identity || 0;
  var gm = modes.hasOwnProperty(gamemode) ? gamemode : toArray[0];
  var srvs = modes[gm].servers;
  if (id===0) id = Math.floor(Math.random()*srvs.length);
  gid = JSON.stringify({'mode':modes[gm].name.toLowerCase(),'id':id});
  if (pastServers.length > 1) msend(8,pastServers[pastServers.length-2]);
  setserver(srvs[id].ip+':'+srvs[id].port);
  pastServers.push(id.hash);
  connected = modes[gm];
  $('#gamemode option[value="'+modes[gm].name.toLowerCase()+'"]').prop('selected', true);
  if (window.location.hash.includes('random')) window.location.hash = '', history.pushState('','',window.location.href.replace('#',''));
  log.info('Connecting to '+upperCase(modes[gm].name)+' #'+(id+1));
  $('#statsName').html(config.name+' - '+upperCase(modes[gm].name)+' #'+(id+1));
}
var inParty = false;
var party = {
  lastDate: '',
  lastMessage: '',
  create: function() {
    $('#mainButtons').hide();
    $('#serverConnecting').show();
    $('#serverConnectingText').html('Creating Party...');
    var hash = base.encode(gid).replace('=','');
    eventTracker('System', 'cparty', 'Created party: '+hash);
    setTimeout(function(){
      inParty = true;
      msend(4);
      window.location.hash = hash;
      $('#partyDisconnected').hide();
      $('#partyConnected').show();
      connector();
    },Math.floor(Math.random() * 9) * 100);
  },
  join: function(code) {
    var hash = code;
    var object = JSON.parse(base.decode(hash));
    $('#mainButtons').hide();
    $('#serverConnecting').show();
    $('#serverConnectingText').html('Joining Party...');
    eventTracker('System', 'tparty', 'Tried party');
    if (object && modes.hasOwnProperty(object.mode)) { valid(); } else { invalid(); }
    function valid() {
      eventTracker('System', 'jparty', 'Joined party: '+hash);
      inParty = true;
      msend(5);
      window.location.hash = hash;
      $('#partyDisconnected').hide();
      $('#partyConnected').show();
      setTimeout(function(){
        connector(object.mode,object.id);
      },Math.floor(Math.random() * 9) * 100);
    }
    function invalid() {
      eventTracker('System', 'fparty', 'Failed party');
      window.location.hash = '';
      window.history.pushState('','',window.location.href.replace('#',''));
      $('#serverConnectingText').html('Invalid Party!');
      $('#partyDisconnected').show();
      $('#partyConnected').hide();
      setTimeout(function(){
        connector();
      },1000);
    }
  },
  leave: function(switching) {
    if (inParty==true) {
      msend(6);
      eventTracker('System', 'lparty', 'Left party');
      window.location.hash = '';
      history.pushState('','',window.location.href.replace('#',''));
      $('#mainButtons').hide();
      $('#serverConnecting').show();
      $('#serverConnectingText').html('Leaving Party...');
      $('#partyDisconnected').show();
      $('#partyConnected').hide();
      setTimeout(function(){
        if (!switching) {
          connector();
        }
      },Math.floor(Math.random() * 9) * 100);
      inParty = false; 
    }
  }
}