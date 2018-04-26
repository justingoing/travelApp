package com.tripco.t16.tffi;

import com.google.gson.Gson;
import com.tripco.t16.calc.Optimization;
import com.tripco.t16.planner.Map;
import com.tripco.t16.planner.Unit;
import java.util.ArrayList;

public class Config {

  public String type;
  public int version;
  public ArrayList<Filter> filters;
  public ArrayList<String> maps;
  public int optimization;
  public ArrayList<Optimization> optimizations;
  public ArrayList<String> units;

  /**
   * Creates a default config object.
   */
  public Config() {
    type = "config";
    version = TFFI.VERSION;
    filters = Filter.getFilters();
    maps = Map.getMaps();

    ArrayList<Optimization> optimizations = Optimization.getOptimizations();
    optimization = optimizations.size();
    this.optimizations = optimizations;

    units = Unit.getUnits();
  }

  /**
   * Returns a String containing a JSON representation of this config object.
   *
   * @return - String representation of a default config object.
   */
  public static String getConfig() {
    Gson gson = new Gson();
    return gson.toJson(new Config());
  }
}
