package com.tripco.t16.tffi;

import java.util.ArrayList;

/**
 * Filter class that represents a filter we support, and also has methods to return all filters the
 * server supports.
 */
public class Filter {

  public String attribute;
  public ArrayList<String> values;

  /**
   * Returns a list of filters that we support.
   *
   * @return - ArrayList of filters we support.
   */
  public static ArrayList<Filter> getFilters() {
    ArrayList<Filter> filters = new ArrayList<>();

    //testing Find.java...
    ArrayList<String> vals = new ArrayList<>();
    vals.add("large_airport");
    vals.add("heliport");
    String att = "airports.type";
    Filter f = new Filter();
    f.attribute = att;
    f.values = vals;
    filters.add(f);

    return filters;
  }
}
