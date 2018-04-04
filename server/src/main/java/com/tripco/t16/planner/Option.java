package com.tripco.t16.planner;

import com.tripco.t16.calc.DistanceCalculator;

/**
 * Describes the options to apply when planning a trip in TFFI format.
 */
public class Option {

  public String distance;
  public String userUnit;
  public String userRadius;
  public String optimization;
  public String map;

  /**
   * Returns the name of the unit.
   * @return
   */
  public String getUnitName() {
    return getUnit().name;
  }

  /**
   * Gets the radius of the earth in whatever units of measurement we are using. Currently only
   * supports kilometers and miles.
   *
   * @return - The radius of the earth in some unit of measurement.
   */
  public double getUnitRadius() {
    return getUnit().radius;
  }

  private Unit getUnit() {
    if (distance == null) {
      return Unit.miles;
    }

    //Handle user defined case
    if (distance.equals("user defined") && userUnit != null
        && userRadius != null) {
      return new Unit(userUnit, Float.valueOf(userRadius));
    } else if (distance != null) {
        for (Unit unit : Unit.defaultUnits) {
          if (distance.equals(unit.name)) {
            return unit;
          }
        }
    }

    return Unit.miles;
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

    return Float.valueOf(optimization);
  }
}
