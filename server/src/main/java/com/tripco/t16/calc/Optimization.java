package com.tripco.t16.calc;


import com.tripco.t16.planner.Place;
import com.tripco.t16.planner.Trip;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;

/**
 * Code to optimize trips, based on graph algorithms, like nearest-neighbor, two-opt, and
 * three-opt.
 *
 * @author Samuel Kaessner
 */
public class Optimization {

  public static Optimization NEAREST_NEIGHBOR = new Optimization("nearest-neighbor",
      "Nearest neighbor optimizes the path by choosing the nearest city when deciding which city"
          + " to go to next.");
  public static Optimization TWO_OPT = new Optimization("2-opt",
      "Two-opt improves upon nearest-neighbor by swapping each pair of edges, and seeing "
          + "if the swap makes the trip shorter.");
  public static Optimization THREE_OPT = new Optimization("3-opt",
      "Three-opt improves upon 2-opt by considering an additional pair (3 total) of edges, and"
          + " seeing if any swaps of those edges make the trip shorter.");

  public String label;
  public String description;

  /**
   * Creates an optimization level.
   *
   * @param label - Name of the optimization level.
   * @param description - Description of how the optimization works.
   */
  private Optimization(String label, String description) {
    this.label = label;
    this.description = description;
  }

  /**
   * Implements the nearest-neighbor graph algorithm.
   */
  public static ArrayList<Place> optimize(final ArrayList<Place> places, double radius,
      int option) {
    //Quick sanity check
    if (places == null || places.size() == 0) {
      return places;
    }

    //O(N) - Creates a place record array based on the places
    PlaceRecord[] placesArray = new PlaceRecord[places.size()];
    for (int i = 0; i < places.size(); i++) {
      placesArray[i] = new PlaceRecord(places.get(i));
    }

    Place[] distPlaces = new Place[places.size()];
    for (int i = 0; i < places.size(); ++i) {
      distPlaces[i] = places.get(i);
    }

    //Get the distances between each place.
    int[][] distanceMatrix = calculateDistanceMatrix(distPlaces, radius);

    Place[] bestPlaces = new Place[places.size()];
    int bestDistance = Integer.MAX_VALUE;

    //Calculate lookup table
    int[] lookupTable = createLookupTable(places.size());

    //Try the nearest neighbor algorithm, starting from each city
    for (int startLoc = 0; startLoc < placesArray.length; startLoc++) {
      Place[] tmpPlaces = new Place[places.size()];

      int distance = 0;

      // Set current index to our start id.
      int currentIndex = startLoc;
      int arrayIndex = 1;

      //Add starting position.
      tmpPlaces[0] = placesArray[startLoc].place;
      placesArray[startLoc].visited = true;
      lookupTable[0] = startLoc;

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
          tmpPlaces[arrayIndex] = nearestNeighbor.place;
          arrayIndex++;
          placesArray[id].visited = true;
          lookupTable[iterationCounter + 1] = id;
        }
        iterationCounter++;
      }

      if (option == 3) { //If we are two-opting, then run two-opt on this nearest neighbor.
        tmpPlaces = threeOptNotShit(tmpPlaces, distanceMatrix,
            lookupTable);
        distance = getTripDistance(distanceMatrix, lookupTable);
      } else if (option == 2) { //If we are two-opting, then run two-opt on this nearest neighbor.
        tmpPlaces = twoOptNotShit(tmpPlaces, distanceMatrix,
            lookupTable);
        distance = getTripDistance(distanceMatrix, lookupTable);
      } else {
        distance = getTripDistance(distanceMatrix, lookupTable);
      }

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

    ArrayList<Place> tmpPlaces = new ArrayList<>();
    Collections.addAll(tmpPlaces, bestPlaces);

