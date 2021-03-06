package com.tripco.t16.calc;

import static org.junit.Assert.*;

import com.tripco.t16.calc.Optimization;
import com.tripco.t16.planner.Place;
import com.tripco.t16.planner.Unit;
import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Random;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

@RunWith(JUnit4.class)
public class TestOptimization {

  private Random rand = new Random();

  private ArrayList<Place> places;
  private ArrayList<Place> expectedPlaces;
  private Place A, B, C, D, E, F, G, H, I;
  private Place[] distPlaces;
  private ArrayList<Place> hex;

  @Test
  public void testZero() {
    ArrayList<Place> places = new ArrayList<>();
    ArrayList<Place> output = new ArrayList<>();
    assertEquals(Optimization.optimize(places, Unit.miles.radius, 1),
        output);
  }

  @Test
  public void testDegenerateCases() {
    ArrayList<Place> places = new ArrayList<>();
    ArrayList<Place> output = new ArrayList<>();
    Place p = makeRandomPlace();
    output.add(p);
    places.add(p);
    assertEquals(Optimization.optimize(places, Unit.miles.radius, 1),
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

    assertEquals(Optimization.optimize(places, Unit.miles.radius, 1),
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
    assertEquals(Optimization.optimize(places, DistanceCalculator.EARTH_RADIUS_MI, 1),
        output);

  }

  @Test
  public void testCrossCase() {
    ArrayList<Place> places = new ArrayList<>();
    places.add(makeFrom(DistanceCalculator.COLORADO_TOP, DistanceCalculator.COLORADO_LEFT));
    places.get(0).name = "TOP LEFT";
    places.add(makeFrom(DistanceCalculator.COLORADO_BOTTOM, DistanceCalculator.COLORADO_RIGHT));
    places.get(1).name = "BOTTOM RIGHT";
    places.add(makeFrom(DistanceCalculator.COLORADO_TOP, DistanceCalculator.COLORADO_RIGHT));
    places.get(2).name = "TOP RIGHT";
    places.add(makeFrom(DistanceCalculator.COLORADO_BOTTOM, DistanceCalculator.COLORADO_LEFT));
    places.get(3).name = "BOTTOM LEFT";

    System.out.println(places);
    ArrayList<Place> results = Optimization.optimize(places, Unit.miles.radius, 2);
    for (Place place : results) {
      System.out.println(place.name);
    }

    // check that 2 opt returns an uncrossed version of the trip
    assertEquals("TOP LEFT", results.get(0).name);
    assertEquals("BOTTOM LEFT", results.get(1).name);
    assertEquals("BOTTOM RIGHT", results.get(2).name);
    assertEquals("TOP RIGHT", results.get(3).name);

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

  @Test
  public void testGetOptimizations() {
    ArrayList<Optimization> opts = new ArrayList<>();
    opts.add(Optimization.THREE_OPT);
    opts.add(Optimization.TWO_OPT);
    opts.add(Optimization.NEAREST_NEIGHBOR);
    assertEquals(opts, Optimization.getOptimizations());
  }

  @Before
  public void setup() {
    places = new ArrayList<>();
    A = makeFrom(36.452622, -111.563992);
    A.name = "A";
    B = makeFrom(36.427323, -104.783213);
    B.name = "B";
    C = makeFrom(39.357093, -102.344248);
    C.name = "C";
    D = makeFrom(42.357093, -104.783213);
    D.name = "D";
    E = makeFrom(42.357093, -111.563992);
    E.name = "E";
    F = makeFrom(39.357093, -113.563992);
    F.name = "F";
    G = new Place();
    G.name = "G";
    H = new Place();
    H.name = "H";
    I = new Place();
    I.name = "I";

    hex = new ArrayList<>();
    hex.add(A);
    hex.add(B);
    hex.add(C);
    hex.add(D);
    hex.add(E);
    hex.add(F);

    expectedPlaces = new ArrayList<>();

  }

  @Test
  public void test3OptCase0() {
    makeHex();
    makeDist(places);

    Place[] results = Optimization.threeOptNotShit(distPlaces,
        Optimization.calculateDistanceMatrix(distPlaces, Unit.miles.radius),
        Optimization.createLookupTable(places.size()));

    assertEquals(hex, new ArrayList<>(Arrays.asList(results)));
  }


  @Test
  public void test3OptCase1() {
    places.add(A);
    places.add(E);
    places.add(D);
    places.add(C);
    places.add(B);
    places.add(F);
    assertHex();
  }

  @Test
  public void test3OptCase2() {
    places.add(A);
    places.add(C);
    places.add(B);
    places.add(D);
    places.add(E);
    places.add(F);
    assertHex();
  }

  @Test
  public void test3OptCase3() {
    places.add(A);
    places.add(B);
    places.add(C);
    places.add(E);
    places.add(D);
    places.add(F);
    assertHex();
  }

  private void assertHex() {
    makeDist(places);

    Place[] results = Optimization.threeOptNotShit(distPlaces,
        Optimization.calculateDistanceMatrix(distPlaces, Unit.miles.radius),
        Optimization.createLookupTable(places.size()));

    assertEquals(hex, new ArrayList<>(Arrays.asList(results)));
  }

  @Test
  public void test3OptCase4() {
    places.add(A);
    places.add(E);
    places.add(D);
    places.add(B);
    places.add(C);
    places.add(F);
    assertHex();
  }


  @Test
  public void test3OptCase5() {
    places.add(A);
    places.add(D);
    places.add(E);
    places.add(C);
    places.add(B);
    places.add(F);
    assertHex();
  }


@Test public void testExchange5() {
  places.add(A);
  places.add(B);
  places.add(C);
  places.add(D);
  places.add(E);
  places.add(F);
  makeDist(places);

  Optimization.exchange(distPlaces, Optimization.createLookupTable(places.size()), 0, 2, 4, 5);

  expectedPlaces.add(A);
  expectedPlaces.add(E);
  expectedPlaces.add(D);
  expectedPlaces.add(B);
  expectedPlaces.add(C);
  expectedPlaces.add(F);

  assertEquals(expectedPlaces, new ArrayList<>(Arrays.asList(distPlaces)));
}

  @Test
  public void testExchange5Big() {
    makeBig();
    makeDist(places);
    Optimization.exchange(distPlaces, Optimization.createLookupTable(places.size()), 2, 5, 7, 5);

    expectedPlaces.add(A);
    expectedPlaces.add(B);
    expectedPlaces.add(C);
    expectedPlaces.add(H);
    expectedPlaces.add(G);
    expectedPlaces.add(D);
    expectedPlaces.add(E);
    expectedPlaces.add(F);
    expectedPlaces.add(I);

    assertEquals(expectedPlaces, new ArrayList<>(Arrays.asList(distPlaces)));
  }

  private void makeBig() {
    places.add(A);
    places.add(B);
    places.add(C);
    places.add(D);
    places.add(E);
    places.add(F);
    places.add(G);
    places.add(H);
    places.add(I);
  }

  private void makeHex() {
    places.add(A);
    places.add(B);
    places.add(C);
    places.add(D);
    places.add(E);
    places.add(F);
  }

  @Test
  public void test3OptCase6() {
    makeHex();
    makeDist(places);
    Optimization.exchange(distPlaces, Optimization.createLookupTable(places.size()), 0, 2, 4, 6);

    places.add(A);
    places.add(B);
    places.add(C);
    places.add(E);
    places.add(D);
    places.add(F);
  }

  @Test
  public void test3OptCase6Big() {
    makeBig();
    makeDist(places);
    Optimization.exchange(distPlaces, Optimization.createLookupTable(places.size()), 2, 5, 7, 6);

    expectedPlaces.add(A);
    expectedPlaces.add(B);
    expectedPlaces.add(C);
    expectedPlaces.add(G);
    expectedPlaces.add(H);
    expectedPlaces.add(F);
    expectedPlaces.add(E);
    expectedPlaces.add(D);
    expectedPlaces.add(I);
    assertEquals(expectedPlaces, new ArrayList<>(Arrays.asList(distPlaces)));
  }


  private void makeDist(ArrayList<Place> places) {
    distPlaces = new Place[places.size()];
    for (int i = 0; i < places.size(); ++i) {
      distPlaces[i] = places.get(i);
    }
  }

  @Test
  public void test3OptCase7() {
    makeHex();
    makeDist(places);
    Optimization.exchange(distPlaces, Optimization.createLookupTable(places.size()), 0, 2, 4, 7);

    expectedPlaces.add(A);
    expectedPlaces.add(D);
    expectedPlaces.add(E);
    expectedPlaces.add(B);
    expectedPlaces.add(C);
    expectedPlaces.add(F);

    assertEquals(expectedPlaces, new ArrayList<>(Arrays.asList(distPlaces)));
  }

  @Test
  public void test3OptCase7Big() {
    makeBig();
    makeDist(places);
    Optimization.exchange(distPlaces, Optimization.createLookupTable(places.size()), 2, 5, 7, 7);

    expectedPlaces.add(A);
    expectedPlaces.add(B);
    expectedPlaces.add(C);
    expectedPlaces.add(G);
    expectedPlaces.add(H);
    expectedPlaces.add(D);
    expectedPlaces.add(E);
    expectedPlaces.add(F);
    expectedPlaces.add(I);

    assertEquals(expectedPlaces, new ArrayList<>(Arrays.asList(distPlaces)));
  }


}
