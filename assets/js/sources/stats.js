var stats = {
  totalplayers: 0,
  totalplaying: 0,
  totalspec: 0,
  totalmax: 0, //$('#online'+node.id).html(current+' / '+o['max_players']);
  latency: [],
  output: {},
  get: function(game,id,host) {
    $.get('http://'+host, function(data) {
      var response = JSON.parse(data),
          players = response['current_players'],
          playing = response['alive'],
          spec = response['spectators'],
          max = response['max_players'],
          latency = response['update_time'];
      stats.totalplayers = stats.totalplayers + players;
      stats.totalplaying = stats.totalplaying + playing;
      stats.totalspec = stats.totalspec + spec;
      stats.totalmax = stats.totalmax + max;
      stats.latency.push(Math.round(latency));
      $('#onlineTotal').html(stats.totalplayers+' / '+stats.totalmax);
      $('#onlineCounter').html(stats.totalplayers+'/'+stats.totalmax);
      $('#onlineAlive').html(stats.totalplaying);
      $('#onlineSpec').html(stats.totalspec);
      var sum = 0; for(var i=0;i<stats.latency.length;i++){sum+=parseInt(stats.latency[i],10);}
      var avg = sum/stats.latency.length;
      $('#onlineLag').html(Math.round(avg));
      $('#online'+upperCase(game.name.toLowerCase())+id).html(players+' / '+max);
    }).fail(function() {
      $('#online'+upperCase(game.name.toLowerCase())+id).html('Offline');
    });
  },
  collect: function() {
    for (var v in modes) {
      if (modes.hasOwnProperty(v)) {
        var length = Object.keys(modes).length;
        if (Object.keys(modes)[length-1] == v) {
          stats.totalplayers = 0;
          stats.totalplaying = 0;
          stats.totalspec = 0;
          stats.totalmax = 0;
        }
        var game = modes[v];
        stats.output[v] = {};
        for (var i = 0; i < game.servers.length; i++) {
          stats.get(game,i,game.servers[i].ip+':'+game.servers[i].stats);
        }
      }
    }
  }
}