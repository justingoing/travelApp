package com.tripco.t16.planner;

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

  public ArrayList<Coords> coords;

  public static final int SVG_WIDTH = 1920;
  public static final int SVG_HEIGHT = 960;
  public static final int SVG_MAPPED_X = 1024;
  public static final int SVG_MAPPED_Y = 512;
  public final String defaultSVG =
      "<svg width=\"" + Integer.toString(Trip.SVG_WIDTH) + "\" height=\"" + Integer
          .toString(Trip.SVG_HEIGHT)
          + "\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:svg=\"http://www.w3.org/2000/svg\"><!-- Created with SVG-edit - http://svg-edit.googlecode.com/ --> <g> <g id=\"svg_4\"> <svg id=\"svg_1\" height=\"960\" width=\"1920\" xmlns:svg=\"http://www.w3.org/2000/svg\" xmlns=\"http://www.w3.org/2000/svg\"> <g id=\"svg_2\"> <title>Layer 1</title> <rect fill=\"rgb(119, 204, 119)\" stroke=\"black\" x=\"0\" y=\"0\" width=\"1920\" height=\"960\" id=\"svg_3\"/> </g> </svg> </g> <g id=\"svg_9\"> <svg id=\"svg_5\" height=\"480\" width=\"960\" y=\"240\" x=\"480\" xmlns:svg=\"http://www.w3.org/2000/svg\" xmlns=\"http://www.w3.org/2000/svg\"> <g id=\"svg_6\"> <title>Layer 2</title> <polygon points=\"0,0 960,0 960,480 0,480\" stroke-width=\"12\" stroke=\"brown\" fill=\"none\" id=\"svg_8\"/> <polyline points=\"0,0 960,480 480,0 0,480 960,0 480,480 0,0\" fill=\"none\" stroke-width=\"4\" stroke=\"blue\" id=\"svg_7\"/> </g> </svg> </g> </g> </svg>";

  public static final String DEST_RADIUS = "10";

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
        }else{
          err.code = "500";
          err.message = "Server failed to validate LatLong";
          err.debug = "Trip.java-plan-validateLatLong.";
          return err;
        }
      } catch (NullPointerException e) {
        this.places.remove(i);
      }
    }

    if (options != null && options.getOptimizationLevel() >= 0.66) {
      this.places = Optimization.optimize(places, options.getUnitRadius(), true);
    } else if (options != null && options.getOptimizationLevel() >= .33) {
      this.places = Optimization.optimize(places, options.getUnitRadius(), false);
    }

    this.coords = placesToCoords();
    this.distances = legDistances();
    this.map = svg();
    return err;
  }

  /**
   * Read in an SVG file and convert to a String to display
   *
   * @param filename File to read
   * @return SVG as a String
   */
  public String getSVGFromFile(String filename) {
    InputStream in = this.getClass().getResourceAsStream(filename);
    BufferedReader br;
    br = new BufferedReader(new InputStreamReader(in));

    String read = "", cur;
    try {
      while ((cur = br.readLine()) != null) {
        read += cur;
      }
    } catch (IOException e) {
      e.printStackTrace();
      return this.defaultSVG;
    }

    return read;
  }

  /**
   * Loop through each coordinate in the trip and generate a 'leg' for the SVG map, drawing a line
   * b/n consecutive destinations
   *
   * @return A String SVG of trip 'legs' to be sent to the server
   */
  public String getLegsAsSVG() {
    StringBuilder svg = new StringBuilder(
        "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"1066.6073\" height=\"783.0824\">");

    if (this.coords.size() > 0) {
      Coords start = this.getMappedCoords(this.coords.get(0).x, this.coords.get(0).y);
      Coords end = this.getMappedCoords(this.coords.get(this.coords.size() - 1).x,
          this.coords.get(this.coords.size() - 1).y);

      addSvgLeg(svg, start, end);

      for (int i = 0; i < coords.size() - 1; ++i) {
        Coords cur = this.getMappedCoords(this.coords.get(i).x, this.coords.get(i).y);
        Coords nex = this.getMappedCoords(this.coords.get(i + 1).x, this.coords.get(i + 1).y);

        // wrap around 'edge' of the earth
        if (Math.abs(nex.x - cur.x) > (Trip.SVG_MAPPED_X / 2)) {
          if (nex.x > cur.x) {
            Coords curEnd = new Coords(nex.x - Trip.SVG_MAPPED_X, nex.y);
            Coords nexEnd = new Coords(cur.x + Trip.SVG_MAPPED_X, cur.y);
            addSvgLeg(svg, cur, curEnd, nex, nexEnd);
          }
          else {
            Coords curEnd = new Coords(nex.x + Trip.SVG_MAPPED_X, nex.y);
            Coords nexEnd = new Coords(cur.x - Trip.SVG_MAPPED_X, cur.y);
            addSvgLeg(svg, cur, curEnd, nex, nexEnd);
          }
        }
        // close enough to not wrap around earth
        else {
          addSvgLeg(svg, cur, nex);
        }

        addSvgCircle(svg, cur);
        if (i == this.coords.size() - 2) {
          addSvgCircle(svg, nex);
        }
      }
    }
    svg.append("</svg>");
    return svg.toString();
  }

  /**
   * Build the actual string that draws the SVG line for a leg
   *
   * @param svg String builder for the leg that gets modified
   * @param start The first point
   * @param end The second point
   */
  private void addSvgLeg(StringBuilder svg, Coords start, Coords end) {
    svg.append("<line stroke=\"#1E4D2B\" y2=\"").append(end.y).append("\" x2=\"").append(end.x)
        .append("\" y1=\"").append(start.y).append("\" x1=\"").append(start.x)
        .append("\" stroke-width=\"5\" fill=\"none\"/>");
  }

  /**
   * Build a two-line leg, so that it wraps around the 'edge' of the Earth
   *
   * @param svg String builder that gets modified
   * @param start1 The actual start coordinate
   * @param start2 The 'end' of the start coord (for wrapping off edge)
   * @param end1 The actual end coordinate
   * @param end2 The 'end ' of the end coord (for wrapping off edge)
   */
  private void addSvgLeg(StringBuilder svg, Coords start1, Coords start2, Coords end1, Coords end2) {
    svg.append("<line stroke=\"#1E4D2B\" y2=\"").append(start1.y).append("\" x2=\"").append(start1.x)
        .append("\" y1=\"").append(start2.y).append("\" x1=\"").append(start2.x)
        .append("\" stroke-width=\"5\" fill=\"none\"/>");

    svg.append("<line stroke=\"#1E4D2B\" y2=\"").append(end1.y).append("\" x2=\"").append(end1.x)
        .append("\" y1=\"").append(end2.y).append("\" x1=\"").append(end2.x)
        .append("\" stroke-width=\"5\" fill=\"none\"/>");
  }

  private void addSvgCircle(StringBuilder svg, Coords pos) {
    svg.append("<circle cx=\"").append(pos.x).append("\" cy=\" ").append(pos.y).append(" \" r=\"")
        .append(Trip.DEST_RADIUS)
        .append("\" stroke=\"#1E4D2B\" stroke-width=\"3\" fill=\"#C8C372\" />");
  }


  /**
   * Get a lat/long pair as coordinates mapped to our svg (within the Colorado border)
   *
   * @param lat Latitude
   * @param lon Longitude
   * @return Mapped coordinates as a pair
   */
  public Coords getMappedCoords(double lat, double lon) {
    double scaleX = Trip.SVG_MAPPED_X;
    double scaleY = Trip.SVG_MAPPED_Y;
    double transX = 0;
    double transY = 0;

    double normalLat = this.normalizeLat(lat);
    double normalLon = this.normalizeLong(lon);

    // swapping lat/long since lat==y and lon==x, so we go from y/x to x/y
    double finalX = scaleX * normalLon + transX;
    double finalY = scaleY * normalLat + transY;

    Coords ret = new Coords(finalX, finalY);
    return ret;
  }

  /**
   * Get the normalized latitude Note: It is inverted so that it matches SVG convention of top left
   * being (0,0)
   *
   * @param lat Latitude to be normalized
   * @return Normalized latitude
   */
  public double normalizeLat(double lat) {
    // Note these are inverted so that we can get SVG coords going top-down instead of bottom-up
    /*return (lat - DistanceCalculator.COLORADO_TOP) / (DistanceCalculator.COLORADO_BOTTOM
     - DistanceCalculator.COLORADO_TOP);*/
    return (lat - DistanceCalculator.WORLD_TOP) / (DistanceCalculator.WORLD_BOTTOM
        - DistanceCalculator.WORLD_TOP);
  }

  /**
   * Get the normalized longitude
   *
   * @param lon Longitude to be normalized
   * @return Normalized longitude
   */
  public double normalizeLong(double lon) {
    /*return (lon - DistanceCalculator.COLORADO_LEFT) / (DistanceCalculator.COLORADO_RIGHT
    - DistanceCalculator.COLORADO_LEFT); */
    return (lon - DistanceCalculator.WORLD_LEFT) / (DistanceCalculator.WORLD_RIGHT
        - DistanceCalculator.WORLD_LEFT);
  }

  /**
   * Returns an SVG containing the background and the legs of the trip.
   */
  private String svg() {
    String colorado = this.getSVGFromFile("/colorado.svg");
    String world = this.getSVGFromFile("/World4.svg");

    String finalSVG =
        "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\"?>"
            + "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"1024\" height=\"512\">\n"
            + world
            + this.getLegsAsSVG()
            + "</svg>";

    return finalSVG;
  }

  /**
   * Returns the distances between consecutive places, including the return to the starting point to
   * make a round trip.
   */
  private ArrayList<Integer> legDistances() {

    //Create empty list of distances and get an arraylist of coords.
    ArrayList<Integer> dist = new ArrayList<Integer>();

    //And then calculate the distances.
    for (int i = 1; i <= coords.size(); i++) {
      Coords p1 = this.coords.get(i - 1);
      Coords p2 = this.coords.get(i % coords.size());

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

    public String toString() {
      String ret = "(" + this.x + ", " + this.y + ")";
      return ret;
    }
  }

  /**
   * Is the lat/long string valid?
   *
   * @param latIN longitude/latitude to be validated
   * @return boolean true = valid
   */
  public boolean validateLatLong(String latIN) {
    //System.out.println("Latitude: " + latIN);
    if (latIN.matches("\\s*\\d+[°|º]\\s*\\d+['|′]\\s*\\d+\\.?\\d*[\"|″]?\\s*[N|S|E|W]\\s*")) //DMS
    {
      return true; //System.out.println("Matches #1");
    } else if (latIN
        .matches("\\s*\\d+[°|º]\\s*\\d+\\.?\\d*['|′]\\s*[N|S|E|W]\\s*")) //degrees decimal minutes
    {
      return true; //System.out.println("Matches #2");
    } else if (latIN.matches("\\s*-?\\d+\\.?\\d*[°|º]\\s*[N|S|E|W]\\s*")) //decimal degrees
    {
      return true; //System.out.println("Matches #3");
    } else if (latIN.matches("\\s*-?\\d+\\.?\\d*\\s*[N|S|E|W]\\s*")) //floating point
    {
      return true; //System.out.println("Matches #4");
    } else if (latIN.matches("\\s*-?\\d+\\.?\\d*\\s*")) {
      return true; //System.out.println("Matches #5");
    } else {
      System.out.println("Latitude: " + latIN);
      System.out.println("No match!");
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
        //System.out.println("found space");
        seconds = Double.parseDouble(conv.substring(minuteSymbol + 2, secondSymbol));
      } else {
        //System.out.println("no spacing");
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

    //System.out.println(degrees);

    return degrees * direction;
  }
}