    return tmpPlaces;
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
  public static int[][] calculateDistanceMatrix(Place[] records, double radius) {
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
        int distance = getDistanceBetween(records[i], records[j], radius);
        distanceMatrix[i][j] = distance;
        distanceMatrix[j][i] = distance;
      }
    }

    return distanceMatrix;
  }

  public static int[] createLookupTable(int length) {
    // Keep track of the order of each node in the trip so we don't have to re-calculate distances
    int[] tripOrder = new int[length];
    for (int i = 0; i < length; ++i) {
      tripOrder[i] = i;
    }

    return tripOrder;
  }

  private static Place[] twoOptNotShit(Place[] places, int[][] distanceMatrix, int[] lookupTable) {
    if (places.length <= 4) {
      return places;
    }

    Place[] tmpPlaces = Arrays.copyOf(places, places.length);

    boolean improvement = true;

    while (improvement) {
      improvement = false;

      for (int i = 0; i <= tmpPlaces.length - 3; i++) {
        for (int k = i + 2; k <= tmpPlaces.length - 2; k++) {
          int delta = -distanceMatrix[lookupTable[i]][lookupTable[i + 1]]
              - distanceMatrix[lookupTable[k]][lookupTable[k + 1]]
              + distanceMatrix[lookupTable[i]][lookupTable[k]]
              + distanceMatrix[lookupTable[i + 1]][lookupTable[k + 1]];

          if (delta < 0) {
            twoOptReverse(tmpPlaces, lookupTable, i + 1, k);
            improvement = true;
          }
        }
      }
    }

    return tmpPlaces;
  }

  public static Place[] threeOptNotShit(Place[] places, int[][] distanceMatrix, int[] lookupTable) {
    if (places.length <= 4) {
      return places;
    }

    Place[] tmpPlaces = Arrays.copyOf(places, places.length);

    boolean improvement = true;
    while (improvement) {
      improvement = false;
      for (int i = 0; i < places.length - 3; i++) {
        for (int j = i + 1; j < places.length - 2; j++) {
          for (int k = j + 1; k < places.length - 1; k++) {
            int currentDistance = distanceCase(distanceMatrix, lookupTable, i, j, k, 0);
            int bestDelta = 0;
            int caseNum = 0;

            for (int z = 1; z <= 7; z++) {
              int delta = currentDistance - distanceCase(distanceMatrix, lookupTable, i, j, k, z);
              if (delta > bestDelta) {
                bestDelta = delta;
                caseNum = z;
              }
            }

            if (caseNum != 0) {
              exchange(tmpPlaces, lookupTable, i, j, k, caseNum);
              improvement = true;
            }
          }
        }
      }
    }

    return tmpPlaces;
  }

  public static int distanceCase(int[][] distanceMatrix, int[] lookupTable, int i, int j, int k,
      int caseNum) {
    int li = lookupTable[i];
    int li1 = lookupTable[i + 1];
    int lj = lookupTable[j];
    int lj1 = lookupTable[j + 1];
    int lk = lookupTable[k];
    int lk1 = lookupTable[(k + 1)];

    if (caseNum == 0) {
      return distanceMatrix[li][li1] +
          distanceMatrix[lj][lj1] +
          distanceMatrix[lk][lk1];
    } else if (caseNum == 1) {
      return distanceMatrix[li][lk] +
          distanceMatrix[lj1][lj] +
          distanceMatrix[li1][lk1];
    } else if (caseNum == 2) {
      return distanceMatrix[li][lj] +
          distanceMatrix[li1][lj1] +
          distanceMatrix[lk][lk1];
    } else if (caseNum == 3) {
      return distanceMatrix[li][li1] +
          distanceMatrix[lj][lk] +
          distanceMatrix[lj1][lk1];
    } else if (caseNum == 4) {
      return distanceMatrix[li][lj] +
          distanceMatrix[li1][lk] +
          distanceMatrix[lj1][lk1];
    } else if (caseNum == 5) {
      return distanceMatrix[li][lk] +
          distanceMatrix[lj1][li1] +
          distanceMatrix[lj][lk1];
    } else if (caseNum == 6) {
      return distanceMatrix[li][lj1] +
          distanceMatrix[lk][lj] +
          distanceMatrix[li1][lk1];
    } else if (caseNum == 7) {
      return distanceMatrix[li][lj1] +
          distanceMatrix[lk][li1] +
          distanceMatrix[lj][lk1];
    }

    return -1;
  }

  public static void exchange(Place[] places, int[] lookupTable, int i, int j, int k, int caseNum) {
    switch (caseNum) {
      case 1:
        twoOptReverse(places, lookupTable, i + 1, k);
        break;
      case 2:
        twoOptReverse(places, lookupTable, i + 1, j);
        break;
      case 3:
        twoOptReverse(places, lookupTable, j + 1, k);
        break;
      case 4:
        twoOptReverse(places, lookupTable, i + 1, j);
        twoOptReverse(places, lookupTable, j + 1, k);
        break;
      case 5:
        twoOptReverse(places, lookupTable, i + 1, k);
        twoOptReverse(places, lookupTable, (i + 1 + (k - j)), k);
        break;
      case 6:
        twoOptReverse(places, lookupTable, i + 1, k);
        twoOptReverse(places, lookupTable, i + 1, i + (k - j));
        break;
      case 7:
        twoOptReverse(places, lookupTable, i + 1, k);
        twoOptReverse(places, lookupTable, (i + 1 + (k - j)), k);
        twoOptReverse(places, lookupTable, i + 1, i + (k - j));
        break;
      default:
        break;
    }
  }

  /**
   * We don't know what this does.
   */
  private static void twoOptReverse(Place[] route, int[] lookupTable, int i1, int k) {
    Place tmp;
    int tmpInt;

    while (i1 < k) {
      tmpInt = lookupTable[i1];
      tmp = route[i1];

      lookupTable[i1] = lookupTable[k];
      route[i1] = route[k];

      lookupTable[k] = tmpInt;
      route[k] = tmp;

      i1++;
      k--;
    }
  }


  /**
   * Sums a trip distance using a pre-existing distance matrix.
   *
   * @param distanceMatrix Pre-existing matrix of distances between each node
   * @param tripOrder Array of indexes into the distance matrix (place's order in the trip)
   * @return The summed distance
   */
  private static int getTripDistance(int[][] distanceMatrix, int[] tripOrder) {
    int dist = 0;

    for (int i = 0; i < tripOrder.length; ++i) {
      dist += distanceMatrix[tripOrder[i]][tripOrder[(i + 1) % tripOrder.length]];
    }

    return dist;
  }

  /**
   * Returns a list of the optimizations the server supports.
   *
   * @return - ArrayList of supported optimizations.
   */
  public static ArrayList<Optimization> getOptimizations() {
    ArrayList<Optimization> opts = new ArrayList<>();
    opts.add(THREE_OPT);
    opts.add(TWO_OPT);
    opts.add(NEAREST_NEIGHBOR);

    return opts;
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
