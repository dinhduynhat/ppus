var msock, malert, msend, logMessages = false;
function enableLogging(a) {
  logMessages = a;
}
function mmessage(event) {
  var msg = JSON.parse(event.data), output, sound, clr, alrt = true, chatMsg = false;
  var color = {
    "red": "#FF3333",
    "green": "#33FF33",
    "blue": "#3333FF",
    "yellow": "#FFFF33",
    "cyan": "#33FFFF",
    "magenta": "#FF33FF",
    "orange": "#FF8833",
    "white": "#FFFFFF"
  }
  switch(msg.action) {
    case 1:
      output = ' was killed';
      sound = 'end';
      clr = 'red';
      break;
    case 2:
      output = ' spawned in';
      sound = 'join';
      clr = 'green';
      break;
    case 3:
      output = ' is now spectating';
      sound = 'spectate';
      clr = 'white';
      break;
    case 4:
      output = ' created a party';
      sound = 'party';
      clr = 'yellow';
      break;
    case 5:
      output = ' joined a party';
      sound = 'party';
      clr = 'yellow';
      break;
    case 6:
      output = ' left their party';
      sound = 'party';
      clr = 'yellow';
      break;
    case 7:
      output = ' connected to the server';
      sound = 'connect';
      clr = 'cyan';
      break;
    case 8:
      output = ' disconnected from the server';
      sound = 'connect';
      clr = 'orange';
      break;
    case 9:
      output = ' got a streak of '+msg.context.message;
      sound = 'split';
      clr = 'magenta';
      break;
    case 10:
      sound = 'explosion';
      alrt = false;
      $('#warningText').html(msg.context.message);
      $('#warning').fadeIn();
      pushChat('INFO',msg.context.message,'#777')
      setTimeout(function(){$('#warning').fadeOut();},5000);
      break;
    case 11:
      sound = 'chat';
      output = ': '+msg.context.message+' || ';
      chatMsg = true;
      break;
  }
  var reg = /\[([^]+)\]/.exec(msg.player);
  if (reg && reg.length === 2) {
    if ($.inArray(reg[1],knownSkins) === -1) msg.player = msg.player.replace(reg[0], "").trim();
    msg.player = msg.player == '' ? 'An unnamed cell' : msg.player;
  }
  if ((msg.id == base.encode(gid) && !chatMsg) || msg.id == 'global') {
    sfx(sound); if (alrt) { ui.alert(msg.player+output+'.'); }
    if (logMessages) {
      pushChat('SERVER',msg.player+output+'.','#777');
    }
  }
  if (window.location.pathname.includes('terminal')) {
    sfx(sound); var parsed = JSON.parse(base.decode(msg.id));
    $('#log').prepend('<p class="animated fadeIn" style="color: '+color[clr]+'">'+msg.player+output+' on '+upperCase(parsed.mode)+' #'+(parsed.id+1)+'.</p>');
  }
}
function mconnect(a){
  msock = new WebSocket(a);
  msock.onmessage = function(event) { mmessage(event) };
  msend = function(act,srv,mess) {
    var server = base.encode(gid);
    if (srv) { server = srv; }
    msock.send(JSON.stringify({id:server,player:getUserName(),action:act,context:{message:mess}}));
  }
  if (window.location.pathname.includes('terminal')) {
    malert = function (mess,srv) {
      var useId = srv ? srv : 'global';
      msock.send(JSON.stringify({id:useId,player:'Server',action:10,context:{message:mess}}));
    }
  }
  msock.onclose = function(){
    setTimeout(function(){mconnect('ws://compute.popsplit.us:4000')},5000);
  };
}
function restartClients() { malert('UPDATE INCOMING! Your game will refresh in 5 seconds... <script>setTimeout(function(){location.reload();},5000);</script>'); }