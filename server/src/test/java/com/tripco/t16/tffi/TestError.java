package com.tripco.t16.tffi;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

import static org.junit.Assert.*;

@RunWith(JUnit4.class)
public class TestError {

  @Test
  public void testCtor() {
    Error err1 = new Error();
    err1.code = "404";
    err1.version = TFFI.VERSION;
    err1.debug = "debug";
    err1.message = "message";
    err1.type = "error";

    Error err2 = new Error("404", "message", "debug");

    assertEquals(err1.code, err2.code);
    assertEquals(err1.version, err2.version);
    assertEquals(err1.debug, err2.debug);
    assertEquals(err1.message, err2.message);
    assertEquals(err1.type, err2.type);
  }
}
