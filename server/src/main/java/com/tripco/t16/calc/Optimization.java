package com.tripco.t16.calc;


import com.tripco.t16.planner.Place;
import com.tripco.t16.planner.Trip;

import java.util.ArrayList;
import java.util.Arrays;

/**
 * Code to optimize trips, based on graph algorithms, like nearest-neighbor, two-opt, and
 * three-opt.
 *
 * @author Samuel Kaessner
 */
public class Optimization {

  /**
   * Implements the nearest-neighbor graph algorithm.
   */
  public static ArrayList<Place> nearestNeighbor(final ArrayList<Place> places, double radius) {
    //Quick sanity check
    if (places == null || places.size() == 0) {
      return places;
    }

    //O(N) - Creates a place record array based on the places
    PlaceRecord[] placesArray = new PlaceRecord[places.size()];
    for (int i = 0; i < places.size(); i++) {
      placesArray[i] = new PlaceRecord(places.get(i));
    }

    //Get the distances between each place.
    int[][] distanceMatrix = calculateDistanceMatrix(placesArray, radius);

    ArrayList<Place> bestPlaces = new ArrayList<>();
    int bestDistance = Integer.MAX_VALUE;

    //Try the nearest neighbor algorithm, starting from each city
    for (int startLoc = 0; startLoc < placesArray.length; startLoc++) {
      ArrayList<Place> tmpPlaces = new ArrayList<>();
      int distance = 0;

      // Set current index to our start id.
      int currentIndex = startLoc;

      //Add starting position.
      tmpPlaces.add(placesArray[startLoc].place);
      placesArray[startLoc].visited = true;

      // Run the nearest-neighbor algorithm (places.size - 1) times
      int iterationCounter = 0;
      while (iterationCounter < (placesArray.length)) {
        //Find closest neighbor
        PlaceRecord nearestNeighbor = null;
        int closest = Integer.MAX_VALUE;
        int id = -1;

        //Loop through and find the closest, unvisited place
        for (int j = 0; j < distanceMatrix[currentIndex].length; j++) {
          //Find the closest place that isn't visited.
          if (distanceMatrix[currentIndex][j] < closest &&
              !placesArray[j].visited) {
            closest = distanceMatrix[currentIndex][j];
            nearestNeighbor = placesArray[j];
            id = j;
          }
        }

        // Go to nearest neighbor and update
        if (nearestNeighbor != null) {
          currentIndex = id;
          tmpPlaces.add(nearestNeighbor.place);
          placesArray[id].visited = true;
          distance += closest;
        }
        iterationCounter++;
      }

      //Add in the final leg of the trip:
      distance += getDistanceBetween(tmpPlaces.get(0),
          tmpPlaces.get(tmpPlaces.size() - 1), radius);

      // Check if the *entire trip* is shorter than our
      // best found trip, and if so, update.
      if (distance < bestDistance) {
        bestDistance = distance;
        bestPlaces = tmpPlaces;
      }

      // Reset the visited flags
      for (PlaceRecord record : placesArray) {
        record.visited = false;
      }
    }

    return bestPlaces;
  }

  private static int getDistanceBetween(Place p1, Place p2, double radius) {
    return DistanceCalculator.calculateGreatCircleDistance(
        Trip.convertToDecimal(p1.latitude),
        Trip.convertToDecimal(p1.longitude),
        Trip.convertToDecimal(p2.latitude),
        Trip.convertToDecimal(p2.longitude), radius);
  }

  /**
   * O(N^2) - where N is the size of records. Calculates the great-circle distances between each
   * pair of cities.
   *
   * @return - a matrix
   */
  private static int[][] calculateDistanceMatrix(PlaceRecord[] records, double radius) {
    int[][] distanceMatrix = new int[records.length][records.length];

    //Calculate all the distances
    for (int i = 0; i < distanceMatrix.length; i++) {
      for (int j = i; j < distanceMatrix[i].length; j++) {

        // Set diagonals to zero
        if (i == j) {
          distanceMatrix[i][j] = 0;
          continue;
        }

        // Calculate great circle distance.
        int distance = getDistanceBetween(records[i].place, records[j].place, radius);
        distanceMatrix[i][j] = distance;
        distanceMatrix[j][i] = distance;
      }
    }

    return distanceMatrix;
  }

  public static ArrayList<Place> TwoOpt(final ArrayList<Place> places, double radius) {
    // Get a starting nearest neighbor that we can further optimize
    ArrayList<Place> trip = nearestNeighbor(places, radius);
/*
    repeat until no improvement is made {
    start_again:
    best_distance = calculateTotalDistance(existing_route)
    for (i = 1; i < number of nodes eligible to be swapped - 1; i++) {
      for (k = i + 1; k < number of nodes eligible to be swapped; k++) {
        new_route = 2optSwap(existing_route, i, k)
        new_distance = calculateTotalDistance(new_route)
        if (new_distance < best_distance) {
          existing_route = new_route
                   goto start_again
        }
      }
    }
  }*/

    ArrayList<Place> cur_route = trip;
    boolean improved = true;

    while (improved) {
      int best_distance = Optimization.getTripDistance(cur_route, radius);
      improved = false;

      for (int i = 0; i < trip.size() - 1; ++i) {
        for (int k = i + 1; k < trip.size() - 1; ++k) {
          Place[] cur_arr = new Place[cur_route.size()];
          cur_arr = cur_route.toArray(cur_arr);
          ArrayList<Place> new_route = new ArrayList<Place>(
              Arrays.asList(Optimization.TwoOptSwap(cur_arr, i, k)));
          int new_distance = Optimization.getTripDistance(new_route, radius);

          if (new_distance < best_distance) {
            cur_route = new_route;
            improved = true;
          }
        }
      }
    }

    return cur_route;
  }

  /**
   * Do the meat and taters of the 2 opt algo
   *
   * @param route The route we want to swap
   * @param i Start
   * @param k End
   */
  public static Place[] TwoOptSwap(Place[] route, int i, int k) {
    //1. take route[0] to route[i-1] and add them in order to new_route
    //2. take route[i] to route[k] and add them in reverse order to new_route
    //3. take route[k+1] to end and add them in order to new_route
    //return new_route;
    Place[] new_route = new Place[route.length];

    for (int start = 0; start <= i - 1; ++start) {
      new_route[start] = route[start];
    }

    for (int mid = i; mid <= k; ++mid) {
      new_route[k - (mid - i)] = route[mid];
    }

    for (int last = k + 1; last < route.length; ++last) {
      new_route[last] = route[last];
    }

    return new_route;
  }

  public static int getTripDistance(ArrayList<Place> places, double radius) {
    //Quick sanity check
    if (places == null || places.size() == 0) {
      return 0;
    }

    //O(N) - Creates a place record array based on the places
    PlaceRecord[] placesArray = new PlaceRecord[places.size()];
    for (int i = 0; i < places.size(); i++) {
      placesArray[i] = new PlaceRecord(places.get(i));
    }

    //Get the distances between each place.
    int[][] distanceMatrix = calculateDistanceMatrix(placesArray, radius);

    int dist = 0;
    for (int i = 0; i < distanceMatrix.length - 1; ++i) {
      dist += distanceMatrix[i + 1][i];
    }

    dist += distanceMatrix[0][1];
    return dist;
  }


  /**
   * Holds a place and a record of whether or not we have visited this.
   */
  private static class PlaceRecord {

    private final Place place;
    private boolean visited;

    private PlaceRecord(Place place) {
      this.place = place;
    }
  }
}
