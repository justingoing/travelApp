package com.tripco.t16.planner;

import com.google.gson.Gson;
import com.tripco.t16.calc.Optimization;
import java.util.ArrayList;

public class Config {
  public final String type = "config";
  public final int version = 3;
  public ArrayList<Filter> filters = Filter.getFilters();
  public ArrayList<String> maps = Map.getMaps();
  public int optimization = 2;
  public ArrayList<Optimization> optimizations = Optimization.getOptimizations();
  public ArrayList<String> units = Unit.getUnits();

  public static String getConfig() {
    Gson gson = new Gson();
    return gson.toJson(new Config());
  }
}
