var jsonData = require("./vendorList.json");

var express = require("express");
// create an express microservice application
var app = express();

// listen to a port
app.listen(process.env.PORT || 3001);

// middleware 

app.use(express.json());
app.use("/",express.static("webapp/"));

// implement the end point microservice
app.get("/", (req, res) => {
  res.send("First Microservice GET Call");
});

// Get all the vendor
app.get("/vendors", (req, res) => {
  res.json(jsonData);
});

// filter vendor
app.get("/vendors/:vendorId", (req, res) => {
  
  const vendorId = parseInt(req.params["vendorId"]);

  const result = jsonData.filter(vendorData=> vendorData["vendorId"] == vendorId);
  
  res.json(result);
});

app.post("/vendors",(req,res)=>{
    // read the body
    var vendorData = req.body;
    vendorData.vendorName = "Runtime Vendor Name";
    res.json(vendorData);
})


app.get("/index.html",(req,res)=>{
    res.sendFile(__dirname + "./webapp/index.html");
})


console.log("Express webservice is running in port 3001");