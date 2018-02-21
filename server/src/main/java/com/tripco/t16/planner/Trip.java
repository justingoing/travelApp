package com.tripco.t16.planner;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import com.tripco.t16.server.HTTP;
import spark.Request;

import java.io.*;
import java.net.URISyntaxException;
import java.util.ArrayList;

import com.tripco.t16.calc.DistanceCalculator;

/**
 * The Trip class supports TFFI so it can easily be converted to/from Json by Gson.
 *
 */
public class Trip {
  // The variables in this class should reflect TFFI.
  public String type;
  public String title;
  public Option options;
  public ArrayList<Place> places;
  public ArrayList<Integer> distances;
  public String map;

  public final String defaultSVG = "<svg width=\"1920\" height=\"960\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:svg=\"http://www.w3.org/2000/svg\"><!-- Created with SVG-edit - http://svg-edit.googlecode.com/ --> <g> <g id=\"svg_4\"> <svg id=\"svg_1\" height=\"960\" width=\"1920\" xmlns:svg=\"http://www.w3.org/2000/svg\" xmlns=\"http://www.w3.org/2000/svg\"> <g id=\"svg_2\"> <title>Layer 1</title> <rect fill=\"rgb(119, 204, 119)\" stroke=\"black\" x=\"0\" y=\"0\" width=\"1920\" height=\"960\" id=\"svg_3\"/> </g> </svg> </g> <g id=\"svg_9\"> <svg id=\"svg_5\" height=\"480\" width=\"960\" y=\"240\" x=\"480\" xmlns:svg=\"http://www.w3.org/2000/svg\" xmlns=\"http://www.w3.org/2000/svg\"> <g id=\"svg_6\"> <title>Layer 2</title> <polygon points=\"0,0 960,0 960,480 0,480\" stroke-width=\"12\" stroke=\"brown\" fill=\"none\" id=\"svg_8\"/> <polyline points=\"0,0 960,480 480,0 0,480 960,0 480,480 0,0\" fill=\"none\" stroke-width=\"4\" stroke=\"blue\" id=\"svg_7\"/> </g> </svg> </g> </g> </svg>";

  public static final String DEST_RADIUS = "10";
  /** The top level method that does planning.
   * At this point it just adds the map and distances for the places in order.
   * It might need to reorder the places in the future.
   */
  public void plan() {
    double decimalLat = 0;
    double decimalLong = 0;

    for(int i = 0; i < this.places.size(); i++) {
      //System.out.println(this.places.get(i).name);
      validateLatitude(this.places.get(i).latitude);
      validateLongitude(this.places.get(i).longitude);

      decimalLat = convertToDecimal(this.places.get(i).latitude);
      decimalLong = convertToDecimal(this.places.get(i).longitude);
    }

    this.map = svg();
    this.distances = legDistances();

  }

  /**
   * Read in an SVG file and convert to a String to display
   * @param filename File to read
   * @return SVG as a String
   */
  public String getSVGFromFile(String filename)
  {
    InputStream in = this.getClass().getResourceAsStream(filename);
    BufferedReader br;
    br = new BufferedReader(new InputStreamReader(in));

    String read = "", cur;
    try {
      while ((cur = br.readLine()) != null)
        read += cur;
    } catch (IOException e) {
      e.printStackTrace();
      return this.defaultSVG;
    }

    return read;
  }

  /**
   * Loop through each coordinate in the trip and generate a 'leg'
   * for the SVG map, drawing a line b/n consecutive destinations
   *
   * @return A String SVG of trip 'legs' to be sent to the server
   */
  public String getLegsAsSVG()
  {
    // Hardcoded for testing
    ArrayList<Coords> coords = placesToCoords();

    String svg = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"1066.6073\" height=\"783.0824\">";

    for(int i = 0; i < coords.size()-1; ++i)
    {
      Coords cur = this.getMappedCoords(coords.get(i).x, coords.get(i).y);
      Coords nex = this.getMappedCoords(coords.get(i+1).x, coords.get(i+1).y);

      svg += "<line stroke=\"%237FFF00\" y2=\"" + nex.y + "\" x2=\"" + nex.x +
              "\" y1=\"" + cur.y + "\" x1=\"" + cur.x + "\" stroke-width=\"5\" fill=\"none\"/>";

      svg += "<circle cx=\"" + cur.x + "\" cy=\" " + cur.y + " \" r=\"" + Trip.DEST_RADIUS + "\" stroke=\"black\" stroke-width=\"3\" fill=\"red\" />";

      if(i == coords.size()-2)
        svg += "<circle cx=\"" + nex.x + "\" cy=\" " + nex.y + " \" r=\"" + Trip.DEST_RADIUS + "\" stroke=\"black\" stroke-width=\"3\" fill=\"red\" />";
    }

    svg += "</svg>";
    return svg;
  }

