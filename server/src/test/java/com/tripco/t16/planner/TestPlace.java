package com.tripco.t16.planner;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

import java.util.ArrayList;
import java.util.Collections;

import static org.junit.Assert.*;

/*
  This class contains tests for the Place class.
 */
@RunWith(JUnit4.class)
public class TestPlace {
  private Place place;
  @Before
  public void setup() {
    place = new Place();
    place.longitude = "1234";
    place.latitude = "5678";
    place.name = "name";
    place.id = "plc";
    place.extraAttrs.put("key", "attr");
  }

  @Test
  public void testConstructor() {
    Place place2 = new Place(place);

    assertEquals(place.latitude, place2.latitude);
    assertEquals(place.longitude, place2.longitude);
    assertEquals(place.name, place2.name);
    assertEquals(place.id, place2.id);
    assertEquals(place.extraAttrs, place2.extraAttrs);
  }
}