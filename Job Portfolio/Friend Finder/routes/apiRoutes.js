var friends = require("../friends.js");

module.exports = function (app) {


  app.get("/api/friends", function (req, res) {
    res.json(friends);
  });

  app.post("/api/friends", function (req, res) {
    var newFriend = {
      name: req.body.name,
      photo: req.body.photo,
      answer: []
    };

    var answerArray = [];
    for (var i = 0; i < req.body.answer.length; i++) {
      answerArray.push(parseInt(req.body.answer[i]))
    }

    newFriend.answer = answerArray;

    var answerComparisionArray = [];
    for (var i = 0; i < friends.length; i++) {
      var currentComparison = 0;
      for (var j = 0; j < newFriend.answer.length; j++) {
        currentComparison += Math.abs(newFriend.answer[j] - friends[i].answer[j]);
      }

      answerComparisionArray.push(currentComparison);
    }

    var bestMatchPosition = 0; 
    for (var i = 1; i < answerComparisionArray.length; i++) {
      if (answerComparisionArray[i] <= answerComparisionArray[bestMatchPosition]) {
        bestMatchPosition = i;
      }

    }
    var bestFriendMatch = friends[bestMatchPosition];
    
    res.json(bestFriendMatch);

    friends.push(newFriend);
  });
}