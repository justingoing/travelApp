package com.tripco.t16.planner;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

import java.util.ArrayList;
import java.util.Collections;

import static org.junit.Assert.*;

/*
  This class contains tests for the Option class.
 */
@RunWith(JUnit4.class)
public class TestOption {
  private Option option = new Option();

  @Before
  public void setup() {
    option.userUnit = "unit";
    option.userRadius = "10";
    option.optimization = "1";
    option.map = "map";
  }

  @Test
  public void testConstructor() {
    assertEquals(option.userUnit, "unit");
    assertEquals(option.userRadius, "10");
    assertEquals(option.optimization, "1");
    assertEquals(option.map, "map");
    assertEquals(option.distance, null);
  }

  @Test
  public void testGetStuff() {
    assertEquals(Float.valueOf(option.optimization),
        option.getOptimizationLevel(), 0.00001f);
    assertEquals(option.getUnitRadius(),
        Unit.miles.radius, 0.00001f);
    assertEquals("miles", option.getUnitName());

    option.distance = "miles";
    assertEquals(option.getUnitRadius(),
        Unit.miles.radius, 0.00001f);
    assertEquals("miles", option.getUnitName());

    option.distance = "kilometers";
    assertEquals(option.getUnitRadius(),
        Unit.kilometers.radius, 0.00001f);
    assertEquals("kilometers", option.getUnitName());

    option.distance = "user defined";
    assertEquals(option.getUnitRadius(), 10f, 0.00001f);
    assertEquals(option.getUnitName(), "unit");

    option.distance = "error";
    assertEquals(option.getUnitRadius(),
        Unit.miles.radius, 0.00001f);
    assertEquals("miles", option.getUnitName());

    option.optimization = null;
    assertEquals(option.getOptimizationLevel(), 0, 0.00001f);

  }
}
