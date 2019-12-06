const express = require("express");
const router = express.Router();
const Actions = require("../data/helpers/actionModel");

router.use(express.json());

// Custom middleware
function validateActionId(req, res, next) {
  // do your magic!
  Actions.get(req.params.id)
    .then(response => {
      if (response) {
        req.response = response;
        next();
      } else {
        res
          .status(404)
          .json({ message: "The specified action ID does not exist." });
      }
    })
    .catch(error => {
      console.log(error);
    });
}

router.get("/", (req, res) => {
  Actions.get()
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: "Unable to get all of the actions." });
    });
});

router.get("/:id", validateActionId, (req, res) => {
  res.send(req.response);
});

router.put("/:id", validateActionId, (req, res) => {
  const updatedActionInfo = req.body;

  Actions.update(req.params.id, updatedActionInfo)
    .then(response => {
      res.status(200).json({ id: req.params.id, ...updatedActionInfo });
    })
    .catch(error => {
      console.log(error);
      res
        .status(500)
        .json({ error: "Unable to update the action information." });
    });
});

router.delete("/:id", validateActionId, (req, res) => {
  const deletedAction = [{ ...req.response }];

  Actions.remove(req.params.id)
    .then(response => {
      res
        .status(200)
        .json({ deletedAction, message: "Action has been deleted..." });
    })
    .catch(error => {
      console.log(error);
      res
        .status(500)
        .json({ error: "Unable to delete the specified action ID." });
    });
});

module.exports = router;
