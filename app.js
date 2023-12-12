const express = require("express");
const twilio = require("twilio");
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: false }));

//Root of app that starts the call.
app.post("/", (req, res) => {
  var twiml = new twilio.twiml.VoiceResponse();

  function say(text) {
    twiml.say({ voice: "Polly.Amy" }, text);
  }

  // respond with the current TwiML content
  function respond() {
    res.type("text/xml");
    res.send(twiml.toString());
  }

  say("Hi, I'm a parrot. I say back to you what you say to me.");

  twiml.gather({
    input: "speech",
    action: "/continue",
    timeout: 2,
  });

  respond();
});

app.post("/continue", (req, res) => {
  var twiml = new twilio.twiml.VoiceResponse();
  const userInput = req.body.SpeechResult;

  function say(text) {
    twiml.say({ voice: "Polly.Amy" }, text);
  }

  // respond with the current TwiML content
  function respond() {
    res.type("text/xml");
    res.send(twiml.toString());
  }

  say(userInput);
  twiml.gather({
    input: "speech",
    action: "/continue",
    timeout: 2,
  });
  respond();
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
