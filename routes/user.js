const router = require("express").Router();

router.get("/userTest", (req, res) => {
    res.send("User Test is Successfull");
});

router.post("/userPostTest", (req, res) => {
    const username = req.body.username;
    console.log(username);
    res.send("Your username is " + username);
});

module.exports = router;