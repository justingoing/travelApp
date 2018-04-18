package com.tripco.t16.planner;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

import java.util.ArrayList;
import java.util.Collections;

import static org.junit.Assert.*;

/*
  This class contains tests for the Unit class.
 */
@RunWith(JUnit4.class)
public class TestUnit {

  private Unit unit;

  @Before
  public void setup() {
    unit = new Unit("unit", 10);
    assertEquals("unit", unit.name);
    assertEquals(10, unit.radius, 0.00001f);
  }

  @Test
  public void testGetUnits() {
    ArrayList<String> strings = Unit.getUnits();
    assertTrue(strings.contains(Unit.miles.name));
    assertTrue(strings.contains(Unit.kilometers.name));
    assertTrue(strings.contains("user defined"));
  }
}
