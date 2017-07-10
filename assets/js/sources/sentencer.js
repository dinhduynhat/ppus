var sentencer = {
  nouns: '',
  adjcs: '',
  fetch: function(a) {
    $.get('/assets/extras/'+a+'.txt', function(data) {
      var lines = data.split(/\n/);
      var output = [];
      var outputText = [];
      for (var i = 0; i < lines.length; i++) {
        if (/\S/.test(lines[i])) {
          outputText.push('"' + $.trim(lines[i]) + '"');
          output.push($.trim(lines[i]));
        }
      }
      sentencer[a] = output;
    });
  },
  gen: {
    noun: function() {
      if (sentencer.nouns) {
        var noun = sentencer.nouns[Math.floor(Math.random() * sentencer.nouns.length)];
        return upperCase(noun);
      } else {
        sentencer.fetch('nouns');
      }
    },
    adjective: function() {
      if (sentencer.adjcs) {
        var adjective = sentencer.adjcs[Math.floor(Math.random() * sentencer.adjcs.length)];
        return upperCase(adjective);
      } else {
        sentencer.fetch('adjcs');
      }
    },
    skin: function() {
      var skin = knownSkins[Math.floor(Math.random() * knownSkins.length)];
      return skin;
    },
    full: function() {
      var noun = sentencer.gen.noun();
      var adjective = sentencer.gen.adjective();
      return 'The '+upperCase(adjective)+' '+upperCase(noun);
    },
    name: function() {
      var nick = $('#nick');
      nick.val('');
      sentencer.gen.full()
      if (!sentencer.adjcs || !sentencer.nouns) {
        nick.attr('placeholder','Loading...');
        setTimeout(function(){
          $('#nick').val('['+sentencer.gen.skin()+'] '+sentencer.gen.full());
          nick.attr('placeholder','Nick');
          ui.updateSkin();
          ui.skinColor();
        },1000);
      } else {
        $('#nick').val('['+sentencer.gen.skin()+'] '+sentencer.gen.full());
        ui.updateSkin();
        ui.skinColor();
      }
    }
  }
}