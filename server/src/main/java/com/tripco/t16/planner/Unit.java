package com.tripco.t16.planner;

import java.util.ArrayList;

public class Unit {
  public String name;

  private Unit(String name) {
    this.name = name;
  }

  public static ArrayList<String> getUnits() {
    ArrayList<String> units = new ArrayList<>();
    units.add("kilometers");
    units.add("miles");
    units.add("nautical miles");
    units.add("user defined");
    return units;
  }
}
