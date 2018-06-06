const fs = require('fs');
const utterances = require('alexa-utterances');
const wrDictionary = {
  quality: ['well rested', 'refreshed', 'invigorated', 'tired', 'weary'],
  verbPhrasing: ['I will be', 'will I be'],
  conditional: ['if I get', 'if I were to get', 'assuming I got', 'for'],
  sleepNoun: ['sleep', 'slumber', 'rest', 'siesta']
};
const wrTemplate = 'WellRestedIntent how {quality} {verbPhrasing} {conditional} {-|NumberOfHours} hours of {sleepNoun}';
const sqDictionary = {
  timePeriod: ['last night', 'the previous night', 'yesterday', 'recently'],
  verbPhrasing: ['I slept', 'I had', 'I got'],
  sleepPhrase: ['sleep', 'rest']
};
const sqTemplate = 'SleepQualityIntent {timePeriod} {verbPhrasing} {-|PreviousNightQuality} {sleepPhrase|}';
const sqInvertedTemplate = 'SleepQualityIntent {verbPhrasing} {-|PreviousNightQuality} {sleepPhrase|} {timePeriod|}';
const sampleUtterances = [
  utterances(wrTemplate, {}, wrDictionary).join('\n'),
  utterances(sqTemplate, {}, sqDictionary).join('\n'),
  utterances(sqInvertedTemplate, {}, sqDictionary).join('\n')
].join('\n');
fs.writeFile('./speechAssets/SampleUtterances.txt', sampleUtterances,
  err => {
    if(err) {
      throw err;
    }
  console.log('SampleUtterances.txt written');
});