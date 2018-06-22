 
 var zone = '';
 var hostname = 'test';
 var ip = '192.168.10.100';
 var identifier = 'node-app';
 var weight = 125;
 var ttl = 600;
 
 var updater = require('../index.js')(zone, hostname, ip, identifier, weight=100, ttl=60);

console.log(updater);
