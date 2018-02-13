package com.tripco.t16.calc;

/**
 * Distance Calculator.
 *
 * @author Samuel Kaessner
 */
public class DistanceCalculator {

    /**
     * Takes two lat-lon pairs, and returns the great circle distance between the two,
     * using the chord length formula. If the boolean useKilometers parameter is set to true,
     * then the function returns the distance in kilometers; otherwise, returns distance in miles.
     *
     * @param lat1
     * @param lon1
     * @param lat2
     * @param lon2
     * @param useKilometers
     * @return
     */
    public static double calculateGreatCircleDistance(double lat1, double lon1,
                                                    double lat2, double lon2,
                                                    boolean useKilometers) {
        //Values for radius
        double radiusMiles = 3958.7613;
        double radiusKilometers = 6371.0088;


        //Convert to radians
        lat1 = Math.toRadians(lat1);
        lon1 = Math.toRadians(lon1);
        lat2 = Math.toRadians(lat2);
        lon2 = Math.toRadians(lon2);


        //We use the chord-length formula to figure out the distance between two points.
        double deltaX = Math.cos(lat2) * Math.cos(lon2) - Math.cos(lat1) * Math.cos(lon1);
        double deltaY = Math.cos(lat2) * Math.sin(lon2) - Math.cos(lat1) * Math.sin(lon1);
        double deltaZ = Math.sin(lat2) - Math.sin(lat1);

        double C = Math.sqrt(deltaX * deltaX + deltaY * deltaY + deltaZ * deltaZ);

        double centralAngle = 2.0 * Math.asin(C / 2.0);


        //Use the correct radius (KM or MI)
        double circleDistance = (useKilometers == true ? radiusKilometers : radiusMiles) * centralAngle;


        return circleDistance;
    }
}