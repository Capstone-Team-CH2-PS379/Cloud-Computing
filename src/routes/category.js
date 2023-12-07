const express = require('express');
const categoryController = require('../controller/category.js');
const router = express.Router();



//create - POST
router.post('/', categoryController.createNewCategory);

//Read - GET
router.get('/', categoryController.getAllCategory);

//UPDATE - PATCH
router.patch('/:idCategory', categoryController.updateCategory);

// Delete - delete
router.delete('/:idCategory', categoryController.deleteCategory );




module.exports = router;
