// server.js
const path = require("path");
const express = require('express');
const app = express();
const db = require('./config/db.config');
const serverConfig = require('./config/server.config');


//pages
app.use(express.static(path.join(__dirname, "public/src/pages/")));

//css
app.use(express.static(path.join(__dirname, "public/src/styles/")));

//img
app.use(express.static(path.join(__dirname, "public/src/assets/images/")));
//const bodyParser = require('body-parser');
//app.use(bodyParser.json());



app.use(express.json());

// app.get('/signup',(req,res)=>{
//   res.sendFile(path.join(__dirname, 'public', 'signup.html'));
// });

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/src/pages/', 'index.html'));
});
// Import routes
//-----------------------------------------------------------------
const authRoutes = require('./routes/auth.routes');
// const equipmentRoutes = require('./routes/equipment.routes');
// const maintenanceRoutes = require('./routes/maintenance.routes');
// const inventoryRoutes = require('./routes/inventory.routes');
// const incidentRoutes = require('./routes/incident.routes');
// const analyticsRoutes = require('./routes/analytics.routes');
// const userRoutes = require('./routes/user.routes');
// // Use routes
const oracledb = require('oracledb');
const bcrypt = require('bcrypt')
const { connection } = require("./config/db.config.js");
const { autoCommit } = require("oracledb");

//signup


app.post('/signup', async (req, res) => {
  console.log("signup req received");
  console.log(req.body);

  const { name, fmnname, email, contact, addr, pass } = req.body;

  const sql = `INSERT INTO UNIT (UNIT_NAME, FORMATION_NAME, EMAIL, CONTACT, ADDRESS, UNIT_PASSWORD) VALUES (:name, :fmnname, :email, :contact, :addr, :pass)`;

  try {
    const connection = await oracledb.getConnection({
      user: 'yourUsername',
      password: 'yourPassword',
      connectString: 'yourConnectionString'
    });

    console.log("Database connection established");

    const result = await connection.execute(sql, {
      name: name,
      fmnname: fmnname,
      email: email,
      contact: contact,
      addr: addr,
      pass: pass
    }, { autoCommit: true });

    console.log("Database operation successful");
    console.log({ message: 'User created successfully', user: result.rowsAffected });

    await connection.close();
    res.status(201).json({ message: 'User created successfully', user: result.rowsAffected });

  } catch (error) {
    console.log("Error from signup: ", error.message);
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});


//login
app.get('/login', async (req, res) => {
  console.log("login req");
  console.log(req.body);

  const { name, email, pass } = req.body;
  // const hashedPassword = await bcrypt.hash(pass, 10);
  const sql = `SELECT * FROM UNIT WHERE UNIT_NAME = :name `

  try {
    const datasent = await oracledb.getConnection();

    const result = await datasent.execute(sql, {
      name: name
    }, { autoCommit: true })
    console.log(result);
    const passN = result.rows.UNIT_PASSWORD;
    console.log("pass: ", passN);
    // const emailN = result.rows.ORD;
    if (result) {
      if (pass === passN) {
        console.log("Login successful for user", name);
        // res.status(201).sendFile(path.join(__dirname, 'public/src/pages/', 'home.html'));
        // await datasent.close();
        res.status(201).json({ message: 'User logged in successfully', user: result.rowsAffected });
      }
    }

    // await datasent.close();

  } catch (error) {
    console.log("from signup: ", error.message)
    res.status(500).json({ message: 'Error creating user', error: error.message, e: error });
  }
})

//category
app.get('/category', async (req, res) => {
  console.log("login req");
  console.log(req.body);

  const { isStackAvail } = req.body;
  // const hashedPassword = await bcrypt.hash(pass, 10);
  const sql = ` SELECT r.Resource_Name, r.Amount, u.Formation_name
    FROM Unit_Resources r
    JOIN Unit u ON r.Unit_ID = u.Unit_ID
    WHERE r.Availability = :istock;
`

  try {
    const datasent = await oracledb.getConnection();

    const result = await datasent.execute(sql, {
      istock: isStackAvail
    }, { autoCommit: true })
    console.log(result);
    // const emailN = result.rows.ORD;
    if (result) {
        res.status(201).json({ message: 'User logged in successfully', user: result.rowsAffected });
      
    }

    // await datasent.close();

  } catch (error) {
    console.log("from signup: ", error.message)
    res.status(500).json({ message: 'Error creating user', error: error.message, e: error });
  }
})


//application
app.get('/home', async (req, res) => {
  console.log("login req");
  console.log(req.body);

  const { responseID } = req.body;
  // const hashedPassword = await bcrypt.hash(pass, 10);
  const sql = ` SELECT a.App_ID, a.Resource_Name, a.Amount, a.Description_of_Need, u1.Formation_name AS From_Unit, u2.Formation_name AS To_Unit, r.Response
    FROM Application_Resources a
    JOIN Unit u1 ON a.AppFrom_Unit_ID = u1.Unit_ID
    JOIN Unit u2 ON a.AppTo_Unit_ID = u2.Unit_ID
    LEFT JOIN Response_Application r ON a.Response_ID = :resID;
`

  try {
    const datasent = await oracledb.getConnection();

    const result = await datasent.execute(sql, {
      resID: responseID
    }, { autoCommit: true })
    console.log(result);
    // const emailN = result.rows.ORD;
    if (result) {
        res.status(201).json({ message: 'User logged in successfully', user: result.rowsAffected });
      
    }

    // await datasent.close();

  } catch (error) {
    console.log("from signup: ", error.message)
    res.status(500).json({ message: 'Error creating user', error: error.message, e: error });
  }
})


//  app.use('/api/auth', authRoutes);
// app.use('/api/equipment', equipmentRoutes);
// app.use('/api/maintenance', maintenanceRoutes);
// app.use('/api/inventory', inventoryRoutes);
// app.use('/api/incidents', incidentRoutes);
// app.use('/api/analytics', analyticsRoutes);
// app.use('/api/users', userRoutes);
//--------------------------------------------------------------------------





const startServer = async () => {
  try {
    await db.initialize();
    app.listen(serverConfig.port, serverConfig.hostname, () => {
      console.log(`Server running at http://localhost:3000/`);
    });
  } catch (err) {
    console.error('Error starting server:', err);
  }
};

startServer();

process.on('SIGINT', async () => {
  await db.close();
  process.exit(0);
});
