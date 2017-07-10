var ui = {
  modal: function(a) {
    if (a != 'none' || a != 'None') { $('#'+a).modal('toggle'); }
  },
  alert: function(a) {
   if (a) {
     $('#alertText').html(a.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ''));
     $('#alertText').animateCss('bounceIn');
   }
  },
  info: function(a) {
    $('#informationBody').html('<div class="loader"></div>');
    setTimeout(function() {
      $.get('/api/info/'+a, function(data) {
        $('#informationBody').html(data);
      });
    },1000)
    setTimeout(function() {
      if ($('#informationBody').html() == '<div class="loader"></div>') {
        $('#informationBody').html('<p>A unknown error occured.</p>');
      }
    }, 5000)
  },
  slider: function(a) {
    $('#slider').html($('#'+a+'Slider').html());
  },
  sliderCycle: function() {
    ui.slider(config.slide1);
    setTimeout(function() {
      ui.slider(config.slide2);
    }, 10000);
    setTimeout(function() {
      ui.slider(config.slide3);
    }, 20000);
    setTimeout(function() {
      ui.slider(config.slide4);
    }, 30000);
    setTimeout(ui.sliderCycle, 40000);
  },
  popup: function(rarity) {
    if (!rarity) { rarity = 10; }
    var rand = Math.floor(Math.random() * rarity);
    setTimeout(function(){
      if (rand==0) { ui.modal('skinPack1Modal'); sfx('explosion');
      } else if (rand==1) { ui.modal('musicDiscord'); sfx('explosion');
      } else if (rand==2) { ui.modal('skinPack2Modal'); sfx('explosion'); }
    },1500);
  },
  skinColor: function() {
    var array = ["FF3333", "33FF33", "3333FF", "FFFF33", "33FFFF", "FF33FF", "FF8833"];
    var random = array[Math.floor(Math.random() * array.length)];
    document.getElementById("mySkin").style.borderColor = '#'+random;
    document.getElementById("mySkin").style.backgroundColor = '#'+random;
  },
  updateSkin: function() {
    var a = $('#nick').val();
    document.getElementById('mySkin').style.backgroundImage = 'url("")';
    $('#skinName').html('Choose a skin');
    var reg = /\[([\w]+)\]/.exec(a);
    if (reg && reg.length === 2) {
      if (knownSkins.indexOf(reg[1].toLowerCase()) !== -1) {
        document.getElementById('mySkin').style.backgroundImage = 'url("/skins/' + reg[1].toLowerCase() + '.png")';
        $('#skinName').html(reg[1].toLowerCase());
      }
    } else {
      document.getElementById('mySkin').style.backgroundImage = $('#customSkin').val();
    }
    if (knownSkins.indexOf(a.toLowerCase()) !== -1) {
      document.getElementById('mySkin').style.backgroundImage = 'url("/skins/' + a.toLowerCase() + '.png")';
      $('#skinName').html(reg[1].toLowerCase());
    }
  },
  updateTags: function(a) {
    if (!a) { a = $("#gamemode option:selected").text(); }
    document.title = config.name+' - '+a;
    $('#statsName').html(config.name+' - '+a);
  },
  build: function() {
    for (var v in modes) {
      if (modes.hasOwnProperty(v)) {
        var game = modes[v], type = i==0 ? 'selected ' : '';
        $('#gamemode').append('<option '+type+' value="'+game.name.toLowerCase()+'">'+game.name+'</option>');
        $('#hiscoresMode').append('<option value="'+game.name.toLowerCase()+'">'+game.name+'</option>');
        for (var i = 0; i < game.servers.length; i++) {
          $('#onlineCounterTable').append('<tr><td>'+game.name+' '+(i+1)+'</td><td><span id="online'+upperCase(game.name.toLowerCase())+i+'">Loading...</span></td></tr>');
        }
      }
    }
  }
}
var repeat = false; var next = ''; var current = ''; var musicMuted = false;
function musicPlayer(request) {
  $('#musicStatus').html('Loading...');
  $('#musicStart').hide(); $('#bottomBlock').hide(); $('#musicControls').show();
  var random = Math.floor(Math.random() * config.musiccount+1); var track = ''; var a = document.getElementById('music');
  if (request) { track = request; } else { track = random; }
  if (repeat && next != '' && next == current) { track = next; }
  a.src = config.musicdir+track+'.mp3';
  current = track;
  ID3.loadTags(a.src, function() {
      var tags = ID3.getAllTags(a.src);
      $('#musicStatus').html('Now Playing: <b>'+tags.artist+'</b> - <b>'+tags.title+'</b>');
  });
  a.play();
  a.volume = $('#musicVolume').val();
  if (musicMuted) { a.volume = 0; }
}
function setRepeat(a) {
  if (a) { repeat = true; next = current; } else { repeat = false; next = ''; }
}
function muteMusic(request) {
  var a = document.getElementById('music');
  if (request) {
    a.volume = 0;
    musicMuted = true;
  } else {
    a.volume = $('#musicVolume').val();
    musicMuted = false;
  }
}
function sfx(a) {
  if (sounds==true) {
    var sfx = new Audio('/assets/sounds/'+a+'.mp3');
    sfx.play();
  }
}
$(function() {
  var content = $('#nick').val();
  $('#nick').keyup(function() { 
    if ($('#nick').val() != content) {
      content = $('#nick').val();
      ui.updateSkin();
    }
  });
});