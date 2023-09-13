const express = require('express');
const app = express();


const prisma = require('./db');

app.use(express.json());

//USER
//get all users
app.get('/users', async (req, res) => {
    const users = await prisma.user.findMany();
    res.send(users);

});


// Create user
// let nextUserId = 1; // Initialize the next user ID

app.post('/user', async (req, res) => {
    try {
        const userData = {
            // id: nextUserId, // Assign the next ID
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        };

        const user = await prisma.user.create({
            data: userData
        });

        // nextUserId++; // Increment the next user ID
        res.send(user);
    } catch (error) {
        console.log("error");
        res.status(400).send(err);
    }
});

//delete user
app.delete('/user/:id', async (req, res) => {
    try {
        const user = await prisma.user.delete({
            where: { id: parseInt(req.params.id) }
        });
        res.send(user);
    } catch (err) {
        res.status(400).send(err);``
    }
});

//update user by id
app.patch('/user/:id', async (req, res) => {
    try {
        const user = await prisma.user.update({
            where: { id: parseInt(req.params.id) },
            data: req.body
        });
        res.send(user);
    }
    catch (err) {
        res.status(400).send(err);
    }

});



//--------------SHOPERS----------//

//Get all shoppers
app.get('/shoppers', async (req, res) => {


    const shoppers = await prisma.shop.findMany();
    res.send(shoppers);
});



//Post shoppers
app.post('/shopper', async (req, res) => {
    try {
        const shopperData = {
            name: req.body.name,
            address: req.body.address,
            phone: req.body.phone,        
            email: req.body.email,
            userId: req.body.userId
            
        };
        const shopper = await prisma.shop.create({
            data: shopperData
        });
        res.send(shopper);
    }
    catch (err) {
        res.status(400).send(err);
    }
});

//delete shopper
app.delete('/shopper/:id', async (req, res) => {
    try{
        const shopper = await prisma.shopper.delete({
            where: { id: parseInt(req.params.id) }
        });
        res.send(shopper);
    }
    catch(err){
        res.status(400).send(err);
    }

});



//update shopper by id
app.patch('/shopper/:id', async (req, res) => {
    try {
        const shopper = await prisma.shopper.update({
            where: { id: parseInt(req.params.id) },
            data: req.body
        });
        res.send(shopper);
    }
    catch (err) {
        res.status(400).send(err);
    }

});


app.listen(3000, () => console.log('Server running on port 3000'));

