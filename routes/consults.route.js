const {consultsController} = require("../controllers/consults.controller")
const { Router } = require("express");

const router = Router();


  router.get("/consult",consultsController.getConsults)
  router.post("/consult", consultsController.addConsults);





  
  
  module.exports = router;
  