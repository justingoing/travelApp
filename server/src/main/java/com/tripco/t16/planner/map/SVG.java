package com.tripco.t16.planner.map;


import com.tripco.t16.planner.Trip;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;

public class SVG {

  private static final String DEST_RADIUS = "10";

  private static final int SVG_WIDTH = 1920;
  private static final int SVG_HEIGHT = 960;
  private static final int SVG_MAPPED_X = 1024;
  private static final int SVG_MAPPED_Y = 512;

  private static final String defaultSVG =
      "<svg width=\"" + Integer.toString(SVG_WIDTH) + "\" height=\"" + Integer
          .toString(SVG_HEIGHT)
          + "\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:svg=\"http://www.w3.org/2000/svg\"><!-- Created with SVG-edit - http://svg-edit.googlecode.com/ --> <g> <g id=\"svg_4\"> <svg id=\"svg_1\" height=\"960\" width=\"1920\" xmlns:svg=\"http://www.w3.org/2000/svg\" xmlns=\"http://www.w3.org/2000/svg\"> <g id=\"svg_2\"> <title>Layer 1</title> <rect fill=\"rgb(119, 204, 119)\" stroke=\"black\" x=\"0\" y=\"0\" width=\"1920\" height=\"960\" id=\"svg_3\"/> </g> </svg> </g> <g id=\"svg_9\"> <svg id=\"svg_5\" height=\"480\" width=\"960\" y=\"240\" x=\"480\" xmlns:svg=\"http://www.w3.org/2000/svg\" xmlns=\"http://www.w3.org/2000/svg\"> <g id=\"svg_6\"> <title>Layer 2</title> <polygon points=\"0,0 960,0 960,480 0,480\" stroke-width=\"12\" stroke=\"brown\" fill=\"none\" id=\"svg_8\"/> <polyline points=\"0,0 960,480 480,0 0,480 960,0 480,480 0,0\" fill=\"none\" stroke-width=\"4\" stroke=\"blue\" id=\"svg_7\"/> </g> </svg> </g> </g> </svg>";

  /**
   * Returns an SVG containing the background and the legs of the trip.
   */
  public static String getWorldSVG(ArrayList<Point> points) {
    String world = getSVGFromFile("/World4.svg");

    return "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\"?>"
        + "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"1024\" height=\"512\">\n"
        + world
        + getLegsAsSVG(points)
        + "</svg>";
  }

  /**
   * Read in an SVG file and convert to a String to display
   *
   * @param filename File to read
   * @return SVG as a String
   */
  private static String getSVGFromFile(String filename) {
    InputStream in = SVG.class.getResourceAsStream(filename);
    BufferedReader br;
    br = new BufferedReader(new InputStreamReader(in));

    String read = "", cur;
    try {
      while ((cur = br.readLine()) != null) {
        read += cur;
      }
    } catch (IOException e) {
      e.printStackTrace();
      return defaultSVG;
    }

    return read;
  }

  /**
   * Loop through each coordinate in the trip and generate a 'leg' for the SVG map, drawing a line
   * b/n consecutive destinations
   *
   * @return A String SVG of trip 'legs' to be sent to the server
   */
  private static String getLegsAsSVG(ArrayList<Point> points) {
    StringBuilder svg = new StringBuilder(
        "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"1066.6073\" height=\"783.0824\">");

    if (points.size() <= 0) {
      svg.append("</svg>");
      return svg.toString();
    }

    Point start = getMappedCoords(points.get(0).x, points.get(0).y);
    Point end = getMappedCoords(points.get(points.size() - 1).x,
        points.get(points.size() - 1).y);

    addSvgLeg(svg, start, end);

    for (int i = 0; i < points.size() - 1; ++i) {
      Point cur = getMappedCoords(points.get(i).x, points.get(i).y);
      Point nex = getMappedCoords(points.get(i + 1).x, points.get(i + 1).y);

      addTripLeg(svg, cur, nex);

      addSvgCircle(svg, cur);
      if (i == points.size() - 2) {
        addSvgCircle(svg, nex);
      }
    }
    svg.append("</svg>");
    return svg.toString();
  }

  private static void addTripLeg(StringBuilder svg, Point cur, Point nex) {
    // wrap around 'edge' of the earth
    if (Math.abs(nex.x - cur.x) > (SVG_MAPPED_X / 2)) {
      if (nex.x > cur.x) {
        Point curEnd = new Point(nex.x - SVG_MAPPED_X, nex.y);
        Point nexEnd = new Point(cur.x + SVG_MAPPED_X, cur.y);
        addSvgLeg(svg, cur, curEnd, nex, nexEnd);
      } else {
        Point curEnd = new Point(nex.x + SVG_MAPPED_X, nex.y);
        Point nexEnd = new Point(cur.x - SVG_MAPPED_X, cur.y);
        addSvgLeg(svg, cur, curEnd, nex, nexEnd);
      }
    }
    // close enough to not wrap around earth
    else {
      addSvgLeg(svg, cur, nex);
    }
  }

  /**
   * Build the actual string that draws the SVG line for a leg
   *
   * @param svg String builder for the leg that gets modified
   * @param start The first point
   * @param end The second point
   */
  private static void addSvgLeg(StringBuilder svg, Point start, Point end) {
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
  private static void addSvgLeg(StringBuilder svg, Point start1, Point start2, Point end1,
      Point end2) {
    addSvgLeg(svg, start1, start2);
    addSvgLeg(svg, end1, end2);
  }

  private static void addSvgCircle(StringBuilder svg, Point pos) {
    svg.append("<circle cx=\"").append(pos.x).append("\" cy=\" ").append(pos.y).append(" \" r=\"")
        .append(DEST_RADIUS)
        .append("\" stroke=\"#1E4D2B\" stroke-width=\"3\" fill=\"#C8C372\" />");
  }

  /**
   * Get a lat/long pair as coordinates mapped to our svg (within the Colorado border)
   *
   * @param lat Latitude
   * @param lon Longitude
   * @return Mapped coordinates as a pair
   */
  private static Point getMappedCoords(double lat, double lon) {
    double normalLat = Trip.normalizeLat(lat);
    double normalLon = Trip.normalizeLong(lon);

    // swapping lat/long since lat==y and lon==x, so we go from y/x to x/y
    double finalX = SVG_MAPPED_X * normalLon;
    double finalY = SVG_MAPPED_Y * normalLat;

    return new Point(finalX, finalY);
  }
}