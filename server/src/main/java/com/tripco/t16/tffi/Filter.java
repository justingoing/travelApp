package com.tripco.t16.tffi;

import java.util.ArrayList;

/**
 * Filter class that represents a filter we support, and also has methods to return all filters the
 * server supports.
 */
public class Filter {

  public String attribute;
  public ArrayList<String> values;

  public Filter(String attribute, ArrayList<String> values) {
    this.attribute = attribute;
    this.values = values;
  }

  /**
   * Returns a list of filters that we support.
   *
   * @return - ArrayList of filters we support.
   */
  public static ArrayList<Filter> getFilters() {
    return filters;
  }

  public static final ArrayList<Filter> filters;

  static {
    ArrayList<Filter> tmp = new ArrayList<>();

    //testing Find.java...
    ArrayList<String> vals = new ArrayList<>();
    vals.add("large_airport");
    vals.add("medium_airport");
    vals.add("heliport");
    String att = "airports.type";
    tmp.add(new Filter(att, vals));

    filters = new ArrayList<>();
  }
}
