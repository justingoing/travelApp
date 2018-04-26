package com.tripco.t16.planner;

import com.tripco.t16.planner.map.KML;
import com.tripco.t16.planner.map.Point;
import com.tripco.t16.planner.map.SVG;
import com.tripco.t16.tffi.Error;
import java.io.*;
import java.util.ArrayList;
import com.tripco.t16.calc.DistanceCalculator;
import com.tripco.t16.calc.Optimization;


/**
 * The Trip class supports TFFI so it can easily be converted to/from Json by Gson.
 */
public class Trip {

  // The variables in this class should reflect TFFI.
  public String type;
  public String title;
  public Option options;
  public ArrayList<Place> places;
  public ArrayList<Integer> distances;
  public String map;
  public Integer version;

  private ArrayList<Point> coords;

  /**
   * The top level method that does planning. At this point it just adds the map and distances for
   * the places in order. It might need to reorder the places in the future.
   */
  public Error plan() {
    Error err = new Error();
    for (int i = this.places.size() - 1; i >= 0; --i) {
      try {
        if (!this.validateLatLong(this.places.get(i).latitude) ||
            !this.validateLatLong(this.places.get(i).longitude)) {
          this.places.remove(i);
          err.code = "500";
          err.message = "Server failed to validate LatLong";
          err.debug = "Trip.java-plan-validateLatLong.";
          return err;
        }
      } catch (NullPointerException e) {
        this.places.remove(i);
      }
    }

    if (options != null && options.getOptimizationLevel() >= .75) {
      this.places = Optimization.optimize(places, options.getUnitRadius(), 3);
    } else if (options != null && options.getOptimizationLevel() >= .5) {
      this.places = Optimization.optimize(places, options.getUnitRadius(), 2);
    } else if (options != null && options.getOptimizationLevel() >= .25) {
      this.places = Optimization.optimize(places, options.getUnitRadius(), 1);
    }

    this.coords = placesToCoords();
    this.distances = legDistances();
    if (options != null && options.map != null && options.map.equals("kml")) {
      this.map = KML.getWorldKML(this.places, this.coords);
    } else {
      this.map = SVG.getWorldSVG(this.coords);
    }
    return err;
  }

  /**
   * Get the normalized latitude Note: It is inverted so that it matches SVG convention of top left
   * being (0,0)
   *
   * @param lat Latitude to be normalized
   * @return Normalized latitude
   */
  public static double normalizeLat(double lat) {
    return (lat - DistanceCalculator.WORLD_TOP) / (DistanceCalculator.WORLD_BOTTOM
        - DistanceCalculator.WORLD_TOP);
  }

  /**
   * Get the normalized longitude
   *
   * @param lon Longitude to be normalized
   * @return Normalized longitude
   */
  public static double normalizeLong(double lon) {
    return (lon - DistanceCalculator.WORLD_LEFT) / (DistanceCalculator.WORLD_RIGHT
        - DistanceCalculator.WORLD_LEFT);
  }

  /**
   * Returns the distances between consecutive places, including the return to the starting point to
   * make a round trip.
   */
  private ArrayList<Integer> legDistances() {
    //Create empty list of distances and get an arraylist of coords.
    ArrayList<Integer> dist = new ArrayList<>();

    //And then calculate the distances.
    for (int i = 1; i <= coords.size(); i++) {
      Point p1 = this.coords.get(i - 1);
      Point p2 = this.coords.get(i % coords.size());

      dist.add(DistanceCalculator
          .calculateGreatCircleDistance(p1.x, p1.y, p2.x, p2.y,
              (options != null ? options.getUnitRadius() : Unit.miles.radius)));
    }

    return dist;
  }

  /**
   * Returns an arraylist containing a list of coordinates in the same order as the places
   * arraylist. In each coord, X is the latitude, Y is the longitude.
   */
  private ArrayList<Point> placesToCoords() {
    ArrayList<Point> coords = new ArrayList<>();
    for (Place p : places) {
      double latTemp = convertToDecimal(p.latitude);
      double longTemp = convertToDecimal(p.longitude);

      p.latitude = Double.toString(latTemp);
      p.longitude = Double.toString(longTemp);
      coords.add(new Point(latTemp, longTemp));
    }

    return coords;
  }

  /**
   * Is the lat/long string valid?
   *
   * @param latIN longitude/latitude to be validated
   * @return boolean true = valid
   */
  public boolean validateLatLong(String latIN) {
    if (latIN.matches("\\s*\\d+[°|º]\\s*\\d+['|′]\\s*\\d+\\.?\\d*[\"|″]?\\s*[N|S|E|W]\\s*")) //DMS
    {
      return true;
    } else if (latIN
        .matches("\\s*\\d+[°|º]\\s*\\d+\\.?\\d*['|′]\\s*[N|S|E|W]\\s*")) //degrees decimal minutes
    {
      return true;
    } else if (latIN.matches("\\s*-?\\d+\\.?\\d*[°|º]\\s*[N|S|E|W]\\s*")) //decimal degrees
    {
      return true;
    } else if (latIN.matches("\\s*-?\\d+\\.?\\d*\\s*[N|S|E|W]\\s*")) //floating point
    {
      return true;
    } else if (latIN.matches("\\s*-?\\d+\\.?\\d*\\s*")) {
      return true;
    } else {
      return false;
      //ERROR OUT??
    }
  }

  /**
   * Conver the lat/long string to a decimal value for distance calculating
   *
   * @param conv string to be changed
   * @return double (value that has been converted)
   */
  public static double convertToDecimal(String conv) {

    double seconds = 0;
    double minutes = 0;
    double degrees = 0;
    double direction = 1;

    if (conv.contains("W") || conv.contains("S")) {
      direction = -1;
    }

    int degreeSymbol = 0;
    int minuteSymbol = 0;
    int secondSymbol = 0;

    boolean foundMinute = false;
    boolean foundSecond = false;

    for (int i = 0; i < conv.length(); i++) {
      char current = conv.charAt(i);

      if (current == '\'' || current == '′') {
        minuteSymbol = i;
        foundMinute = true;
      }

      if (current == '\"' || current == '″') {
        secondSymbol = i;
        foundSecond = true;
      }

      if (current == '°' || current == 'º') {
        degreeSymbol = i;
      }
    }

    if (foundSecond) {
      if (conv.charAt(minuteSymbol + 1) == ' ') {
        seconds = Double.parseDouble(conv.substring(minuteSymbol + 2, secondSymbol));
      } else {
        seconds = Double.parseDouble(conv.substring(minuteSymbol + 1, secondSymbol));
      }
      seconds /= 3600; //convert seconds to degrees
    }
    if (foundMinute) {
      if (conv.charAt(degreeSymbol + 1) == ' ') {
        minutes = Double.parseDouble(conv.substring(degreeSymbol + 2, minuteSymbol));
      } else {
        minutes = Double.parseDouble(conv.substring(degreeSymbol + 1, minuteSymbol));
      }

      minutes /= 60; //convert minutes to degrees
    }

    if (foundMinute == true && foundSecond == true) { //input has both minutes and seconds
      degrees = Double.parseDouble(conv.substring(0, degreeSymbol));
      degrees += (minutes + seconds);
    } else if (foundMinute == true) { //input has minutes
      degrees = Double.parseDouble(conv.substring(0, degreeSymbol));
      degrees += minutes;
    } else if (degreeSymbol != 0) { //just degrees with symbol and direction
      degrees = Double.parseDouble(conv.substring(0, degreeSymbol));
    } else { //just number
      degrees = Double.parseDouble(conv);
    }

    return degrees * direction;
  }
}