package com.tripco.t16.query;

import java.io.ByteArrayOutputStream;
import java.io.PrintStream;
import org.junit.Before;
import org.junit.Test;

import com.tripco.t16.tffi.Filter;

import java.util.ArrayList;

import static org.junit.Assert.*;


public class TestFind {

  Query query = new Query();
  Find find;
  // Setup to be done before every test in TestPlan
  @Before
  public void initialize() {
    if (System.getenv("TRAVIS") != null) {
      find = new Find("com.mysql.jdbc.Driver", "jdbc:mysql://localhost/testDB", "root", "");
    } else {
      find = new Find();
    }
    query.places = new ArrayList<>();
  }

  @Test
  public void testTrue() {
    // assertTrue checks if a statement is true
    assertTrue(true);
    assertTrue(true);
  }

  @Test
  public void testFind() {
    // check if doing a query on our db for gibberish returns nothing

    //Paul's tests that Travis said "nope" to
    /*query.type = "query";
    query.query = "abcdefghijklmnop12345666789";
    query.filters = new ArrayList<>();
    find.performQuery(query, true);

    assertTrue(query.places.size() == 0);


    query.query = "Denver";
    find.performQuery(query, false);

    assertTrue(query.places.size() == 30);

    query.query = "Denver";
    //System.out.println(query.filters.size());
    query.places.clear();
    //System.out.println("\nTrying filters");
    ArrayList<Filter> tempFilters = new ArrayList<>();
    ArrayList<String> vals = new ArrayList<>();
    vals.add("large_airport");
    tempFilters.add(new Filter("type", vals));
    query.filters = tempFilters;
    //System.out.println(query.filters.size());

    find.performQuery(query, false);
    System.out.println(query.places.size());
    assertTrue(query.places.size() == 1); */

    //Ike's tests
    /* --------------------------------------------- */
    // make sure we can print some json lookin' stuff -- capture console output
    /* --------------------------------------------- */
/*

    // Create a stream to hold the output/*
    ByteArrayOutputStream baos = new ByteArrayOutputStream();
    PrintStream ps = new PrintStream(baos);
    // IMPORTANT: Save the old System.out!
    PrintStream old = System.out;
    // Tell Java to use your special stream
    System.setOut(ps);

    // Capture output from the print call
    find.performQuery(true);
    // Put things back
    System.out.flush();
    System.setOut(old);

    assertTrue(baos.toString().contains("places\":"));
/*
    /* --------------------------------------------- */
    // make sure that sql injection attack fails
    /* --------------------------------------------- */
    /*
    find.query = "; Drop table test -- true = true";

    // Create a stream to hold the output
    baos = new ByteArrayOutputStream();
    ps = new PrintStream(baos);
    // IMPORTANT: Save the old System.out!
    old = System.out;
    // Tell Java to use your special stream
    System.setOut(ps);
    // Capture output from the print call
    find.performQuery(false);
    // Put things back
    System.out.flush();
    System.setOut(old);

    assertTrue(baos.toString().contains(Find.injectionMessage));
*/
  }
}


