const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');


const app = express();
app.use(cors())
const port = 5000;

app.use(express.json());
const JWT_SECRET = 'SUPER_SECRET_KEY';
const MONGO_URI = 'mongodb+srv://rahul887393_db_user:93amzIXNoAJfcSHC@users.em1sibq.mongodb.net';
const DB_NAME = 'authdb';

/* ================= DB ================= */

let db;

MongoClient.connect(MONGO_URI)
    .then(client => {
        db = client.db(DB_NAME);
        console.log('MongoDB connected');
    })
    .catch(err => console.error(err));

// //////////////////////////////////////////////////


function authenticate(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader)
        return res.status(401).json({ message: 'Token missing' });
    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET)
        req.userId = decoded.id,
            next()
    } catch (error) {
        res.status(401).json({ message: "Invalid Token" })
    }
}



////////////////routing////////////////////


app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.get("/signup", (req, res) => {
    res.send("okay")
})

app.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        //const db = getDB();
        const existingUser = await db.collection('users').findOne({ email });
        if (existingUser) return res.status(400).json({ message: "existingUser" })

        const hashedPassword = await bcrypt.hash(password, 10)

        const result = await db.collection('users').insertOne({
            name,
            email,
            password: hashedPassword
        })

        res.status(201).json({ message: 'User Registered Successfully' })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});


app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        //const db = getDB()

        console.log("Login attempt:", email, password);

        const user = await db.collection('users').findOne({ email });
        console.log("Found user in DB:", user);

        if (!user) return res.status(401).json({ message: 'Invalid email' });

        const isMatch = await bcrypt.compare(password, user.password);
        console.log("Password match result:", isMatch);

        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

        const token = jwt.sign(
            { id: user._id.toString() },
            JWT_SECRET
        )

        res.json(
            {
                token,
                user: {
                    name: user.name,
                    email: user.email
                }
            }
        )

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})



/* ================= USER (DASHBOARD DATA) ================= */

app.get('/user', authenticate, async (req, res) => {
    try {
        const user = await db.collection('users').findOne(
            { _id: new ObjectId(req.userId) },
            { projection: { password: 0 } }
        );

        if (!user)
            return res.status(404).json({ message: 'User not found' });

        res.json({
            name: user.name,
            email: user.email
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})
