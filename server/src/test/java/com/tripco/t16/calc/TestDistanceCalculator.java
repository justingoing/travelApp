package com.tripco.t16.calc;

import static org.junit.Assert.*;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

@RunWith(JUnit4.class)
public class TestDistanceCalculator {
    @Test
    public void testCommutative() {
        assertEquals(DistanceCalculator.calculateGreatCircleDistance(37, 102.05, 41, 109.05, DistanceCalculator.EARTH_RADIUS_MI),
                DistanceCalculator.calculateGreatCircleDistance(41, 109.05, 37, 102.05, DistanceCalculator.EARTH_RADIUS_MI));
        assertNotEquals(DistanceCalculator.calculateGreatCircleDistance(37, 102.05, 41, 102.05, DistanceCalculator.EARTH_RADIUS_MI),
                DistanceCalculator.calculateGreatCircleDistance(41, 109.05, 37, 102.05, DistanceCalculator.EARTH_RADIUS_MI));
    }

    @Test
    public void testMilesKM() {
        assertNotEquals(DistanceCalculator.calculateGreatCircleDistance(37, 102.05, 41, 109.05, DistanceCalculator.EARTH_RADIUS_KM),
                DistanceCalculator.calculateGreatCircleDistance(41, 109.05, 37, 102.05, DistanceCalculator.EARTH_RADIUS_MI));
    }

    @Test
    public void testSpecific() {
        assertEquals(DistanceCalculator.calculateGreatCircleDistance(10, 50, 50, 10, DistanceCalculator.EARTH_RADIUS_KM), 5764);
        assertEquals(DistanceCalculator.calculateGreatCircleDistance(10, 50, 50, 10, DistanceCalculator.EARTH_RADIUS_MI), 3581);
    }

    /*@Test
    public void testInColorado() {
        assertTrue(DistanceCalculator.isInColorado(39.5, -107));
        assertFalse(DistanceCalculator.isInColorado(-39.5, 107));
        assertFalse(DistanceCalculator.isInColorado(DistanceCalculator.COLORADO_LEFT, DistanceCalculator.COLORADO_TOP + 2));
        assertTrue(DistanceCalculator.isInColorado(DistanceCalculator.COLORADO_BOTTOM, DistanceCalculator.COLORADO_LEFT));
        assertFalse(DistanceCalculator.isInColorado(-39.5, -107));
        assertFalse(DistanceCalculator.isInColorado(39.5, 107));
    }*/
    //No longer in Colorado only!
}