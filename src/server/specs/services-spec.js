var request = require("request");
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var fs = require('fs');
var base_url = "http://localhost:3001";

describe("Check if web services are returning a status OK", function() {
  describe("GET /", function() {
    it("returns status code 200", function(done) {
      request.get(base_url, function(error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });
  });

  // describe("POST /", function() {
  //
  //   it("returns status code 200", function(done) {
  //     var req = request.post(base_url, function(error, response, body) {
  //           expect(response.statusCode).toBe(200);
  //     });
  //
  //     var form = req.form();
  //     form.append('file', fs.createReadStream(), {
  //       filename : "sample.json",
  //       contentType : "text/plain"
  //     });
  //     console.log("Form", form);
  //
  //   });
  //  });

  //  describe("GET /ServiceName/Version", function() {
  //    it("returns status code 200", function(done) {
  //      request.get(base_url + '/Test 1/1.3.0', function(error, response, body) {
  //        expect(response.statusCode).toBe(200);
  //        done();
  //      });
  //    });
  //  });
   //
  //  describe("DELETE /ServiceName/Version", function() {
  //    xit("returns status code 200", function(done) {
  //      request.del(base_url + '/test/1.0.0', function(error, response, body) {
  //        //console.log("Response" , response);
  //       // if(response.statusCode != 302) {
  //          expect(response.statusCode).toBe(200);
  //        //}
   //
  //        done();
  //      });
  //    });
  //  });

});
