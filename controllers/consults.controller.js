const consult  = require("../models/Consult.model")

module.exports.consultsController={
    getConsults:async (req,res) =>{
        try{
            const getConsults = await consult.find()
            res.json(getConsults)
        }catch(error){
         res.json({ error: error.message });

        }
    },
    addConsults: async (req, res) => {
        try {
          const {consultName,consultNumber, consultMail,consultOrganization } = req.body;
          const newConsult = await consult.create({
            consultName,
            consultNumber,
            consultMail,
            consultOrganization
          });
          res.json(newConsult);
        } catch (error) {
          res.json({ error: error.message });
        }
      },
}