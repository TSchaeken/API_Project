var Twitter = require("twitter");
var Firebase = require("firebase");
var cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 8080;

var client = new Twitter({
  consumer_key: "KwHRJL5obnWqFQSKoRdYgMLhI",
  consumer_secret: "LofNjTBVqGVyidacNB3W50wjLl3QnUuM1AJA8whO4dGP7Ch5aX",
  access_token_key: "981630859693273088-tshv2skyKXPCJwAdKKrSSJ3IzzECnWH",
  access_token_secret: "3wqwYIh68R1FtOebUEjr7RcoKQNnmY4L2FYDiXGLqYG1E"
});

var store = [];
var maxId = 0;

var sick = {
  sickCount: 0,
  totalCount: 0,
  arr: [""]
};

app.use(cors());

app.get("/app/:geo/", function(req, res) {
  res.send(sick);
});

// function sickSearch() {
//   store.forEach(function(element) {
//     if (element.indexOf("sick") > -1) {
//       sick.totalCount++;
//       sick.sickCount++;
//       sick.arr.push(element);
//     }
//   });
// }

function Tweeter(geo, i) {
  if (i === 100) {
    console.log(sick);
    return 0;
  } else {
    client.get(
      "search/tweets",
      {
        geocode: geo,
        count: 100,
        max_id: maxId
      },
      function(error, tweets, response) {
        var tweet = tweets.statuses;

        for (var j = 0; j < tweet.length; j++) {
          if (tweet[j].text.indexOf("sick") > -1) {
            sick.sickCount++;
            sick.totalCount++;
            sick.arr.push(tweet[j].text);
          }
          else {
              sick.totalCount++;
          }
        }

        var next_id = tweet[tweet.length - 1].id_str;

        maxId = next_id;

        Tweeter(geo, i + 1);
      }
    );
  }
}

function setMax() {
  client.get(
    "search/tweets",
    {
      q: "hey",
      count: 1
    },
    function(error, tweets, response) {
      var tweet = tweets.statuses;

      var next_id = tweet[tweet.length - 1].id_str;

      maxId = next_id;
    }
  );
}

setMax();
Tweeter("33.4483800,-112.07404010,20mi", 0);

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});

// function Tweeter ( n ) {
//     console.log( "Entering recursive function for [", n, "]." );
//     // Once we hit zero, bail out of the recursion. The key to recursion is that
//     // it stops at some point, and the callstack can be "rolled" back up.
//     if ( n === 0 ) {
//         return( 0 );
//     }
//     // Start a NEW PROMISE CHAIN that will become the continuation of the parent
//     // promise chain. This new promise chain now becomes a completely tangential
//     // branch to the parent promise chain.
//     var tangentialPromiseBranch = Promise.resolve().then(
//         function() {
//             return( Tweeter( n - 1 ) ); // RECURSE!
//         }
//     );
//     return( tangentialPromiseBranch );
// }
