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

  public String type;
  public String query;
  public ArrayList<Place> places;

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
  public Find() {}

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
  private void queryDB(String query, String user, String password, boolean shouldPrint) {
    try {
      Class.forName(driver);

      query = "\'%" + query + "%\'";
      String searchLookup = lookup + "id LIKE " + query
          + " OR name LIKE " + query
          + " OR municipality LIKE " + query
          + " OR keywords LIKE " + query + ";";

      System.out.println(searchLookup);

      try (Connection conn = DriverManager.getConnection(url, user, password);
          Statement stCount = conn.createStatement();
          Statement stQuery = conn.createStatement();
          ResultSet rsCount = stCount.executeQuery(searchLookup);
          ResultSet rsQuery = stQuery.executeQuery(searchLookup)
      ) {
        try {
          if (!shouldPrint) {
            addPlaces(rsQuery);
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
  private void addPlaces(ResultSet query) throws SQLException {
    this.places = new ArrayList<>();

    while (query.next()) {
      Place pl = new Place();
      pl.id = query.getString("id");
      pl.name = query.getString("name");
      pl.latitude = query.getString("latitude");
      pl.longitude = query.getString("longitude");

      this.places.add(pl);
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
  public void performQuery(boolean shouldPrint) {
    if(!Find.isInputGood(this.query))
    {
      this.places = new ArrayList<>();
      System.out.println(Find.injectionMessage);
      return;
    }

    this.queryDB(this.query, dbId, dbPass, shouldPrint);
  }
}
