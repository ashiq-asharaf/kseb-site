const express = require('express');
const cors = require('cors');
const fs = require('fs');
const bodyParser = require('body-parser');


const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());

//Clear the data.json 
function clearDataFile() {
    const filePath = 'data.json';
    const emptyData = {};
  
    // Write an empty JSON object to the file
    fs.writeFile(filePath, JSON.stringify(emptyData), (err) => {
      if (err) {
        console.error('Error clearing data file:', err);
      } else {
        console.log('Data file cleared successfully');
      }
    });
  }
  //Bill Calculation function
  const calculateBill = (units) => {
    let totalBill = 20;
    let remainingUnits = units;
  

    if (units <= 250) {
      ranges = [
        { maxUnits: 50, rate: 3.50 },
        { maxUnits: 100, rate: 4.20 },
        { maxUnits: 150, rate: 5.20 },
        { maxUnits: 200, rate: 5.80 },
        { maxUnits: 250, rate: 6.50 }
      ];
    } else {
      ranges = [
        { maxUnits: 300, rate: 5.95 },
        { maxUnits: 350, rate: 6.30 },
        { maxUnits: 400, rate: 6.45 },
        { maxUnits: 500, rate: 6.65 },
        { maxUnits: 1000, rate: 6.90}
      ];
    }
  
  
    for (const range of ranges) {
      if (remainingUnits > 0) {
        const unitsInThisRange = Math.min(remainingUnits, range.maxUnits);
        totalBill += unitsInThisRange * range.rate;
        remainingUnits -= unitsInThisRange;
      } else {
        break; 
      }
    }
  
    if (remainingUnits > 0) {
      totalBill += remainingUnits * 6.90;
    }
  
    return totalBill;
  };

//store the form data inside a json file.
app.post('/submit', (req, res) => {

    const units = req.body.inputConsumerUnits;
    const billAmount = calculateBill(units);

    console.log(billAmount, "units");

    
       if (!req.body) {
        console.error('Request body is empty or undefined');
        return res.status(400).send('Bad Request');
      }

      clearDataFile();
    const formData = req.body;
    const jsonData = JSON.stringify(formData, null, 2);

    

    fs.writeFile('data.json', jsonData, (err) => {
        if (err) {
          console.error('Error writing data to file:', err);
          res.status(500).send('Error writing data to file');
        } else {
          console.log('Data saved successfully');
          res.status(200).send(`Total bill amount: Rs ${billAmount.toFixed(2)}`);
          // .send(status: 'Data saved successfully', billAmount);
        }
      });
    // res.send('Hello, World!');
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });