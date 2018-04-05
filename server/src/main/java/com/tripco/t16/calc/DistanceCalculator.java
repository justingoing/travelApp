package com.tripco.t16.calc;

/**
 * Calculates distances between two points on the globe.
 *
 * @author Samuel Kaessner
 */
public class DistanceCalculator {

  public static final double COLORADO_RIGHT = -102.05;
  public static final double COLORADO_LEFT = -109.05;
  public static final double COLORADO_TOP = 41.0;
  public static final double COLORADO_BOTTOM = 37.0;
  public static final double WORLD_RIGHT = 180;
  public static final double WORLD_LEFT = -180;
  public static final double WORLD_TOP = 90;
  public static final double WORLD_BOTTOM = -90;


  //Values for radius
  public static final double EARTH_RADIUS_MI = 3958.7613;
  public static final double EARTH_RADIUS_KM = 6371.0088;

  /**
   * Returns true if the given lat/lon pair is within the state of colorado.
   *
   * @param latitude - The longitude to check
   * @param longitude - The latitude to check
   * @return - True if the position is in Colorado, false otherwise.
   */
  public static boolean isInColorado(double latitude, double longitude) {
    return (latitude <= COLORADO_TOP && latitude >= COLORADO_BOTTOM
        && longitude <= COLORADO_RIGHT && longitude >= COLORADO_LEFT);
  }

  /**
   * Takes two lat-lon pairs, and returns the great circle distance between the two, using the chord
   * length formula. If the boolean useKilometers parameter is set to true, then the function
   * returns the distance in kilometers; otherwise, returns distance in miles. Returns the rounded
   * distance.
   *
   * @param lat1 - Latitude of the first point
   * @param lon1 - Longitude of the first point
   * @param lat2 - Latitude of the second point
   * @param lon2 - Longitude of the second point
   * @param radius - The radius of the earth, in whatever unit we so desire.
   * @return - Rounded distance between points.
   */
  public static int calculateGreatCircleDistance(double lat1, double lon1,
      double lat2, double lon2,
      double radius) {
    //Convert to radians
    lat1 = Math.toRadians(lat1);
    lon1 = Math.toRadians(lon1);
    lat2 = Math.toRadians(lat2);
    lon2 = Math.toRadians(lon2);

    //We use the chord-length formula to figure out the distance between two points.
    double deltaX = Math.cos(lat2) * Math.cos(lon2) - Math.cos(lat1) * Math.cos(lon1);
    double deltaY = Math.cos(lat2) * Math.sin(lon2) - Math.cos(lat1) * Math.sin(lon1);
    double deltaZ = Math.sin(lat2) - Math.sin(lat1);

    double c = Math.sqrt(deltaX * deltaX + deltaY * deltaY + deltaZ * deltaZ);

    double centralAngle = 2.0 * Math.asin(c / 2.0);

    //Use the correct radius
    double circleDistance = radius * centralAngle;
    return (int) Math.round(circleDistance);
  }
}
