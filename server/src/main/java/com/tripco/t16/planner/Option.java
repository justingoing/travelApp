package com.tripco.t16.planner;


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

  /**
   * Gets the unit of measurement that we are using, based on the information currently in this
   * Option object.
   *
   * @return - Current unit of measurement.
   */
  private Unit getUnit() {
    if (distance == null) {
      return Unit.miles;
    }

    //Handle user defined case
    if (distance.equals("user defined") && userUnit != null
        && userRadius != null) {
      return new Unit(userUnit, Float.valueOf(userRadius));
    } else { //See if we have that unit pre-defined
      for (Unit unit : Unit.defaultUnits) {
        if (distance.equals(unit.name)) {
          return unit;
        }
      }
    }

    //Otherwise, just return miles.
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
