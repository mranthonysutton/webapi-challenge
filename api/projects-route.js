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

function validProjectAdd(req, res, next) {
  if (!req.body) {
    res.status(400).json({ error: "Missing project information data." });
  } else if (!req.body.name) {
    res.status(400).json({ error: "Missing project name." });
  } else if (!req.body.description) {
    res.status(400).json({ error: "Missing project description." });
  }

  next();
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

// Obtains all of the actions for the specific project
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

// Adds a new project
router.post("/", validProjectAdd, (req, res) => {
  Projects.insert(req.body)
    .then(response => {
      res.status(201).json({ ...req.body });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: "Unable to add a new project." });
    });
});

// Deletes the project ID from the DB
router.delete("/:id", validateProjectId, (req, res) => {
  const deletedProject = [{ ...req.response }];

  Projects.remove(req.params.id)
    .then(response => {
      res
        .status(200)
        .json({ deletedProject, message: "Project has been deleted..." });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: "Unable to delete the specified ID." });
    });
});

// Information that is sent to the body updates the specific ID in the DB
router.put("/:id", validateProjectId, (req, res) => {
  const updatedProjectInfo = req.body;

  Projects.update(req.params.id, updatedProjectInfo)
    .then(response => {
      res.status(200).json({ id: req.params.id, ...updatedProjectInfo });
    })
    .catch(error => {
      console.log(error);
      res
        .status(500)
        .json({ error: "Unable to update the project information." });
    });
});

module.exports = router;
