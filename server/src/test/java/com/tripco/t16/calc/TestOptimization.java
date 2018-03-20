package com.tripco.t16.calc;

import static org.junit.Assert.*;

import com.tripco.t16.planner.Place;
import java.util.ArrayList;
import java.util.Random;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

@RunWith(JUnit4.class)
public class TestOptimization {

  private Random rand = new Random();

  @Test
  public void testZero() {
    ArrayList<Place> places = new ArrayList<>();
    ArrayList<Place> output = new ArrayList<>();
    assertEquals(Optimization.nearestNeighbor(places, DistanceCalculator.EARTH_RADIUS_MI),
        output);
  }

  @Test
  public void testDegenerateCases() {
    ArrayList<Place> places = new ArrayList<>();
    ArrayList<Place> output = new ArrayList<>();
    Place p = makeRandomPlace();
    output.add(p);
    places.add(p);
    assertEquals(Optimization.nearestNeighbor(places, DistanceCalculator.EARTH_RADIUS_MI),
        output);
  }

  @Test
  public void testEquivalentCase() {
    ArrayList<Place> places = new ArrayList<>();
    ArrayList<Place> output = new ArrayList<>();

    Place p = makeFrom(DistanceCalculator.COLORADO_BOTTOM, DistanceCalculator.COLORADO_LEFT);
    Place p2 = makeFrom(DistanceCalculator.COLORADO_TOP, DistanceCalculator.COLORADO_LEFT);
    Place p3 = makeFrom(DistanceCalculator.COLORADO_TOP, DistanceCalculator.COLORADO_RIGHT);
    Place p4 = makeFrom(DistanceCalculator.COLORADO_BOTTOM, DistanceCalculator.COLORADO_RIGHT);

    output.add(p);
    output.add(p2);
    output.add(p3);
    output.add(p4);

    places.add(p);
    places.add(p2);
    places.add(p3);
    places.add(p4);

    assertEquals(Optimization.nearestNeighbor(places, DistanceCalculator.EARTH_RADIUS_MI),
        output);
  }

  @Test
  public void testGeneral() {
    ArrayList<Place> places = new ArrayList<>();
    ArrayList<Place> output = new ArrayList<>();

    Place p = makeFrom(DistanceCalculator.COLORADO_BOTTOM, DistanceCalculator.COLORADO_LEFT);
    Place p2 = makeFrom(DistanceCalculator.COLORADO_TOP, DistanceCalculator.COLORADO_LEFT);
    Place p3 = makeFrom(DistanceCalculator.COLORADO_BOTTOM, DistanceCalculator.COLORADO_RIGHT);

    output.add(p);
    output.add(p2);
    output.add(p3);

    places.add(p);
    places.add(p2);
    places.add(p3);
    assertEquals(Optimization.nearestNeighbor(places, DistanceCalculator.EARTH_RADIUS_MI),
        output);
  }

  @Test
  public void test2OptReverse() {
    ArrayList<Place> places = new ArrayList<>();
    places.add(makeFrom(DistanceCalculator.COLORADO_TOP, DistanceCalculator.COLORADO_LEFT));
    places.add(makeFrom(DistanceCalculator.COLORADO_TOP, DistanceCalculator.COLORADO_RIGHT));
    places.add(makeFrom(DistanceCalculator.COLORADO_BOTTOM, DistanceCalculator.COLORADO_LEFT));
    places.add(makeFrom(DistanceCalculator.COLORADO_BOTTOM, DistanceCalculator.COLORADO_RIGHT));
  }

  private Place makeFrom(double lat, double lon) {
    Place p = new Place();
    int random = rand.nextInt();
    p.id = "p-" + random;
    p.name = "Random" + random;
    p.latitude = "" + lat;
    p.longitude = "" + lon;
    return p;
  }

  private Place copyPlace(Place p) {
    Place newPlace = new Place();
    newPlace.latitude = p.latitude;
    newPlace.longitude = p.longitude;
    newPlace.name = p.name;
    newPlace.id = p.id;
    return newPlace;
  }


  private Place makeRandomPlace() {
    Place p = new Place();
    int random = rand.nextInt();
    p.id = "p-" + random;
    p.latitude = "" + DistanceCalculator.COLORADO_BOTTOM;
    p.longitude = "" + DistanceCalculator.COLORADO_LEFT;
    p.name = "Random" + random;

    return p;
  }
}
