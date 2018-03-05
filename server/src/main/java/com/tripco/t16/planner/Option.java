package com.tripco.t16.planner;

import com.tripco.t16.calc.DistanceCalculator;

/**
 * Describes the options to apply when planning a trip in TFFI format.
 */
public class Option {

  public String distance;
  public String optimization;

  /**
   * Gets the radius of the earth in whatever units of measurement we are using. Currently only
   * supports kilometers and miles.
   *
   * @return - The radius of the earth in some unit of measurement.
   */
  public double getRadius() {
    return (distance != null && distance.equalsIgnoreCase("kilometers")) ?
        DistanceCalculator.EARTH_RADIUS_KM : DistanceCalculator.EARTH_RADIUS_MI;
  }

  /**
   * Returns the optimization level the TFFI file requested.
   *
   * Range of optimization values: [0, 1], where 0 - No optimization, 1 - Highest level of
   * optimization
   */
  public float getOptimizationLevel() {
    // Check if we even have this flag
    if (optimization == null) {
      return 0;
    }

    // Otherwise try to convert to a float
    try {
      return Float.valueOf(optimization.trim());
    } catch (NumberFormatException e) {
      e.printStackTrace();
    }

    return 0;
  }
}
