const express = require("express");
const bodyParser = require("body-parser");
const SSEChannel = require('sse-pubsub');

const router = express.Router();
const app = express();
app.use(bodyParser.json());

const channel = new SSEChannel();

router.post("/chat/", function (req, res) {
    const submitedMessage = req.body.message;
    channel.publish(submitedMessage, "message_submited");
    res.sendStatus(200);
});

router.get("/chat/sse", function (req, res) {
    return channel.subscribe(req, res)
});

app.use('/api', router);

var server = app.listen(8080, function () {
    console.log("app running on port.", server.address().port);
});