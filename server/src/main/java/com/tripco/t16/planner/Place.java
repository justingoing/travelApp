package com.tripco.t16.planner;

import java.util.HashMap;
import java.util.Map;

/**
 * Describes the places to visit in a trip in TFFI format.
 * There may be other attributes of a place, but these are required to plan a trip.
 */
public class Place {
  public String id;
  public String name;
  public String latitude;
  public String longitude;

  // Keep track of extra stuff like municipality, wiki link, etc...
  public Map<String, String> extraAttrs;

  public Place()
  {
    this.extraAttrs = new HashMap<String, String>();
  }


}
