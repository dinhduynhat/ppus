jQuery(document).ready(function($){NProgress.start();$(window).load(function(){setTimeout(function(){$('#preloader').fadeOut('slow',function(){$(this).remove();}),init();},0);});});
var sounds = true;
function init() {
  NProgress.done();
  mconnect('ws://'+nodes[1].ip+':4000');
  if (window.location.pathname.includes('terminal')) {
    $('body').html($('#term').html());
  } else {
    NProgress.configure({ parent: '#helloDialog' });
    $('#skinName').html('Fetching skins...')
    if ($('#nick').val() !== '') { playerName = $('#nick').val(); }
    $('#nick').val($('#nick').val().replace('{','['));
    $('#nick').val($('#nick').val().replace('}',']'));
    if (!$('#bigNamesCheckbox').is(':checked')) { setBigNames(false); }
    ui.popup(3);
    ui.skinColor();
    ui.sliderCycle();
    var lastClanName = window.localStorage['clanName'] || '';
    var lastCustomSkin = window.localStorage['customSkin'] || '';
    $('#clan').val(lastClanName);
    $('#customSkin').val(lastCustomSkin);
    $("a").click(function(e){sfx('click');});
    $("button").click(function(e){sfx('click');});
    ui.build();
    setInterval(function(){stats.collect();},10000);
    setTimeout(function(){
      var hash = window.location.hash.replace('#','');
      if (hash != 'noserver') {
        if (hash != '') {
          if (hash == 'random') {
            connector('random');
          } else {
            party.join(hash);
          }
        } else {
          connector();
        }
      }
    },3000);
  }
}