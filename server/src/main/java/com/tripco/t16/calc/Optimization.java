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

  /**
   * Runs 2 opt on a nearest neighbor TSP.
   * @param places List of places
   * @param radius Distance unit to use for calculations
   * @return A 2opted version of the trip
   */
  public static ArrayList<Place> twoOpt(final ArrayList<Place> places, double radius) {
    // Get a starting nearest neighbor that we can further optimize
    ArrayList<Place> trip = nearestNeighbor(places, radius);

    //O(N) - Creates a place record array based on the nearest neighbor trip
    PlaceRecord[] placesArray = new PlaceRecord[trip.size()];
    for (int i = 0; i < trip.size(); i++) {
      placesArray[i] = new PlaceRecord(trip.get(i));
    }
    // Calulate distances between all nodes one time. Matrix should be in order of trip
    int[][] distanceMatrix = calculateDistanceMatrix(placesArray, radius);

    // Keep track of the order of each node in the trip so we don't have to re-calculate distances
    int[] tripOrder = new int[trip.size()];
    for (int i = 0; i < tripOrder.length; ++i) {
      tripOrder[i] = i;
    }

    // Keep track of our current trip
    ArrayList<Place> curRoute = trip;

    boolean improved = true;

    while (improved) {
      int bestDistance = Optimization
          .getTripDistance(curRoute, distanceMatrix, tripOrder);
      improved = false;

      for (int i = 0; i < trip.size() - 1; ++i) {
        for (int k = i + 1; k < trip.size() - 1; ++k) {
          Place[] curArr = new Place[curRoute.size()];
          curArr = curRoute.toArray(curArr);
          int[] tempOrder = Arrays.copyOf(tripOrder, tripOrder.length);
          ArrayList<Place> newRoute = new ArrayList<>(
              Arrays.asList(Optimization.twoOptSwap(curArr, i, k, tempOrder)));
          int newDistance = Optimization
              .getTripDistance(newRoute, distanceMatrix, tempOrder);

          if (newDistance < bestDistance) {
            curRoute = newRoute;
            tripOrder = tempOrder;
            improved = true;
          }
        }
      }
    }

    return curRoute;
  }

  /**
   * Reverse the middle segment of a trip.
   *
   * @param route The route we want to swap
   * @param ith Start of middle segment
   * @param kth End of middle segment
   */
  private static Place[] twoOptSwap(Place[] route, int ith, int kth, int[] tempOrder) {
    Place[] newRoute = new Place[route.length];

    int[] tempTrip = Arrays.copyOf(tempOrder, tempOrder.length);

    for (int start = 0; start <= ith - 1; ++start) {
      newRoute[start] = route[start];
      //don't modify trip order since these first elements stay in place
    }

    for (int mid = ith; mid <= kth; ++mid) {
      newRoute[kth - (mid - ith)] = route[mid];
      tempOrder[kth - (mid - ith)] = tempTrip[mid]; //reverse order of these middle elements
    }

    for (int last = kth + 1; last < route.length; ++last) {
      newRoute[last] = route[last];
      //don't modify trip order since these last elements stay in place
    }

    return newRoute;
  }

  /**
   * Sums a trip distance using a pre-existing distance matrix.
   *
   * @param distanceMatrix Pre-existing matrix of distances between each node
   * @param tripOrder Array of indexes into the distance matrix (place's order in the trip)
   * @return The summed distance
   */
  private static int getTripDistance(ArrayList<Place> places, int[][] distanceMatrix,
      int[] tripOrder) {
    int dist = 0;

    for (int i = 0; i < tripOrder.length; ++i) {
      dist += distanceMatrix[tripOrder[i]][tripOrder[(i + 1) % tripOrder.length]];
    }

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
