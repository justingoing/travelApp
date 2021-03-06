package com.tripco.t16.planner;

import java.util.ArrayList;

/**
 * Class that holds information about a given unit of measurement, that can be represented as a TFFI
 * object, and is also useful for calculations on the server.
 */
public class Unit {

  //Defined units
  public static final Unit kilometers = new Unit("kilometers", 6371.0088F);
  public static final Unit miles = new Unit("miles", 3958.7613F);
  public static final Unit nautical_miles = new Unit("nautical miles", 3440.0695F);
  public static final Unit user_defined = new Unit("user defined", -1f);

  //Contains all units that have a valid radius (not user defined).
  public static final ArrayList<Unit> defaultUnits = new ArrayList<>();

  public String name;
  public float radius;

  /**
   * Creates a new unit with the given name and radius.
   *
   * @param name - Name of the unit.
   * @param radius - Radius of the earth in this unit.
   */
  public Unit(String name, float radius) {
    this.name = name;
    this.radius = radius;
  }

  /**
   * Returns a list of units that the server supports.
   *
   * @return - Arraylist containing the names of units that we support.
   */
  public static ArrayList<String> getUnits() {
    ArrayList<String> units = new ArrayList<>();

    //Add all the units that we have predefined radii for
    for (Unit unit : Unit.defaultUnits) {
      units.add(unit.name);
    }

    //Add in user-defined
    units.add(user_defined.name);
    return units;
  }

  static {
    defaultUnits.add(kilometers);
    defaultUnits.add(miles);
    defaultUnits.add(nautical_miles);
  }
}
