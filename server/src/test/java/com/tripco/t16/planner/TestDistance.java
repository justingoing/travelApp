package com.tripco.t16.planner;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

import java.util.ArrayList;
import java.util.Collections;

import static org.junit.Assert.*;

/*
  This class contains tests for the Distance class.
 */
@RunWith(JUnit4.class)
public class TestDistance {

  @Test
  public void testConstructor() {

    Distance d = new Distance();
    d.name = "name";
    d.radius = 10f;

    assertEquals(d.radius, 10, 0.00001f);
    assertEquals(d.name, "name");
  }
}