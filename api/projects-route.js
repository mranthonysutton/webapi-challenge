const express = require("express");
const router = express.Router();
const Projects = require("../data/helpers/projectModel");

router.use(express.json());

// Custom Middleware
// Checks if the project ID exists
function validateProjectId(req, res, next) {
  // do your magic!
  Projects.get(req.params.id)
    .then(response => {
      if (response) {
        req.response = response;
        next();
      } else {
        res
          .status(404)
          .json({ message: "The specified project ID does not exist." });
      }
    })
    .catch(error => {
      console.log(error);
    });
}

// Gets all of the projects
router.get("/", (req, res) => {
  Projects.get()
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: "Unable to get the projects" });
    });
});

// Obtain specific project ID
router.get("/:id", validateProjectId, (req, res) => {
  res.send(req.response);
});

router.get("/:id/actions", validateProjectId, (req, res) => {
  Projects.getProjectActions(req.params.id)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: "Unable to retrieve the actions for the specified project ID."
      });
    });
});

module.exports = router;
