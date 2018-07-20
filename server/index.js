const express = require("express");

const router = express.Router();
const app = express();

router.post("/chat/", function (req, res) {

});

router.get("/chat/sse", function (req, res) {

});

app.use('/api', router);

var server = app.listen(8080, function () {
    console.log("app running on port.", server.address().port);
});