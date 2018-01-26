/**
 * distanceCalculator.js 
 * Contains functions to calculate the distance between two points on the earth.
 * 
 * @author Samuel Kaessner
 */


/**
 * Takes a argument in degrees and converts it to radians.
 */
function toRadians(degrees) {
	return degrees * Math.PI / 180.0;
}

/**
 * Takes two lat-lon pairs, and returns the great circle distance between the two,
 * using the chord length formula. If the boolean useKilometers parameter is set to true,
 * then the function returns the distance in kilometers; otherwise, returns distance in miles.
 */
function calculateGreatCircleDistance(lat1, lon1, lat2, lon2, useKilometers) {
	//Values for radius
	var radiusMiles = 3958.7613;
  var radiusKilometers = 6371.0088;


	//Convert to radians
  lat1 = toRadians(lat1);
  lon1 = toRadians(lon1);
  lat2 = toRadians(lat2);
  lon2 = toRadians(lon2);


	//We use the chord-length formula to figure out the distance between two points.
	var deltaX = Math.cos(lat2) * Math.cos(lon2) - Math.cos(lat1) * Math.cos(lon1);
  var deltaY = Math.cos(lat2) * Math.sin(lon2) - Math.cos(lat1) * Math.sin(lon1);
	var deltaZ = Math.sin(lat2) - Math.sin(lat1);
  
  var C = Math.sqrt(deltaX * deltaX + deltaY * deltaY + deltaZ * deltaZ);
  
  var centralAngle = 2.0 * Math.asin(C / 2.0);
  
  
  //Use the correct radius (KM or MI)
  var circleDistance = (useKilometers == true ? radiusKilometers : radiusMiles) * centralAngle;
  
  return circleDistance;
}
