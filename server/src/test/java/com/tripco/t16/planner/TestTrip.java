package com.tripco.t16.planner;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

import java.util.ArrayList;
import java.util.Collections;

import static org.junit.Assert.*;

/*
  This class contains tests for the Trip class.
 */
@RunWith(JUnit4.class)
public class TestTrip {
  Trip trip;

  // Setup to be done before every test in TestPlan
  @Before
  public void initialize() {
    trip = new Trip();
    trip.places = new ArrayList<Place>();
    Place test = new Place();
    test.id = "dnvr";
    test.name = "Denver";
    test.latitude = "39.7392° N";
    test.longitude = "104.9903° W";
    trip.places.add(test);
    trip.places.add(test);
  }

  @Test
  public void testTrue() {
    // assertTrue checks if a statement is true
    assertTrue(true == true);
  }

  @Test
  public void testDistances() {
    trip.plan();
    ArrayList<Integer> expectedDistances = new ArrayList<Integer>();
    Collections.addAll(expectedDistances, 12, 23, 34, 45, 65, 19);
    // Call the equals() method of the first object on the second object.
    assertEquals(expectedDistances, trip.distances);
  }

  @Test
  /**
   * Make sure that files in our resources folder load properly
   */
  public void testResources() {
    assertNotEquals(trip.defaultSVG, trip.getSVGFromFile("/colorado.svg"));
    assertNotEquals(trip.defaultSVG, trip.getSVGFromFile("/borders.svg"));
  }

  @Test
  public void testLatLong() {
    //valid
    assertTrue(trip.validateLatitude("40° 35' 6.9288\" N"));
    assertTrue(trip.validateLongitude("105° 5' 3\" W"));

    //invalid
    assertFalse(trip.validateLatitude("HELLO"));
    assertFalse(trip.validateLongitude("104 5 5"));

  }
}
