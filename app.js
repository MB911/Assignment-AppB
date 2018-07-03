const WebSocket = require('ws');
const mysql = require('mysql');
const net = require('net');

// A List of API KEYS if the  one in ws.send() doesn't work
// 8260D505-6C4B-4A5D-80C8-F8D44C529512
// F1E3BE3A-303B-4792-AA9F-4228C7A75460
// 8A810E73-E606-4F1A-B33F-78A9B035571F
// D8D6F04B-961A-4925-8DF2-3E71FFFF479D
// B46FD1C8-70BC-4F2A-AFEB-F92B55224470
// 010D3440-3942-449F-A5F9-12377C451BBB
// 231278B6-02D8-4BAD-A91B-0561032E2384
// D806851F-642D-4F51-9860-8374C9A8C7C4

  const ws = new WebSocket('wss://ws.coinapi.io/v1/');

  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mayankb911',
    database: 'assignment',
  });

  ws.on('open', function open() {
    ws.send(`{
      "type": "hello",
      "apikey": "D806851F-642D-4F51-9860-8374C9A8C7C4",
      "heartbeat": false,
      "subscribe_data_type": ["trade"],
      "subscribe_filter_symbol_id": [
        "BITSTAMP_SPOT_BTC_USD",
        "BITFINEX_SPOT_BTC_LTC",
        "COINBASE_",
        "ITBIT_"
      ]
    }`

    );
  ws.on('message', function(data) {
    console.log(data,':API:');
  });
  });


var savetoDB = (newDdb) => {
  try {
    let db = JSON.parse(newDdb);
    // console.log(newDb.time_exchange);
    let data = [db.uuid, db.price, db.size, db.taker_side, db.symbol_id, db.type];
    //console.log(data);
    connection.beginTransaction();
    let q = `INSERT INTO trade_data(uuid, price, amount, transaction, symbol, type) VALUES (?) `;
    connection.query(q, [data]);
    connection.commit();
  } catch (err) {
    connection.rollback();
    connection.release();
    console.log(err);
    throw err;
  }

};

var server = net.createServer();

server.on('connection', function (socket) {
  var remoteAdd = socket.remoteAddress + ":" + socket.remotePort;
  console.log('New Client connection mades %s', remoteAdd);


  socket.on('data', function (data) {
    console.log('Data from %s: %s', remoteAdd, data);
    ws.on('message', function(data) {

      if (JSON.parse(data).type === 'trade') {
        savetoDB(data);
        socket.write(data);
        //  tscpserve.write_data(JSON.parse(data));
        console.log(data);
      } else {
        console.log('data');
      }
    });

  });

  socket.once('close', function () {
    console.log('Connection closed %s', remoteAdd);
  });

  socket.on('error', function (err) {
    console.log('Connection %s error: %s', remoteAdd, err.message);
  });

});

server.listen(9000, function () {
  console.log('server listening to Port 9000 %j', server.address());
});
