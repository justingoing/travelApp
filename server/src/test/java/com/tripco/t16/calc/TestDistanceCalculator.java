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
                DistanceCalculator.calculateGreatCircleDistance(41, 109.05, 37, 102.05, false));
        assertNotEquals(DistanceCalculator.calculateGreatCircleDistance(37, 102.05, 41, 102.05, false),
                DistanceCalculator.calculateGreatCircleDistance(41, 109.05, 37, 102.05, false));
    }

    @Test
    public void testMilesKM() {
        assertNotEquals(DistanceCalculator.calculateGreatCircleDistance(37, 102.05, 41, 109.05, true),
                DistanceCalculator.calculateGreatCircleDistance(41, 109.05, 37, 102.05, false));
    }

    @Test
    public void testSpecific() {
        assertEquals(DistanceCalculator.calculateGreatCircleDistance(10, 50, 50, 10, true), 5764);
        assertEquals(DistanceCalculator.calculateGreatCircleDistance(10, 50, 50, 10, false), 3581);
    }

    @Test
    public void testInColorado() {
        assertTrue(DistanceCalculator.isInColorado(39.5, -107));
        assertTrue(DistanceCalculator.isInColorado(DistanceCalculator.COLORADO_BOTTOM, DistanceCalculator.COLORADO_LEFT));
        assertFalse(DistanceCalculator.isInColorado(-39.5, -107));
        assertFalse(DistanceCalculator.isInColorado(39.5, 107));
    }
}