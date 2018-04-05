package com.tripco.t16.query;

import com.tripco.t16.planner.Place;
import com.tripco.t16.tffi.Filter;
import java.util.ArrayList;

public class Query {

  public int version;
  public String type;
  public String query;
  public ArrayList<Filter> filters;
  public ArrayList<Place> places;

  public Query() {

  }
}
