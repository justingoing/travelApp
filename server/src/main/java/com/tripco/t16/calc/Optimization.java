package com.tripco.t16.calc;


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
}