  /**
   * Get a lat/long pair as coordinates mapped to our svg
   * (within the Colorado border)
   * @param lat Latitude
   * @param lon Longitude
   * @return Mapped coordinates as a pair
   */
  public Coords getMappedCoords(double lat, double lon)
  {
    double scaleX = 994;
    double scaleY = 749;
    double transX = 38;
    double transY = 35;

    double normalLat = this.normalizeLat(lat);
    double normalLon = this.normalizeLong(lon);

    // swapping lat/long since lat==y and lon==x, so we go from y/x to x/y
    double finalX = scaleX * normalLon + transX;
    double finalY = scaleY * normalLat + transY;

    Coords ret = new Coords(finalX, finalY);
    return ret;
  }

  /**
   * Get the normalized latitude
   * Note: It is inverted so that it matches SVG convention of
   * top left being (0,0)
   * @param lat Latitude to be normalized
   * @return Normalized latitude
   */
  public double normalizeLat(double lat)
  {
    // Note these are inverted so that we can get SVG coords going top-down instead of bottom-up
    return (lat - DistanceCalculator.COLORADO_TOP) / (DistanceCalculator.COLORADO_BOTTOM - DistanceCalculator.COLORADO_TOP);
  }

  /**
   * Get the normalized longitude
   * @param lon Longitude to be normalized
   * @return Normalized longitude
   */
  public double normalizeLong(double lon)
  {
    return (lon - DistanceCalculator.COLORADO_LEFT) / (DistanceCalculator.COLORADO_RIGHT - DistanceCalculator.COLORADO_LEFT);
  }

  /**
   * Returns an SVG containing the background and the legs of the trip.
   * @return
   */
  private String svg() {
    String colorado = this.getSVGFromFile("/colorado.svg");
    String borders = this.getSVGFromFile("/borders.svg");

    String finalSVG =
            "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\"?>" +
            "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"1066.6073\" height=\"783.0824\">\n" +
              colorado + borders + this.getLegsAsSVG() +
            "</svg>";

    return finalSVG;
  }

  /**
   * Returns the distances between consecutive places,
   * including the return to the starting point to make a round trip.
   * @return
   */
  private ArrayList<Integer> legDistances() {

    //Create empty list of distances and get an arraylist of coords.
    ArrayList<Integer> dist = new ArrayList<Integer>();
    ArrayList<Coords> coords = placesToCoords();

    // Add a zero distance at the beginning,
    // coz it's zero miles from somewhere to itself.
    if (coords.size() > 0) {
        dist.add(0);
    }

    //And then calculate the distances.
    for (int i = 1; i < coords.size(); i++) {
      Coords p1 = coords.get(i - 1);
      Coords p2 = coords.get(i);

      dist.add((int) Math.round(DistanceCalculator.calculateGreatCircleDistance(p1.x, p1.y, p2.x, p2.y, false)));
    }

    return dist;
  }

  /**
   * Returns an arraylist containing a list of coordinates in the same order as the
   * places arraylist. In each coord, X is the latitude, Y is the longitude.
   *
   * @return
   */
  private ArrayList<Coords> placesToCoords() {
    ArrayList<Coords> coords = new ArrayList<>();
    for (Place p : places) {
      coords.add(new Coords(convertToDecimal(p.latitude), convertToDecimal(p.longitude)));
    }

    return coords;
  }

  /**
   * Inner class for passing around coordinates nicely
   */
  public class Coords {
    double x;
    double y;

    public Coords(double x, double y) {
      this.x = x;
      this.y = y;
    }
  }

