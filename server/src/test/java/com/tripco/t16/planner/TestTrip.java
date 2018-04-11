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
    trip.plan();
    assertTrue(true == true);
  }

  /*
  @Test
  public void testDistances() {
    trip.plan();
    ArrayList<Integer> expectedDistances = new ArrayList<Integer>();
    Collections.addAll(expectedDistances, 0, 0);
    System.out.println(expectedDistances.toString());
    // Call the equals() method of the first object on the second object.
    assertEquals(expectedDistances, trip.distances);
  }
*/
  @Test
  /**
   * Make sure that files in our resources folder load properly
   */
  public void testResources() {
    assertNotEquals(trip.defaultSVG, trip.getSVGFromFile("/colorado.svg"));
  }

  @Test
  public void testNormalization() {
    assertEquals(0, (long) trip.normalizeLat(90)); // make sure that max lat goes to 1
    assertEquals(1, (long) trip.normalizeLat(-90)); // make sure min lat goes to 0
    assertEquals(1, (long) trip.normalizeLong(180)); // make sure that max long goes to 1
    assertEquals(0, (long) trip.normalizeLong(-180)); // make sure that min long goes to 0
  }

  @Test
  public void testLatLong() {
    //valid
    assertTrue(trip.validateLatLong("40° 35' 6.9288\" N")); //degrees minutes seconds w/ direction
    assertTrue(trip.validateLatLong("105° 5' 3\" W"));
    assertTrue(trip.validateLatLong("40.446° N")); //decimal degrees w/ direction
    assertTrue(trip.validateLatLong("79.982° W"));
    assertTrue(trip.validateLatLong("40.445")); //decimal degrees only
    assertTrue(trip.validateLatLong("-79.982"));
    assertTrue(trip.validateLatLong("40° 35.568' N")); //decimal degrees w/ decimal on minutes
    assertTrue(trip.validateLatLong("105° 35.56' W"));
    assertTrue(trip.validateLatLong("40º 35′ 6.9288″ W")); //tests prime symbols and ordinal indicator

    //invalid
    assertFalse(trip.validateLatLong("HELLO"));
    assertFalse(trip.validateLatLong("104 5 5"));

  }


  private static final double delta = 0.01;
  @Test
  public void testDecimalConversion() {
    //degrees minutes seconds
    assertEquals(40.58526, trip.convertToDecimal("40° 35' 6.9288\" N"), delta);

    //floating point numbers valid
    assertEquals(-79.982, trip.convertToDecimal("-79.982"), delta);

    //west returns a negative and just degrees minutes
    assertEquals(-105.5927, trip.convertToDecimal("105° 35.56' W"), delta);

    //just degrees and direction
    assertEquals(39.7392, trip.convertToDecimal("39.7392° N"), delta);

    //also works with the weird characters
    assertEquals(-40.58526, trip.convertToDecimal("40º 35′ 6.9288″ W"), delta);
  }

}
