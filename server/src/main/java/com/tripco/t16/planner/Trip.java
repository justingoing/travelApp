package com.tripco.t16.planner;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import com.tripco.t16.server.HTTP;
import spark.Request;

import java.io.*;
import java.net.URISyntaxException;
import java.util.ArrayList;

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
   * Returns an SVG containing the background and the legs of the trip.
   * @return
   */
  private String svg() {
  String colorado = this.getSVGFromFile("/colorado.svg");
  String borders = this.getSVGFromFile("/borders.svg");

    String finalSVG =
            "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\"?>" +
            "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"1066.6073\" height=\"783.0824\">\n" +
              colorado + borders +
            "</svg>";

    return finalSVG;
  }

  /**
   * Returns the distances between consecutive places,
   * including the return to the starting point to make a round trip.
   * @return
   */
  private ArrayList<Integer> legDistances() {

    ArrayList<Integer> dist = new ArrayList<Integer>();

    // hardcoded example
    dist.add(12);
    dist.add(23);
    dist.add(34);
    dist.add(45);
    dist.add(65);
    dist.add(19);

    return dist;
  }

  public boolean validateLatitude(String latIN) {
    //System.out.println("Latitude: " + latIN);
    if(latIN.matches("\\s*\\d+[°|º]\\s*\\d+['|′]\\s*\\d+\\.?\\d*[\"|″]\\s*[N|S]")) //degrees minutes seconds
      return true; //System.out.println("Matches #1");
    else if(latIN.matches("\\s*\\d+[°|º]\\s*\\d+\\.?\\d*['|′]\\s*[N|S]")) //degrees decimal minutes
      return true; //System.out.println("Matches #2");
    else if(latIN.matches("\\s*-?\\d+\\.?\\d*[°|º]\\s*[N|S]")) //decimal degrees
      return true; //System.out.println("Matches #3");
    else if(latIN.matches("\\s*-?\\d+\\.?\\d*\\s*[N|S]")) //floating point
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
    if(longIN.matches("\\s*\\d+[°|º]\\s*\\d+['|′]\\s*\\d+\\.?\\d*[\"|″]\\s*[E|W]")) //degrees minutes seconds
      return true; //System.out.println("Matches #1");
    else if(longIN.matches("\\s*\\d+[°|º]\\s*\\d+\\.?\\d*['|′]\\s*[E|W]")) //degrees decimal minutes
      return true; //System.out.println("Matches #2");
    else if(longIN.matches("\\s*-?\\d+\\.?\\d*[°|º]\\s*[E|W]")) //decimal degrees
      return true; //System.out.println("Matches #3");
    else if(longIN.matches("\\s*-?\\d+\\.?\\d*\\s*[E|W]")) //floating point
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

    System.out.println(degrees);

    return degrees * direction;
  }

}
