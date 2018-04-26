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

  public static final ArrayList<Filter> filters;

  static {
    //testing Find.java...
    ArrayList<String> vals = new ArrayList<>();
    vals.add("heliport");
    vals.add("small_airport");
    vals.add("seaplane_base");
    vals.add("closed");
    vals.add("balloonport");
    vals.add("medium_airport");
    vals.add("large_airport");

    String att = "airports.type";

    ArrayList<String> continents = new ArrayList<>();
    continents.add("Africa");
    continents.add("Antartica");
    continents.add("Asia");
    continents.add("Europe");
    continents.add("North America");
    continents.add("Oceania");
    continents.add("South America");
    String cont = "airports.continent";

    ArrayList<Filter> tmp = new ArrayList<>();
    tmp.add(new Filter(att, vals));
    tmp.add(new Filter(cont, continents));

    filters = tmp;

  }

  /**
   * Returns a list of filters that we support.
   *
   * @return - ArrayList of filters we support.
   */
  public static ArrayList<Filter> getFilters() {
    return filters;
  }


}
