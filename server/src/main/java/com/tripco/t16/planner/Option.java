package com.tripco.t16.planner;

import com.tripco.t16.calc.DistanceCalculator;

/**
 * Describes the options to apply when planning a trip in TFFI format.
 * At this point we are only using the values provided.
 */
public class Option {

  public String distance;
  public String optimization;

  /**
   * Gets the radius of the earth in whatever units of measurement we are using.
   * Currently only supports kilometers and miles.
   *
   * @return - The radius of the earth in some unit of measurement.
   */
  public double getRadius() {
    return distance.equalsIgnoreCase("kilometers") ?
            DistanceCalculator.EARTH_RADIUS_KM : DistanceCalculator.EARTH_RADIUS_MI;
  }

  /**
   * Gets the number of optimization levels that we support.
   * Will be greater or equal to zero; currently set to return 1.
   *
   * @return - The number of optimization levels the server supports.
   */
  public static int getNumOptimizationLevels() {
    return 1;
  }
}