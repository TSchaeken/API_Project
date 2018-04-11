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

var maxId = 0;

var Phoenix = {
  name: "Phoenix",
  sickCount: 0,
  totalCount: 0,
  arr: [],
  lon: "",
  lat: ""
};

var Scottsdale = {
  name: "Scottsdale",
  sickCount: 0,
  totalCount: 0,
  arr: [],
  lon: "",
  lat: ""
};



app.use(cors());

app.get("/app/:geo/", function(req, res) {
  var resArr = [Phoenix, Scottsdale]
  res.send(resArr);
});


function Tweeter(lon, lat, i, object) {
  var currObj = object;
  currObj.lon = lon;
  currObj.lat = lat;
  if (i === 10) {
    console.log(currObj);
    return 0;
  } else {
    client.get(
      "search/tweets",
      {
        geocode: lon + ","+ lat + ",5mi",
        count: 10,
        max_id: maxId
      },
      function(error, tweets, response) {

        var tweet = tweets.statuses;

        if (tweet.length != undefined){

            for (var j = 0; j < tweet.length; j++) {
              if (tweet[j].text.indexOf("sick") > -1) {
                currObj.sickCount++;
                currObj.totalCount++;
                currObj.arr.push(tweet[j].text);
              }
              else {
                currObj.totalCount++;
              }
            }
          }

      else{
        return
      }

        var next_id = tweet[tweet.length - 1].id_str;

        maxId = next_id;

        Tweeter(lon, lat, i + 1, currObj);
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

Tweeter("33.4483800","-112.07404010", 0, Phoenix);

Tweeter("33.501324","-111.925278", 0, Scottsdale);

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
