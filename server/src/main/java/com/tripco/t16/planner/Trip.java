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
    System.out.println("Latitude: " + latIN);
    if(latIN.matches("\\s*\\d+°\\s*\\d+'\\s*\\d+\\.?\\d*\"\\s*[N|S]")) //degrees minutes seconds
      System.out.println("Matches #1");
    else if(latIN.matches("\\s*\\d+°\\s*\\d+\\.?\\d*'\\s*[N|S]")) //degrees decimal minutes
      System.out.println("Matches #2");
    else if(latIN.matches("\\s*-?\\d+\\.?\\d*°\\s*[N|S]")) //decimal degrees
      System.out.println("Matches #3");
    else if(latIN.matches("\\s*-?\\d+\\.?\\d*\\s*[N|S]")) //floating point
      System.out.println("Matches #4");
    else if(latIN.matches("\\s*-?\\d+\\.?\\d*\\s*"))
      System.out.println("Matches #5");
    else {
      System.out.println("No match!");
      return false;
      //ERROR OUT??
    }
    return true;
  }

  public boolean validateLongitude(String longIN) {
    System.out.println("Longitude: " + longIN);
    if(longIN.matches("\\s*\\d+°\\s*\\d+'\\s*\\d+\\.?\\d*\"\\s*[E|W]")) //degrees minutes seconds
      System.out.println("Matches #1");
    else if(longIN.matches("\\s*\\d+°\\s*\\d+\\.?\\d*'\\s*[E|W]")) //degrees decimal minutes
      System.out.println("Matches #2");
    else if(longIN.matches("\\s*-?\\d+\\.?\\d*°\\s*[E|W]")) //decimal degrees
      System.out.println("Matches #3");
    else if(longIN.matches("\\s*-?\\d+\\.?\\d*\\s*[E|W]")) //floating point
      System.out.println("Matches #4");
    else if(longIN.matches("\\s*-?\\d+\\.?\\d*\\s*"))
      System.out.println("Matches #5");
    else {
      System.out.println("No match!");
      return false;
      //ERROR OUT?
    }
    return true;
  }

}