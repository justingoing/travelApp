package com.tripco.t16.calc;


import com.tripco.t16.planner.Place;
import com.tripco.t16.planner.Trip;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

public class Optimization {
    public void nearestNeighbor(List<Place> places) {
        //Validate argument
        if (places == null || places.size() <= 0) {
            return;
        }

        //Populate our unvisited list.
        LinkedList<Place> unvisited = new LinkedList<>();
        for (Place p : places) {
            unvisited.add(p);
        }

        //Structures that hold the output
        ArrayList<Place> route = new ArrayList<>();
        ArrayList<Integer> distances = new ArrayList<>();

        while (unvisited.size() > 0) {
            Place nearest = unvisited.get(0);
            for (int i = 0; i < places.size(); i++) {

            }
        }
    }

    public void twoOpt() {

    }

    /**
     * Implements the nearest neighbor.
     *
     *
     */
    public ArrayList<Place> nearestNeighbor(ArrayList<Place> places, double radius) {
        //O(N) - Creates a place record array based on the places
        PlaceRecord[] placesArray = new PlaceRecord[places.size()];
        for (int i = 0; i < places.size(); i++) {
            placesArray[i] = new PlaceRecord(places.get(i));
        }


        ArrayList<Place> bestPlaces = new ArrayList<>();
        int bestDistance = Integer.MAX_VALUE;

        for (int startLoc = 0; startLoc < placesArray.length; startLoc++) {
            ArrayList<Place> tmpPlaces = new ArrayList<>();
            int distance = 0;

            //Starting from point zero:
            Place start = placesArray[startLoc].place;
            placesArray[startLoc].visited = true;
            int currentIndex = startLoc;
            tmpPlaces.add(start);

            for (int i = 0; i < placesArray.length; i++) {
                //Find closest neighbor
                PlaceRecord nearestNeighbor = null;
                int closest = Integer.MAX_VALUE;
                int id = -1;
                for (int j = 0; j < distanceMatrix[currentIndex].length; j++) {
                    if (distanceMatrix[currentIndex][j] < closest &&
                            !placesArray[j].visited) {
                        closest = distanceMatrix[currentIndex][j];
                        nearestNeighbor = placesArray[j];
                        id = j;
                    }
                }

                if (nearestNeighbor != null) {
                    currentIndex = id;
                    tmpPlaces.add(nearestNeighbor.place);
                    placesArray[id].visited = true;
                    distance += closest;
                }
            }

            if (distance < bestDistance) {
                bestDistance = distance;
                bestPlaces = tmpPlaces;
            }


            //Reset
            for (int i = 0; i < placesArray.length; i++) {
                placesArray[i].visited = false;
            }
        }


        return bestPlaces;
    }

    /**
     * O(N^2) - where N is the size of records.
     * Calculates the great-circle distances between each pair of cities.
     *
     * @return - a matrix
     */
    private int[][] calculateDistanceMatrix(PlaceRecord[] records, double radius) {
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
                int distance = DistanceCalculator.calculateGreatCircleDistance(
                        Trip.convertToDecimal(records[i].place.latitude),
                        Trip.convertToDecimal(records[i].place.longitude),
                        Trip.convertToDecimal(records[j].place.latitude),
                        Trip.convertToDecimal(records[j].place.longitude), radius);
                distanceMatrix[i][j] = distance;
            }
        }

        return distanceMatrix;
    }


    /**
     * Holds a place and a record of whether or not we
     * have visited this.
     */
    private static class PlaceRecord {
        private final Place place;
        private boolean visited;

        private PlaceRecord(Place place) {
            this.place = place;
        }
    }
}