const dbPool = require('../config/db.js');
const getAllCategory = ()=>{
    const SQLQuery = 'SELECT * FROM category_situation';
    return dbPool.execute(SQLQuery);
}

const createNewCategory = (body) =>{
    const SQLQuery = 'INSERT INTO category_situation (category_name) VALUES (?)';

    return dbPool.execute(SQLQuery, [body.category_name]);
};

const updateCategory = (body, idCategory) =>{
    const SQLQuery = 'UPDATE category_situation SET category_name = ? WHERE category_id = ?';

    return dbPool.execute(SQLQuery, [body.category_name, idCategory]);
}
const deleteCategory = (idCategory)=>{
    const SQLQuery = 'DELETE FROM category_situation WHERE category_id= ?';

    return dbPool.execute(SQLQuery, [idCategory]);
}

module.exports ={
    getAllCategory,
    createNewCategory,
    updateCategory,
    deleteCategory,
}
