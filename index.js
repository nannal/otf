const { v4: uuidv4 } = require('uuid');
express = require('express')
const fileUpload = require('express-fileupload');
bodyParser = require('body-parser');

config = require("./config")
mongo = require("./mongoHelp")

const app = express()

app.use(fileUpload(),bodyParser.json(),function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    res.setHeader('Content-Type', 'application/json')
    res.setHeader('Access-Control-Allow-Credentials', true)
    next()
})

app.post('/submit', async function (req, res) {
    itemID=uuidv4()
    //acept file
    try {
        if(!req.files || Object.keys(req.files).length === 0) {
            res.send({
                status: false,
                message: 'No file uploaded'
            })
        } else {
            let file = req.files.file;
            //base64 encode file
            b64=file.data.toString('base64');
             //store file mongo with uuidv4
            
            fileObj = {
                _id: itemID,
                file: b64,
                name: req.files.file.name
            }
            mongo.put("otf","files",fileObj)
            

            //return uuid
            res.send(config.url+"file/"+itemID)
        }
    } catch (err) {
        res.status(500).send(err);
    }
})


app.get('/file/:id', async function (req, res){
    mongo.get("otf","files",{_id:req.params.id}).then(
        results => {

            if (results.length < 1) {
                res.status(404).send({msg:"No File"})
            } else {
                res.setHeader('Content-Type', 'application/octet-stream')
                res.setHeader('Content-Disposition', 'attachment; filename='+results[0].name)
                file = Buffer.from(results[0].file, 'base64')
                res.status(200).send(file)
                mongo.deleteOne("otf","files",{_id:req.params.id})
            }
        }
    )
})

app.listen(config.expressPort)
