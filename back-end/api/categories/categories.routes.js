const express = require ('express');
const router = express.Router()

router.get("/categorie",getCategories)

module.exports =router;