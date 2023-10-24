const Item = require('../models/Item')
const mongoose = require('mongoose')
const { exec } = require('child_process');

const getItem = async(req, res) => {
    const cartName = req.params.cartName;
    const ItemModel = mongoose.model(cartName, Item)
    ItemModel.find().then(foundItem => {
        res.status(200).json(foundItem)
    });

    // ItemModel.watch([{ $match: {operationType: {$in: ['insert']}}}]).on('change', (change) => {
    //     console.log(change)
    //     io.emit('databaseInsert', change);
    // });
    // ItemModel.watch([{ $match: {operationType: {$in: ['update']}}}], { fullDocument: "updateLookup"}).on('change', (change) => {
    //     console.log(change);
    //     io.emit('databaseUpdate', change);
    // });

    // ItemModel.watch([{ $match: {operationType: {$in: ['delete']}}}]).on('change', (change) => {
    //     console.log(change);
    //     io.emit('databaseDelete', change);
    // });

}

const recommendedItems = async(req, res) => {
    exec('python your_python_script.py', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error}`);
            return res.status(500).send('Something went wrong');
        }
        console.log(`Python Output: ${stdout}`);
        // res.send('Python script executed successfully');
    });
}
module.exports = {
    getItem,
    recommendedItems
}
