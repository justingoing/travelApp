package com.tripco.t16.planner.map;

import com.tripco.t16.planner.Place;
import java.util.ArrayList;

public class KML {
  public static String getWorldKML(ArrayList<Place> places, ArrayList<Point> points, String tripc) {
    StringBuilder builder = new StringBuilder();

    builder.append("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n");

    builder.append("<kml xmlns=\"http://www.opengis.net/kml/2.2\">\n");
    builder.append("<Document>\n");

    for (int i = 0; i < points.size(); i++) {
      builder.append("<Placemark>\n");
      builder.append("<name>" + places.get(i).name + "</name>\n");
      builder.append("<Point>\n");
      builder.append("<coordinates>\n");

      builder.append(points.get(i).x);
      builder.append(",");
      builder.append(points.get(i).y);
      builder.append("\n");

      builder.append("</coordinates>\n");
      builder.append("</Point>\n");
      builder.append("</Placemark>\n");
    }

    builder.append("<Placemark>\n");
    builder.append("<name>Path</name>\n");
    builder.append("<LineString>\n");
    builder.append("<extrude>1</extrude>\n");
    builder.append("<altitudeMode>clampToGround</altitudeMode>\n");
    builder.append("<tessellate>1</tessellate>\n");
    builder.append("<coordinates>\n");

    for (int i = 0; i < points.size(); i++) {
      Point point = points.get(i);
      Point nextPoint = points.get((i + 1) % points.size());

      builder.append(point.y);
      builder.append(",");
      builder.append(point.x);
      builder.append(" ");
      builder.append(nextPoint.y);
      builder.append(",");
      builder.append(nextPoint.x);
      builder.append(" ");
    }

    builder.append("</coordinates>\n");
    builder.append("</LineString>\n");
    builder.append("<Style>\n");
    builder.append("<LineStyle>\n");
    builder.append("<color>BD4269FF</color>\n");
    builder.append("<width>5</width>\n");
    builder.append("</LineStyle>\n");
    builder.append("</Style>\n");
    builder.append("</Placemark>\n");
    builder.append("</Document>\n");
    builder.append("</kml>\n");

    return builder.toString();
  }
}