  public boolean validateLatitude(String latIN) {
    //System.out.println("Latitude: " + latIN);
    if(latIN.matches("\\s*\\d+[°|º]\\s*\\d+['|′]\\s*\\d+\\.?\\d*[\"|″]\\s*[N|S]\\s*")) //degrees minutes seconds
      return true; //System.out.println("Matches #1");
    else if(latIN.matches("\\s*\\d+[°|º]\\s*\\d+\\.?\\d*['|′]\\s*[N|S]\\s*")) //degrees decimal minutes
      return true; //System.out.println("Matches #2");
    else if(latIN.matches("\\s*-?\\d+\\.?\\d*[°|º]\\s*[N|S]\\s*")) //decimal degrees
      return true; //System.out.println("Matches #3");
    else if(latIN.matches("\\s*-?\\d+\\.?\\d*\\s*[N|S]\\s*")) //floating point
      return true; //System.out.println("Matches #4");
    else if(latIN.matches("\\s*-?\\d+\\.?\\d*\\s*"))
      return true; //System.out.println("Matches #5");
    else {
      System.out.println("Latitude: " + latIN);
      System.out.println("No match!");
      return false;
      //ERROR OUT??
    }
  }

  public boolean validateLongitude(String longIN) {
    //System.out.println("Longitude: " + longIN);
    if(longIN.matches("\\s*\\d+[°|º]\\s*\\d+['|′]\\s*\\d+(\\.\\d*)?[\"|″]\\s*[E|W]\\s*")) //degrees minutes seconds
      return true; //System.out.println("Matches #1");
    else if(longIN.matches("\\s*\\d+[°|º]\\s*\\d+\\.?\\d*['|′]\\s*[E|W]\\s*")) //degrees decimal minutes
      return true; //System.out.println("Matches #2");
    else if(longIN.matches("\\s*-?\\d+\\.?\\d*[°|º]\\s*[E|W]\\s*")) //decimal degrees
      return true; //System.out.println("Matches #3");
    else if(longIN.matches("\\s*-?\\d+\\.?\\d*\\s*[E|W]\\s*")) //floating point
      return true; //System.out.println("Matches #4");
    else if(longIN.matches("\\s*-?\\d+\\.?\\d*\\s*"))
      return true; //System.out.println("Matches #5");
    else {
      System.out.println("Longitude: " + longIN);
      System.out.println("No match!");
      return false;
      //ERROR OUT?
    }
  }

  public double convertToDecimal(String conv) {

    double seconds = 0;
    double minutes = 0;
    double degrees = 0;
    double direction = 1;

    if(conv.contains("W") || conv.contains("S"))
      direction = -1;

    int degreeSymbol = 0;
    int minuteSymbol = 0;
    int secondSymbol = 0;

    boolean foundMinute = false;
    boolean foundSecond = false;

    for(int i = 0; i < conv.length(); i++) {
      char current = conv.charAt(i);

      if(current == '\'' || current == '′') {
        minuteSymbol = i;
        foundMinute = true;
      }

      if(current == '\"' || current == '″') {
        secondSymbol = i;
        foundSecond = true;
      }

      if(current == '°' || current == 'º')
        degreeSymbol = i;
    }

    if(foundSecond) {
      seconds = Double.parseDouble(conv.substring(minuteSymbol + 1, secondSymbol));
      seconds /= 3600; //convert seconds to degrees
    }
    if(foundMinute) {
      minutes = Double.parseDouble(conv.substring(degreeSymbol+1,minuteSymbol));
      minutes /= 60; //convert minutes to degrees
    }

    if(foundMinute == true && foundSecond == true) { //input has both minutes and seconds
      degrees = Double.parseDouble(conv.substring(0,degreeSymbol));
      degrees += (minutes + seconds);
    }
    else if (foundMinute == true) { //input has minutes
      degrees = Double.parseDouble(conv.substring(0,degreeSymbol));
      degrees += minutes;
    }
    else if (degreeSymbol != 0) { //just degrees with symbol and direction
      degrees = Double.parseDouble(conv.substring(0, degreeSymbol));
    }
    else { //just number
      degrees = Double.parseDouble(conv);
    }

    //System.out.println(degrees);

    return degrees * direction;
  }

}
