package com.tripco.t16.planner;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import com.tripco.t16.server.HTTP;
import spark.Request;

import java.io.*;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedList;

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

  public ArrayList<Coords> coords;

  public final String defaultSVG = "<svg width=\"1920\" height=\"960\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:svg=\"http://www.w3.org/2000/svg\"><!-- Created with SVG-edit - http://svg-edit.googlecode.com/ --> <g> <g id=\"svg_4\"> <svg id=\"svg_1\" height=\"960\" width=\"1920\" xmlns:svg=\"http://www.w3.org/2000/svg\" xmlns=\"http://www.w3.org/2000/svg\"> <g id=\"svg_2\"> <title>Layer 1</title> <rect fill=\"rgb(119, 204, 119)\" stroke=\"black\" x=\"0\" y=\"0\" width=\"1920\" height=\"960\" id=\"svg_3\"/> </g> </svg> </g> <g id=\"svg_9\"> <svg id=\"svg_5\" height=\"480\" width=\"960\" y=\"240\" x=\"480\" xmlns:svg=\"http://www.w3.org/2000/svg\" xmlns=\"http://www.w3.org/2000/svg\"> <g id=\"svg_6\"> <title>Layer 2</title> <polygon points=\"0,0 960,0 960,480 0,480\" stroke-width=\"12\" stroke=\"brown\" fill=\"none\" id=\"svg_8\"/> <polyline points=\"0,0 960,480 480,0 0,480 960,0 480,480 0,0\" fill=\"none\" stroke-width=\"4\" stroke=\"blue\" id=\"svg_7\"/> </g> </svg> </g> </g> </svg>";

  public static final String DEST_RADIUS = "10";

  /** The top level method that does planning.
   * At this point it just adds the map and distances for the places in order.
   * It might need to reorder the places in the future.
   */
  public void plan() {

    for(int i = this.places.size()-1; i >= 0; --i)
    {
      try {
        if (!this.validateLatitude(this.places.get(i).latitude) || !this.validateLongitude(this.places.get(i).longitude)) {
          this.places.remove(i);
        }
      }catch(NullPointerException e)
      {
        this.places.remove(i);
      }
    }

    this.places = nearestNeighbor();
    this.coords = placesToCoords();
    this.distances = legDistances();
    this.map = svg();
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

    String svg = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"1066.6073\" height=\"783.0824\">";

    for(int i = 0; i < coords.size()-1; ++i)
    {
      Coords cur = this.getMappedCoords(this.coords.get(i).x, this.coords.get(i).y);
      Coords nex = this.getMappedCoords(this.coords.get(i+1).x, this.coords.get(i+1).y);

      svg += "<line stroke=\"%237FFF00\" y2=\"" + nex.y + "\" x2=\"" + nex.x +
              "\" y1=\"" + cur.y + "\" x1=\"" + cur.x + "\" stroke-width=\"5\" fill=\"none\"/>";

      svg += "<circle cx=\"" + cur.x + "\" cy=\" " + cur.y + " \" r=\"" + Trip.DEST_RADIUS + "\" stroke=\"black\" stroke-width=\"3\" fill=\"red\" />";

      if(i == this.coords.size()-2)
        svg += "<circle cx=\"" + nex.x + "\" cy=\" " + nex.y + " \" r=\"" + Trip.DEST_RADIUS + "\" stroke=\"black\" stroke-width=\"3\" fill=\"red\" />";
    }

    Coords start = this.getMappedCoords(this.coords.get(0).x, this.coords.get(0).y);
    Coords end = this.getMappedCoords(this.coords.get(this.coords.size()-1).x, this.coords.get(this.coords.size()-1).y);

    svg += "<line stroke=\"%237FFF00\" y2=\"" + end.y + "\" x2=\"" + end.x +
            "\" y1=\"" + start.y + "\" x1=\"" + start.x + "\" stroke-width=\"5\" fill=\"none\"/>";

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

    String finalSVG =
            "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\"?>" +
            "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"1066.6073\" height=\"783.0824\">\n" +
              colorado + this.getLegsAsSVG() +
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

    //And then calculate the distances.
    for (int i = 1; i <= coords.size(); i++) {
      Coords p1 = this.coords.get(i - 1);
      Coords p2 = this.coords.get(i % coords.size());

      dist.add(DistanceCalculator.calculateGreatCircleDistance(p1.x, p1.y, p2.x, p2.y, options.getRadius()));
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

    if (conv.contains("W") || conv.contains("S"))
      direction = -1;

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

      if (current == '°' || current == 'º')
        degreeSymbol = i;
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


  /**
   *
   */
  public ArrayList<Place> nearestNeighbor() {
    //O(N)
    //TODO optimize
    PlaceDistPair[] placesArray = new PlaceDistPair[places.size()];
    for (int i = 0; i < places.size(); i++) {
      placesArray[i] = new PlaceDistPair();
      placesArray[i].place = places.get(i);
    }

    int[][] distanceMatrix = new int[placesArray.length][placesArray.length];

    //O(N^2)
    //Rip through calculating the distance matrix.
    //TODO optimize by 1/2
    for (int i = 0; i < distanceMatrix.length; i++) {
      for (int j = 0; j < distanceMatrix[i].length; j++) {
        if (i == j) {
          continue;
        }

        int distance = DistanceCalculator.calculateGreatCircleDistance(
                convertToDecimal(placesArray[i].place.latitude),
                convertToDecimal(placesArray[i].place.longitude),
                convertToDecimal(placesArray[j].place.latitude),
                convertToDecimal(placesArray[j].place.longitude), options.getRadius());
        distanceMatrix[i][j] = distance;
      }
    }

    int bestStart = -1;
    ArrayList<Place> bestPlaces = new ArrayList<>();
    int bestDistance = Integer.MAX_VALUE;

    for (int startLoc = 0; startLoc < placesArray.length; startLoc++) {
      ArrayList<Place> tmpPlaces = new ArrayList<>();
      int distance = 0;

      //Starting from point zero:
      Place start = placesArray[startLoc].place;
      placesArray[startLoc].visited = true;
      int currentIndex = 0;
      tmpPlaces.add(start);

      for (int i = 1; i < placesArray.length; i++) {
        //Find closest neighbor
        PlaceDistPair nearestNeighbor = null;
        int closest = Integer.MAX_VALUE;
        int id = -1;
        for (int j = 0; j < distanceMatrix[currentIndex].length; j++) {
          if (distanceMatrix[currentIndex][j] < closest &&
                  !placesArray[j].visited) {
            closest = distanceMatrix[currentIndex][j];
            nearestNeighbor = placesArray[j];
            id = j;
          }
        }

        if (nearestNeighbor != null) {
          currentIndex = id;
          tmpPlaces.add(nearestNeighbor.place);
          placesArray[id].visited = true;
          distance += closest;
        }
      }

      if (distance < bestDistance) {
        bestStart = startLoc;
        bestPlaces = tmpPlaces;
      }


      //Reset
      for (int i = 0; i < placesArray.length; i++) {
        placesArray[i].visited = false;
      }
    }


    return bestPlaces;
  }

//  /**
//   *
//   * @return
//   */
//  public int testStartPosition(NearestNeighborEntry[] entries, int startIndex) {
//    ArrayList<NearestNeighborEntry> visited = new ArrayList<>();
//    for (int i = 0; i < entries.length) {
//      if ()
//    }
//  }
//
//  /**
//   *
//   * @param
//   */
//  public void nearestNeighbor() {
//    //Validate argument
//    if (places == null || places.size() <= 0) {
//      return;
//    }
//
//    System.out.println("NEAREST NEIGHBOR");
//
//    //Structures that hold the output
//    ArrayList<Place> bestRoute = new ArrayList<>();
//    ArrayList<Integer> bestDists = new ArrayList<>();
//    int bestTotal = Integer.MAX_VALUE;
//
//    //Try every possible starting location.
//    for (Place p : places) {
//      ArrayList<Place> route = new ArrayList<>();
//      ArrayList<Integer> dists = new ArrayList<>();
//      int total = 0;
//
//      //Populate our unvisited list.
//      ArrayList<Place> unvisited = new ArrayList<>();
//      for (Place p2 : places) {
//        if (p2 != p) {
//          unvisited.add(p2);
//        }
//      }
//
//      //Start location
//      Place start = p;
//      Place previousPlace = p;
//      Place bestPlace = null;
//      int shortestDist = Integer.MAX_VALUE;
//
//      //Loop through the unvisited nodes, finding the shortest distance
//      for (Place candidate : unvisited) {
//        int dist = DistanceCalculator.calculateGreatCircleDistance(convertToDecimal(previousPlace.latitude),
//                convertToDecimal(previousPlace.longitude),
//                convertToDecimal(candidate.latitude),
//                convertToDecimal(candidate.longitude), options.getRadius());
//
//        if (dist < shortestDist) {
//          shortestDist = dist;
//          bestPlace = candidate;
//        }
//
//        previousPlace = candidate;
//
//
//        if (bestPlace == null) {
//          int toEndDist = DistanceCalculator.calculateGreatCircleDistance(convertToDecimal(previousPlace.latitude),
//                  convertToDecimal(previousPlace.longitude),
//                  convertToDecimal(start.latitude),
//                  convertToDecimal(start.longitude), options.getRadius());
//          dists.add(toEndDist);
//        } else {
//          route.add(bestPlace);
//          dists.add(shortestDist);
//        }
//      }
//
//      //Update best distances.
//      if (total < bestTotal) {
//        bestDists = dists;
//        bestRoute = route;
//        bestTotal = total;
//      }
//    }
//
//    //Set stuff
//    places = bestRoute;
//    distances = bestDists;
//  }

  /**
   *
   * @param places
   * @return
   */
  private HashMap<CityPair, Integer> calculatePairWiseDistances(Place[] places) {
    HashMap<CityPair, Integer> output = new HashMap<>();

    for (int i = 0; i < places.length; i++) {
      for (int j = i + 1; j < places.length; j++) {
        int distance = DistanceCalculator.calculateGreatCircleDistance(
                convertToDecimal(places[i].latitude),
                convertToDecimal(places[i].longitude),
                convertToDecimal(places[j].latitude),
                convertToDecimal(places[j].longitude), options.getRadius());

        output.put(new CityPair(places[i], places[j]), distance);
      }
    }
    return output;
  }

//  private NearestNeighborEntry[] getClosestTwoCities(Place[] places) {
//    NearestNeighborEntry[] entries = new NearestNeighborEntry[places.length];
//
//    for (int i = 0; i < places.length; i++) {
//      NearestNeighborEntry currentEntry = new NearestNeighborEntry(places[i]);
//      for (int j = 0; j < places.length; j++) {
//        if (j == i) {
//          continue;
//        }
//
//        int distance = DistanceCalculator.calculateGreatCircleDistance(
//                convertToDecimal(places[i].latitude),
//                convertToDecimal(places[i].longitude),
//                convertToDecimal(places[j].latitude),
//                convertToDecimal(places[j].longitude), options.getRadius());
//
//        //Update closest if necessary
//        currentEntry.updateClosestFromPlace(distance, places[j]);
//      }
//      entries[i] = currentEntry;
//    }
//
//    return entries;
//  }

//  private static class NearestNeighborEntry {
//    public final Place place;
//
//
//    public NearestNeighborEntry(Place place) {
//      this.place = place;
//      closestDistance = Integer.MAX_VALUE;
//      secondClosestDistance = Integer.MAX_VALUE;
//    }
//
//    public NearestNeighborEntry(Place place, int closestDistance, Place closestPlace,
//                                int secondClosestDistance, Place secondClosestPlace) {
//      this.place = place;
//      this.closestDistance = closestDistance;
//      this.closestPlace = closestPlace;
//      this.secondClosestDistance = secondClosestDistance;
//      this.secondClosestPlace = secondClosestPlace;
//    }
//
//    public void updateClosestFromPlace(int distance, Place place) {
//      if (closestDistance > distance) {
//        secondClosestPlace =  closestPlace;
//        secondClosestDistance = closestDistance;
//        closestDistance = distance;
//        closestPlace = place;
//      }
//    }
//  }

  private static class PlaceDistPair {
    public Place place;
    public boolean visited;
  }

  public static class CityPair {
    public final Place p1;
    public final Place p2;

    public CityPair(Place p1, Place p2) {
      this.p1 = p1;
      this.p2 = p2;
    }

    @Override
    public boolean equals(Object obj) {
      CityPair pair = (CityPair) obj;
      return (p1 == pair.p1 && p2 == pair.p2) ||
              (p1 == pair.p2 && p2 == pair.p1);
    }
  }

}