package com.tripco.t16.planner.map;

import com.tripco.t16.planner.Place;
import java.util.ArrayList;

public class KML {
  public static String getWorldKML(ArrayList<Place> places, ArrayList<Point> points) {
    StringBuilder builder = new StringBuilder();

    builder.append("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n");

    builder.append("<kml xmlns=\"http://www.opengis.net/kml/2.2\">\n");
    builder.append("<Document>\n");

    for (int i = 0; i < points.size(); i++) {
      Place place = places.get(i);
      Place nextPlace = places.get((i + 1) % points.size());
      Point point = points.get(i);
      Point nextPoint = points.get((i + 1) % points.size());

      builder.append("<Placemark>\n");
      builder.append("<name>" + place.name + " to " + nextPlace.name + "</name>\n");
      builder.append("<LineString>\n");
      builder.append("<extrude>1</extrude>\n");
      builder.append("<altitudeMode>clampToGround</altitudeMode>\n");
      builder.append("<tessellate>1</tessellate>\n");
      builder.append("<coordinates>\n");

      builder.append(point.x);
      builder.append(", ");
      builder.append(point.y);
      builder.append(", 0, ");
      builder.append(nextPoint.x);
      builder.append(", ");
      builder.append(nextPoint.y);
      builder.append(", 0");


      builder.append("</coordinates>\n");
      builder.append("</LineString>\n");

      builder.append("<Style>\n");
      builder.append("<LineStyle>\n");
      builder.append("<color>BD4269</color>\n");
      builder.append("<width>5</width>\n");
      builder.append("</LineStyle>\n");
      builder.append("</Style>\n");

      builder.append("</Placemark>\n");
    }

    builder.append("</Document>\n");

    builder.append("</kml>\n");

    return builder.toString();
  }
}
