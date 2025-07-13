const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://Eveena:eveena@cluster0.imkjrpg.mongodb.net/EmployeeDB?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("Connected to DB"))
  .catch((error) => console.log(error));
