"use strict";

var zipcode;
var weatherURL;
var requestObj = null;

/*
 * Gets the zipcode entered by the user and requests to the proxy server for weather information for that zipcode
 */
function getWeather() 
{
  // get zipcode and make URL
  zipcode = document.getElementById("zipCode").value;
  weatherURL = "http://web.stanford.edu/~psyoung/cgi-bin/a3.php?yws_path=" + encodeURIComponent("p=" + zipcode);

  // use AJAX to make a request for weather data using our URL
  requestObj = new XMLHttpRequest();  
  requestObj.addEventListener("load", processWeatherData, null);
  requestObj.open('GET', weatherURL, true);
  requestObj.send(null);
}

/*
 * Callback that processes weather data received from Yahoo on our proxy server
 */ 
function processWeatherData()
{  
  // get information about city
  var location = requestObj.responseXML.getElementsByTagName("location");

  if(location.length === 0)
    location = requestObj.responseXML.getElementsByTagName("yweather:location");

  var city = location[0].attributes[0].value;

  // get information about temperature and condition
  var condition = requestObj.responseXML.getElementsByTagName("condition");

  if(condition.length === 0)
    condition = requestObj.responseXML.getElementsByTagName("yweather:condition");

  var temp = condition[0].attributes[2].value;
  var text = condition[0].attributes[0].value;

  // put values into textarea
  document.getElementById("results").value += city  + ": " + temp + ", " + text + "\n";
}

/*
 * Clears the weather info and zipcode request
 */ 
function clearData() 
{ 
  document.getElementById("zipCode").value = "";
  document.getElementById("results").value = "";
}
