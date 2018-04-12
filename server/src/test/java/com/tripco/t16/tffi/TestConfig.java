package com.tripco.t16.tffi;

import com.google.gson.Gson;
import com.tripco.t16.calc.Optimization;
import com.tripco.t16.planner.Map;
import com.tripco.t16.planner.Unit;
import java.lang.reflect.Array;
import java.util.ArrayList;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

import static org.junit.Assert.*;

@RunWith(JUnit4.class)
public class TestConfig {
  @Test
  public void testConstructor(){
    Config test = new Config();
    test.type = "config";
    test.version = TFFI.VERSION;
    test.filters = Filter.getFilters();
    test.maps = Map.getMaps();
    ArrayList<Optimization> optimizations = new ArrayList<>();
    test.optimization = optimizations.size();
    test.optimizations = optimizations;
    test.units = Unit.getUnits();

    Config test1 = new Config();

    assertEquals(test.type, test1.type);
    assertEquals(test.version, test1.version);
    assertEquals(test.filters, test1.filters);
    assertEquals(test.maps, test1.maps);
    assertEquals(test.optimizations, test1.optimizations);
    assertEquals(test.optimization, test1.optimization);
    assertEquals(test.units, test1.units);
  }

  @Test
  public void testGetConfig(){
    String test = "{\"type\":\"config\",\"version\":3,\"filters\":[],\"maps\":[\"svg\",\"kml\"],\"optimization\":0,\"optimizations\":[],\"units\":[\"kilometers\",\"miles\",\"nautical miles\",\"user defined\"]}";

    Config test1 = new Config();
    String testJson = test1.getConfig();

    assertEquals(test, testJson);
  }
}
