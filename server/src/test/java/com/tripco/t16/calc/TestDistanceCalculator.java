package com.tripco.t16.calc;

import static org.junit.Assert.*;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

@RunWith(JUnit4.class)
public class TestDistanceCalculator {
    @Test
    public void testCommutative() {
        assertEquals(DistanceCalculator.calculateGreatCircleDistance(37, 102.05, 41, 109.05, false),
                DistanceCalculator.calculateGreatCircleDistance(41, 109.05, 37, 102.05, false), .000001);
        assertNotEquals(DistanceCalculator.calculateGreatCircleDistance(37, 102.05, 41, 102.05, false),
                DistanceCalculator.calculateGreatCircleDistance(41, 109.05, 37, 102.05, false), .000001);
    }

    @Test
    public void testMilesKM() {
        assertNotEquals(DistanceCalculator.calculateGreatCircleDistance(37, 102.05, 41, 109.05, true),
                DistanceCalculator.calculateGreatCircleDistance(41, 109.05, 37, 102.05, false), .000001);
    }

    @Test
    public void testSpecific() {
        assertEquals(Math.round(DistanceCalculator.calculateGreatCircleDistance(10, 50, 50, 10, true)), 5764
                , .000001);
        assertEquals(Math.round(DistanceCalculator.calculateGreatCircleDistance(10, 50, 50, 10, false)), 3581
                , .000001);
    }
}