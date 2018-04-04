package com.tripco.t16.tffi;

/**
 * TFFI representation of an error code.
 */
public class Error {

  public String type;
  public int version;
  public String code;
  public String message;
  public String debug;

  /**
   * Creates an error object but does not set any of the property fields.
   */
  public Error() {
  }

  /**
   * Creates an Error with the given code, message, and debug string. Also sets the version and type
   * to the server defaults.
   *
   * @param code - String representation of error code (404, 500, etc.).
   * @param message - The message to display to the user.
   * @param debug - Information that can be used for debugging.
   */
  public Error(String code, String message, String debug) {
    this.type = "error";
    this.version = TFFI.VERSION;
    this.code = code;
    this.message = message;
    this.debug = debug;
  }
}
