package com.tripco.t16.planner;

import java.util.ArrayList;

public class Filter {
  public String attribute;
  public ArrayList<String> values;

  public static ArrayList<Filter> getFilters() {
    ArrayList<Filter> filters = new ArrayList<>();
    return filters;
  }
}
