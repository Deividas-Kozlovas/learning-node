const exports = require('express');
const multer = require('multer');
const path = require('path');
const Model = require('../models/Model');

const router = express.Router();

const update = mutler({ dest: 'uploads/'});

router.post('/upload-model', upload.single('modelFIle'), async (req, res) => {
    try{
        const userId = req.session.userId;
        if(!userId){
            return res.status(401).json({ error: 'Unauthorized. Please log in.'});
        }

        if(!req.file){
            return res.status(400).json({error: 'No file uploaded'});
        }

        const newModel = new Model({
            fileName: req.file.originalname,
            filePath: req.file.path,
            userId: userId,
            uploadDate: new Date()
        });

        await newModel.save();

        res.status(201).json({ message: 'File uploaded successfuly!'});
    }catch(error){
        console.error('Error during file upload:', error);
        res.status(500).json({error: 'Failed to upload file'});
    }
});

module.exports = router;