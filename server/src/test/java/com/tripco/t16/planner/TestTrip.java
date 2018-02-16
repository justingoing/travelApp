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
  public void testNormalization() {
    assertEquals(1, (long)trip.normalizeLat(37)); // make sure that max lat goes to 1
    assertEquals(0, (long)trip.normalizeLat(41)); // make sure min lat goes to 0
    assertEquals(1, (long)trip.normalizeLong(-102.05)); // make sure that max long goes to 1
    assertEquals(0, (long)trip.normalizeLong(-109.05)); // make sure that min long goes to 0

  }
}
