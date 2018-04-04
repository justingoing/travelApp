package com.tripco.t16.query;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import com.tripco.t16.server.HTTP;
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
        new Find().performQuery(query, false);

        // log something.
        //System.out.println(find.some_info_here());
    }

    /**
     * Convert the find object to json.
     * @return 'jsonified' find object
     */
    public String getFind() {
        Gson gson = new Gson();
        return gson.toJson(query);
    }
}