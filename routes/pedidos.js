var express = require('express');
var router = express.Router();
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var Pedidos = require('../models/Pedidos');

server.listen(4000)

// socket io
io.on('connection', function (socket) {
    socket.on('updatedata', function (data) {
        io.emit('update-data', { data: data });
    });
});

// list data
router.get('/', function(req, res) {
    Pedidos.find(function (err, pedidos) {
        if (err) return next(err);
        res.json(pedidos);
    });
});

// item pedidos report
router.get('/itempedidos',  function(req, res, next) {
    Pedidos.aggregate([
        {
            $group: { 
                _id: { itemId: '$itemId', itemName: '$itemName' }, 
                totalPrice: {
                    $sum: '$totalPrice'
                }
            }
        },
        { $sort: {totalPrice: 1} }
    ], function (err, pedidos) {
        if (err) return next(err);
        res.json(pedidos);
    });
});

// get data by id
router.get('/:id', function(req, res, next) {
    Pedidos.findById(req.params.id, function (err, pedidos) {
        if (err) return next(err);
        res.json(pedidos);
    });
});
  
// post data
router.post('/', function(req, res, next) {
    Pedidos.create(req.body, function (err, pedidos) {
        if (err) {
            console.log(err);
            return next(err);
        }
        res.json(pedidos);
    });
});
  
// put data
router.put('/:id', function(req, res, next) {
    Pedidos.findByIdAndUpdate(req.params.id, req.body, function (err, pedidos) {
        if (err) {
            console.log(err);
            return next(err);
        }
        res.json(pedidos);
    });
});
  
// delete data by id
router.delete('/:id', function(req, res, next) {
    Pedidos.findByIdAndRemove(req.params.id, req.body, function (err, pedidos) {
        if (err) return next(err);
        res.json(pedidos);
    });
});

module.exports = router;