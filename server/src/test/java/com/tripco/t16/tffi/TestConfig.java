package com.tripco.t16.tffi;

import com.tripco.t16.calc.Optimization;
import com.tripco.t16.planner.map.Map;
import com.tripco.t16.planner.Unit;
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
    ArrayList<Optimization> optimizations = Optimization.getOptimizations();
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
    //String test = "{\"type\":\"config\",\"version\":4,\"filters\":[{\"attribute\":\"airports.type\",\"values\":[\"heliport\",\"small_airport\",\"seaplane_base\",\"closed\",\"balloonport\",\"medium_airport\",\"large_airport\"]},{\"attribute\":\"airports.continent\",\"values\":[\"Africa\",\"Antartica\",\"Asia\",\"Europe\",\"North America\",\"Oceania\",\"South America\"]}],\"maps\":[\"svg\",\"kml\"],\"optimization\":0,\"optimizations\":[],\"units\":[\"kilometers\",\"miles\",\"nautical miles\",\"user defined\"]}";
    String test = "{\"type\":\"config\",\"version\":4,\"filters\":[{\"attribute\":\"airports.type\","
        + "\"values\":[\"heliport\",\"small_airport\",\"seaplane_base\",\"closed\",\"balloonport\","
        + "\"medium_airport\",\"large_airport\"]},{\"attribute\":\"continents.name\",\"values\":"
        + "[\"Africa\",\"Antartica\",\"Asia\",\"Europe\",\"North America\",\"Oceania\",\"South America\"]}],"
        + "\"maps\":[\"svg\",\"kml\"],\"optimization\":3,"
        + "\"optimizations\":[{\"label\":\"3-opt\",\"description\":\""
        + "Three-opt improves upon 2-opt by considering an additional pair (3 total) of edges, and "
        + "seeing if any swaps of those edges make the trip shorter.\"},{\"label\":\"2-opt\","
        + "\"description\":\"Two-opt improves upon nearest-neighbor by swapping each pair of edges, "
        + "and seeing if the swap makes the trip shorter.\"},{\"label\":\"nearest-neighbor\","
        + "\"description\":\"Nearest neighbor optimizes the path by choosing the nearest city when "
        + "deciding which city to go to next.\"}],\"units\":[\"kilometers\",\"miles\","
        + "\"nautical miles\",\"user defined\"]}";
    Config test1 = new Config();
    String testJson = test1.getConfig();
    System.out.println(testJson);

    assertEquals(test, testJson);
  }
}
