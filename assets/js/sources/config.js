var nodes = [
  {ip: 'compute.popsplit.us'},
  {ip: 'compute.popsplit.us'}
];
var modes = {
  ffa: {
    name: 'FFA',
    servers: [
      { ip: nodes[0].ip, port: '7002', stats: '1002' }
    ]
  },
  clanwars: {
    name: 'ClanWars',
    servers: [
      { ip: nodes[0].ip, port: '7004', stats: '1004' }
    ]
  },
  crazy: {
    name: 'Crazy',
    servers: [
      { ip: nodes[0].ip, port: '7000', stats: '1000' }
    ]
  },
  instant: {
    name: 'Instant',
    servers: [
      { ip: nodes[0].ip, port: '7001', stats: '1001' }
    ]
  },
  massive: {
    name: 'Massive',
    servers: [
      { ip: nodes[0].ip, port: '8002', stats: '2002' }
    ]
  },
  blitz: {
    name: 'Blitz',
    servers: [
      { ip: nodes[0].ip, port: '7003', stats: '1003' }
    ]
  },
}
var config;
$.get('/api/config?name='+window.location.host, function(data) {
  var object = JSON.parse(data);
  config = object;
});