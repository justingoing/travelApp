/**
 * validator.js 
 * Validate input from the user and pass it to the distance calculator
 * 
 * @author Isaac Gentz
 */


/**
  Makes sure that the user input is valid
*/
function validateLatLong(elem_name)
{
  return document.getElementById(elem_name).checkValidity();
}

/**
  Gets the latidude from an input string
*/
function getLatitude(input)
{
  // we know input is validated so we can search for North or South
  var search = input.search(/[NS]/);
  var latitude = ""
  // coordinate must be in decimal format
	if(search == -1)
  {
  	latitude = input.substring(0, input.search(" "));
  }
  else
  {
  	latitude = input.substring(0,search+1);
  }

  return latitude;
}

/**
  Gets the longitude from an input string
*/
function getLongitude(input)
{
  // we  know input is validated so we know we can go from North/South to the end
  var search = input.search(/[NS]/);

  var longitude = "";
	if(search == -1)
  {
  	longitude = input.substr(input.search(' '));
  }
  else
  {
  	longitude = input.substring(search+1);
  }

  return longitude;
}

function parseCoord(input)
{
	var seconds = 0;
  var minutes = 0;
  var degrees = 0;

  //check for double quotes  40°26'56"N 40°26'56"E format
  if(input.indexOf('\x22') > -1)
  {

    var start = input.indexOf('\x27');
    var end = input.indexOf('\x22');
    // go from the single quote to the double quote
    seconds = parseFloat(input.substring(start+1,end));
    seconds /= 3600; //convert seconds to degrees
  }
  
  // check for single quotes 40° 26.767′ N 79° 58.933′ W or above format
  if(input.indexOf('\x27') > -1)
  {
    start = input.indexOf('°');
    end = input.indexOf('\x27');
    minutes = parseFloat(input.substring(start+1,end));
    minutes /= 60; //convert minutes to degrees

  }

  if(input.indexOf('°') > -1)
  {
    start = 0
    end = input.indexOf('°')
    degrees = parseFloat(input.substring(start, end));
    degrees += (minutes + seconds);
  }
  else
  {
    degrees = parseFloat(input)
  }
  

  return degrees;
}

/**
  Takes a string (could be in various location coordinate formats)
  and returns a decimal value
*/
function toDecimalFormat(lat_in, long_in)
{
  var latitude = parseCoord(lat_in);
  var longitude = parseCoord(long_in);
  
//TODO know what element to display to (or handle this differently depending on UI)
   //now we can do something with these decial values
//   document.getElementById('checker').innerHTML =latitude;
//   document.getElementById('format').innerHTML = longitude;


}

