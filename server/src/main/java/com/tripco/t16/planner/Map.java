package com.tripco.t16.planner;

import java.util.ArrayList;

/**
 * Object that handles the manipulation of the maps.
 */
public class Map {

  private static final String SVG_TAG = "svg";

  /**
   * Returns a list of map formats the server supports. Used for the configuration object.
   *
   * @return - Arraylist of supported map types.
   */
  public static ArrayList<String> getMaps() {
    ArrayList<String> mapsList = new ArrayList<>();
    mapsList.add(SVG_TAG);
    return mapsList;
  }
}