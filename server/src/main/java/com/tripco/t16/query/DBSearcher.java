package com.tripco.t16.query;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import com.tripco.t16.server.HTTP;
import com.tripco.t16.tffi.Error;
import spark.Request;

/**
 * This class handles to the conversions of the find request/resopnse,
 * converting from the Json string in the request body to a Find object,
 * querying the db with the Find, and
 * converting the resulting Find object back to a Json string
 * so it may returned as the response.
 *
 * @author Isaac Gentz
 */
public class DBSearcher {
    private Query query;
    private Error err;
    /**
     * Construct a Query object to handle TFFI transfer.
     * @param request The HTTP request specifying what we should do
     */
    public DBSearcher(Request request) {
        // first print the request
        System.out.println(HTTP.echoRequest(request));

        // extract the information from the body of the request.
        JsonParser jsonParser = new JsonParser();
        JsonElement requestBody = jsonParser.parse(request.body());

        // convert the body of the request to a Java class.
        Gson gson = new Gson();
        query = gson.fromJson(requestBody, Query.class);

        // do the query
        err = new Find().performQuery(query, false);
    }

    /**
     * Convert the find object to json.
     * @return 'jsonified' find object
     */
    public String getFind() {
        Gson gson = new Gson();
        if(this.err.code == "400"){
            System.out.println("printing error");
            return gson.toJson(err);
        }else{
            System.out.println("printing query");
            return gson.toJson(query);
        }
    }
}