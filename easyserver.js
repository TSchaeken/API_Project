/*
The goal of this node app was to interface with the twitter API in order to collect large amounts of tweets and scan them for the word "sick."

Future iterations of this project will involve more in-depth parsing of tweet content, as well as a contextual analysis. I have also considered
adding in firebase support and getting rid of "get" requests all together. To accomplish this, I would interface this node app with firebase and generate
unique data stores in firebase over a larger period of time to remain within my limit (480 requests/15 min).

*/

var Twitter = require("twitter");
var Firebase = require("firebase");
var cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 8080;

//initialize all the node packages required

var client = new Twitter({
  consumer_key: "KwHRJL5obnWqFQSKoRdYgMLhI",
  consumer_secret: "LofNjTBVqGVyidacNB3W50wjLl3QnUuM1AJA8whO4dGP7Ch5aX",
  access_token_key: "981630859693273088-tshv2skyKXPCJwAdKKrSSJ3IzzECnWH",
  access_token_secret: "3wqwYIh68R1FtOebUEjr7RcoKQNnmY4L2FYDiXGLqYG1E"
});

//initialize the Twitter package API handler
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

var Glendale = {
  name: "Glendale",
  sickCount: 0,
  totalCount: 0,
  arr: [],
  lon: "",
  lat: ""
};

var Mesa = {
  name: "Mesa",
  sickCount: 0,
  totalCount: 0,
  arr: [],
  lon: "",
  lat: ""
};

//placeholder for 4 dynamic locations, I picked locations around phoenix for display purposes and because I realized it was better to get a product out than be ambitious but fail
//to deliver.

app.use(cors());

//CORS saved us from cross-origin requests made from HTTP services to HTTPS

app.get("/", function(req, res) {
  var resArr = [Phoenix, Scottsdale, Mesa, Glendale]
  res.send(resArr);
});

//the GET response for our REST API, and in this case, the only way to get a response. It concluded with sending a hard-coded array due to similar constraints as the previous comments. 

function Tweeter(lon, lat, i, object) {
  var currObj = object;
  currObj.lon = lon;
  currObj.lat = lat;

//I will break the Tweeter into large related chunks. 
//The above instantiates the tweeter function on the object paramaterized by the "Object" parameter. In the future, this would be a constructor-esque model, but we wanted to have something to show, so hard coded again.
//Tweeter as a whole collects "count" tweets "i" times, or, 100 tweets 20 times for a total of 2000 tweets to work with. Limited by API.
  if (i === 10) {
    console.log(currObj);
    return;
  } 

  //This is the "break" for our recursive function in order to not get stuck.


  else {
    client.get(
      "search/tweets",
      {
        geocode: lon + ","+ lat + ",5mi",
        count: 10,
        max_id: maxId
      },

      //Set "GET" parameters for Twitter API

      function(error, tweets, response) {

        var tweet = tweets.statuses;

        //reduce length of referenced code

        if (tweet.length != undefined){

          //checks the tweet objects length, will return undefined if paginated to result end.

            for (var j = 0; j < tweet.length; j++) {
              if (tweet[j].text.indexOf("sick") > -1) {
                currObj.sickCount++;
                currObj.totalCount++;
                currObj.arr.push(tweet[j].text);
              }

              //increments both sick count and total count for a comparison. pushes the tweet containing "sick" in to a stored array to be referenced later if necessary.

              else {
                currObj.totalCount++;
              }
            }
          }

      else{
        console.log('breaking')
        return
      }

        var next_id = tweet[tweet.length - 1].id_str;

        maxId = next_id;

        Tweeter(lon, lat, i + 1, currObj);

        //recall function with new MaxId, which allows us to paginate through results. Otherwise would just get the same 100 tweets over and over again.
        //recursion solves the asynchronous problems that come from requiring a result from an async operation in order to call another one, in this case GET to GET
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

// setMax sets an initial maxId and does nothing else.

function startServer(){

setMax();

Tweeter("33.4483800","-112.07404010", 0, Phoenix);

Tweeter("33.501324","-111.925278", 0, Scottsdale);

Tweeter("33.4483800","-112.07404010", 0, Glendale);

Tweeter("33.501324","-111.925278", 0, Mesa);

}

// hard coded parameterized Tweeter calls, used to essentially get 4x2000 tweets for project showcase purposes. Again, would prefer to have some kind of database intergration and long
// term collection strategy here, but was unable to implement in time.


app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});

// calls express to actively monitor the set PORT, required for GET response


startServer();