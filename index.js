var Connection = require('ssh2');
var conn = new Connection();

function onReady() {
  conn.exec('find /etc', onExec);
}

function onExec(err, stream) {
  if (err) throw err;

  stream.on('exit', function(code, signal) {
    console.log('Stream :: exit :: code: ' + code + ', signal: ' + signal);
  });

  stream.on('close', function() {
    console.log('Stream :: close');
    conn.end();
  });

  stream.on('data', function(data) {
    console.log('STDOUT: ' + data);
  });

  stream.stderr.on('data', function(data) {
    console.log('STDERR: ' + data);
  });
}

conn.connect({
  host: '127.0.0.1',
  port: 22,
  username: 'test_user',
  password: 'qwerty'
});

conn.on('ready', onReady);