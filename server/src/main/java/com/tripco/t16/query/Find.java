package com.tripco.t16.query;

import com.tripco.t16.planner.Place;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

/**
 * The Find class supports TFFI so it can easily be converted to/from Json by Gson. Used for
 * receiving a TFFI request of type 'find'
 *
 * @author Isaac Gentz
 */
public class Find {
  //SQL requirements
  private String driver = "com.mysql.jdbc.Driver";
  private String url = "jdbc:mysql://faure.cs.colostate.edu/cs314";
  private String dbId = "ikegentz";
  private String dbPass = "831204074";

  private final static String lookup = "SELECT * FROM airports WHERE ";

  public final static String emptyQuery = "NO RESULTS FOR THIS QUERY";
  public final static String injectionMessage = "WARNING: POTENTIAL SQL INJECTION ATTACK!";

  private static boolean isInputGood(String sanitize) {
    return sanitize.matches("[a-zA-Z0-9]+");
  }

  /**
   * Creates a Find object with default database.
   */
  public Find() {
  }

  /**
   * Creates a new Find object with the given setup.
   *
   * @param driver - Database driver.
   * @param url - URL of the database.
   * @param dbId - Username to login to the database.
   * @param dbPass - Password to login to the database.
   */
  public Find(String driver, String url, String dbId, String dbPass) {
    this.driver = driver;
    this.url = url;
    this.dbId = dbId;
    this.dbPass = dbPass;
  }


  /**
   * Queries the database with the given parameter and returns a json string representation of the
   * places.
   *
   * @param query What we are searching for
   */
  private void queryDB(Query query, String user, String password, boolean shouldPrint) {
    try {
      Class.forName(driver);

      String queryString = query.query = "\'%" + query.query + "%\'";
      String searchLookup = lookup + "id LIKE " + query.query
          + " OR name LIKE " + query.query
          + " OR municipality LIKE " + query.query
          + " OR keywords LIKE " + query.query  + ";";

      System.out.println(searchLookup);

      try (Connection conn = DriverManager.getConnection(url, user, password);
          Statement stCount = conn.createStatement();
          Statement stQuery = conn.createStatement();
          ResultSet rsCount = stCount.executeQuery(searchLookup);
          ResultSet rsQuery = stQuery.executeQuery(searchLookup)
      ) {
        try {
          if (!shouldPrint) {
            addPlaces(rsQuery, query);
          } else {
            printJSON(rsCount, rsQuery);
          }
        } catch (SQLException e) {
          System.out.println(Find.emptyQuery);
          return;
        }
      }
    } catch (Exception e) {
      e.printStackTrace();
    }
  }

  /**
   * Add the places to this find object base on the SQL query so we can return to the client.
   *
   * @param query The results themselves
   * @throws SQLException If something goes wrong when talking to the database
   */
  private void addPlaces(ResultSet query, Query tffiQuery) throws SQLException {
    tffiQuery.places = new ArrayList<>();

    while (query.next()) {
      Place pl = new Place();
      //Add essential place information for planning
      pl.id = query.getString("id");
      pl.name = query.getString("name");
      pl.latitude = query.getString("latitude");
      pl.longitude = query.getString("longitude");

      //Add additional place information
      pl.extraAttrs.put("type", query.getString("type"));
      pl.extraAttrs.put("elevation", query.getString("elevation"));
      pl.extraAttrs.put("continent", query.getString("continent"));
      pl.extraAttrs.put("iso_country", query.getString("iso_country"));
      pl.extraAttrs.put("iso_region", query.getString("iso_region"));
      pl.extraAttrs.put("municipality", query.getString("municipality"));
      pl.extraAttrs.put("scheduled_service", query.getString("scheduled_service"));
      pl.extraAttrs.put("gps_code", query.getString("gps_code"));
      pl.extraAttrs.put("iata_code", query.getString("iata_code"));
      pl.extraAttrs.put("local_code", query.getString("local_code"));
      pl.extraAttrs.put("home_link", query.getString("home_link"));
      pl.extraAttrs.put("wikipedia_link", query.getString("wikipedia_link"));
      pl.extraAttrs.put("keywords", query.getString("keywords"));

      tffiQuery.places.add(pl);
    }
  }

  /**
   * Prints out the json representation of the results of an SQL query.
   *
   * @param count Number of results
   * @param query The query results themselves
   * @throws SQLException In case something goes wrong when contacting the db
   */
  public static void printJSON(ResultSet count, ResultSet query) throws SQLException {
    System.out.printf("\n{\n");
    System.out.printf("\"type\": \"find\",\n");
    System.out.printf("\"places\": [\n");

    // determine the number of results that match the query
    count.next();
    int results = count.getInt(1);

    // print out the json representation of the query
    while (query.next()) {
      System.out.printf("\t{");
      System.out.printf(" \"%s\",", query.getString("id"));
      System.out.printf(" \"%s\",", query.getString("type"));
      System.out.printf(" \"%s\",", query.getString("name"));
      System.out.printf(" \"%s\",", query.getString("latitude"));
      System.out.printf(" \"%s\",", query.getString("longitude"));
      System.out.printf(" \"%s\",", query.getString("elevation"));
      System.out.printf(" \"%s\",", query.getString("continent"));
      System.out.printf(" \"%s\",", query.getString("iso_country"));
      System.out.printf(" \"%s\",", query.getString("iso_region"));
      System.out.printf(" \"%s\",", query.getString("municipality"));
      System.out.printf(" \"%s\",", query.getString("scheduled_service"));
      System.out.printf(" \"%s\",", query.getString("gps_code"));
      System.out.printf(" \"%s\",", query.getString("iata_code"));
      System.out.printf(" \"%s\",", query.getString("local_code"));
      System.out.printf(" \"%s\",", query.getString("home_link"));
      System.out.printf(" \"%s\",", query.getString("wikipedia_link"));
      System.out.printf(" \"%s\"", query.getString("keywords"));
      System.out.printf("}");

      if (--results == 0) {
        System.out.printf("\n");
      } else {
        System.out.printf(",\n");
      }
    }
    System.out.printf(" ]\n}\n");
  }

  /**
   * Populate our object with information from the query so that we can convert back to json.
   */
  public void performQuery(Query query, boolean shouldPrint) {
    if (!Find.isInputGood(query.query)) {
      query.places = new ArrayList<>();
      System.out.println(Find.injectionMessage);
      return;
    }

    this.queryDB(query, dbId, dbPass, shouldPrint);
  }
}
