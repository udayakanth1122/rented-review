var express = require('express');
var _ = require('underscore');
var router = express.Router();

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var fs = require('fs');

/*
 * GET servicelist.
 */
router.get('/', function(req, res) {
  var db = req.db;
  var collection = db.get('servicelist');
  collection.find({}, {}, function(e, docs) {
    var response = [];
    _.each(docs, function(doc) {
      var serviceIndex = _.findIndex(response, {
        title: doc.swagger.info.title
      });
      //console.log("Service index", serviceIndex);
      if (serviceIndex < 0) {
        var versionObj = {};
        versionObj.number = doc.swagger.info.version;
        versionObj.active = (doc.active === "true" || doc.active === true);
        response.push({
          title: doc.swagger.info.title,
          owner: doc.owner,
          versions: [versionObj]
        });
      } else {
        var versionObj = {};
        versionObj.number = doc.swagger.info.version;
        versionObj.active = (doc.active === "true" || doc.active === true);
        response[serviceIndex].versions.push(versionObj);
      }

    });
    _.each(response, function(item) {
      var versions = _.sortBy(item.versions, 'number');
      item.versions = versions;
    });
    res.send(_.sortBy(response, 'title'));
    //res.send(response);
  });
});
/*
 * GET everything from database. TEMPORARY; TO BE DELETED
 */
router.get('/all', function(req, res) {
  var db = req.db;
  var collection = db.get('servicelist');
  collection.find({}, {}, function(e, docs) {
    res.send(docs);
  })
});
/*
 * GET serviceDetails
 */
router.get('/:title/:version', function(req, res) {
  var db = req.db;
  var collection = db.get('servicelist');
  collection.findOne({
    "swagger.info.title": req.params.title,
    "swagger.info.version": req.params.version
  }, {
    _id: 0,
    'swagger.swagger': 1
  }, function(e, docs) {

    res.json(docs.swagger);
  });
});

/*
 * POST a new service
 */
router.post('/', multipartMiddleware, function(req, res) {

  fs.readFile(req.files.swagger.path, 'utf8', function(err, data) {
    if (err) throw err;

    req.body.swagger = JSON.parse(data);

    // delete file after reading
    fs.unlinkSync(req.files.swagger.path);

    var db = req.db;
    var collection = db.get('servicelist');
    console.log("Post made");
    if (_.isUndefined(req.body.owner)) {
      req.body.owner = "Default";
    }

    if (_.isUndefined(req.body.administrators)) {
      req.body.administrators = [];
    }

    if (_.isUndefined(req.body.active)) {
      req.body.active = true;
    }

    //Check if service already exists. If yes, throw an error.

    collection.findOne({
      "swagger.info.title": req.body.swagger.info.title,
      "swagger.info.version": req.body.swagger.info.version
    }, function(e, docs) {
      if (docs == null) {
        //Insert new services to database
        collection.insert(req.body, function(err, result) {
          res.send(
            (err === null) ? {
              msg: 'Success'
            } : {
              msg: err
            }
          );
        });
      } else {
        res.status(422).send({
          error: "Duplicate entry found"
        });
      }

    });
  });

});

/*
 * DELETE to delete  service.
 */
router.delete('/:title/:version', function(req, res) {
  var db = req.db;
  var collection = db.get('servicelist');


  collection.remove({
    "swagger.info.title": req.params.title,
    "swagger.info.version": req.params.version
  }, function(err) {
    res.send((err === null) ? {
      msg: 'Delete successful'
    } : {
      msg: 'error: ' + err
    });
  });
});

/*
 * UPDATE active/inactive through toggle
 */
router.put('/', multipartMiddleware, function(req, res) {
  console.log(req.body, req.files);
  var db = req.db;
  var collection = db.get('servicelist');

  var update = function(request, response) {
    collection.remove({
      "swagger.info.title": request.body.swagger.info.title,
      "swagger.info.version": request.body.swagger.info.version
    }, function(err) {
      collection.insert(request.body, function(err, result) {
        response.send(
          (err === null) ? {
            msg: 'Success'
          } : {
            msg: err
          }
        );
      });
    });
  }

  if (!_.isUndefined(req.files) && !_.isEmpty(req.files)) {
    fs.readFile(req.files.swagger.path, 'utf8', function(err, data) {
      if (err) throw err;
      req.body.swagger = JSON.parse(data);
      // delete file after reading
      fs.unlinkSync(req.files.swagger.path);
      update(req, res);
    });
  } else {
    collection.findOne({
      "swagger.info.title": req.body.title,
      "swagger.info.version": req.body.version
    }, {
      _id: 0,
      'swagger.swagger': 1
    }, function(e, docs) {
      if (!_.isUndefined(req.body.title) && !_.isUndefined(req.body.version) && !_.isUndefined(req.body.active)) {
         var document = {};
         document.body = docs;
         document.body.active = (req.body.active === "true");
         update(document,res);
      } else {
        res.status(400).send({
          error: "Bad request. Title, Version or Active property is missing"
        });
      }

    });

  }
});
module.exports = router;
