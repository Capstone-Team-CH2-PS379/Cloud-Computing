const categoryModel = require('../models/category.js');


const getAllCategory = async(req, res) =>{
    try {
        const [data] = await categoryModel.getAllCategory();
        res.json({
            message: 'Get All Category success',
            data: data
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: 'Server Error',
            ServerMessage: error
        });
    }
}

const createNewCategory = async (req, res) => {
    const {body} = req;
    if(!body.category_name){
        return res.status(400).json({
            message: "Anda memasukkan data yang salah",
            data: null
        })
    }
    try{
        await categoryModel.createNewCategory(body);
        res.status(201).json({
            message: 'CREATE category success',
            data: body
        })
    }catch (error){
        res.status(500).json({
            message: 'Server Errror',
            ServerMessage: error
        })
    }
}

const updateCategory = async (req, res) =>{
    const {idCategory} = req.params;
    const {body} = req;
    try{
        await categoryModel.updateCategory(body, idCategory);
        res.json({
            message: "Update User success",
            data: {
                id: idCategory,
                ...body
            },
        })
    }catch(error){
        res.status(500).json({
            message: 'Server erorr',
            serverMessage: error
        })
    }
}

const deleteCategory = async(req, res)=>{
    const {idCategory} = req.params;
    try {
        await categoryModel.deleteCategory(idCategory);
        res.json({
            message: 'DELETE success',
            data:null
        })
    } catch (error) {
        res.status(500).json({
            message: 'Server erorr',
            serverMessage: error
        })
    }
}





module.exports={
 getAllCategory,
 createNewCategory,
 updateCategory,
 deleteCategory,
}
