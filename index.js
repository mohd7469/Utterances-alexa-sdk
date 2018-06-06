const Alexa = require("alexa-sdk");

function pluck (arr) {
  const randIndex = Math.floor(Math.random() * arr.length);
  return arr[randIndex];
}
const WellRestedPhrases = {
  tooMuch: [
    "I think you may sleep too much and swing back to tired.",
    "Whoa, that's a lot of sleep. You'll wake up rested for sure."
  ],
  justRight: [
    "You should wake up refreshed.",
    "Rest is important and you're getting enough.",
    "With that much sleep, you're ready to face the world.",
    "You'll wake up invigorated."
  ],
  justUnder: [
    "You may get by, but watch out for a mid-day crash.",
    "You'll be alright, but would be better off with a bit more time.",
    "You might be a little tired tomorrow."
  ],
  tooLittle: [
    "You'll be dragging tomorrow. Get the coffee ready!",
    "Long night or early morning? Either way, tomorrow's going to be rough."
  ]
};
const handlers = {
  WellRestedIntent () {
    const slotValue = this.event.request.intent.slots.NumberOfHours.value;
    const numOfHours = parseInt(slotValue);
    if(Number.isInteger(numOfHours)) {
      let speech;
      if(numOfHours > 12) {
        speech = pluck(WellRestedPhrases.tooMuch);
      } else if(numOfHours > 8) {
        speech = pluck(WellRestedPhrases.justRight);
      } else if(numOfHours > 6) {
        speech = pluck(WellRestedPhrases.justUnder);
      } else {
        speech = pluck(WellRestedPhrases.tooLittle);
      }
      this.emit(':tell', speech);
    } else {
      console.log(`Slot value: ${slotValue}`);
      const prompt = "I'm sorry, I heard something that doesn't seem like" +
        " a number. How many hours of sleep do you want?";
      const reprompt = 'Tell me how many hours you plan to sleep.';
      this.emit(':ask', prompt, reprompt);
    }
  },
  SleepQualityIntent () {
    const quality = this.event.request.intent.slots.PreviousNightQuality.value;
    const good = ["good", "well", "wonderfully", "a lot", "amazing",
      "fantastic", "o.k.", "great"];
    const bad = ["bad", "poorly", "little", "very little", "not at all"];
    let speech;
    if(good.includes(quality)) {
      speech = "Let's keep the great sleep going!";
    } else if(bad.includes(quality)) {
      speech = "I hope tonight's better for you.";
    } else {
      speech = "I've got a good feeling about your sleep tonight.";
    }
    this.emit(":tell", speech);
  }
};

exports.handler = function(event, context, callback) {
  const alexa = Alexa.handler(event, context, callback);
  alexa.appId = "arn:aws:lambda:us-east-1:557208736424:function:sleep_tracker";
  alexa.registerHandlers(handlers);
  alexa.execute();
};
