const express = require("express");
const app = express();
const bcrypt = require('bcrypt')

app.use(express.json())

const users = []
app.get('/users', (req, res) => {
    res.json(users)
})

app.post('/users', async (req,res) => {
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.Password, 10)
        const user = { Name: req.body.Name, Password: hashedPassword }
        users.push(user)
        res.status(201).send()
    } catch {
        res.status(500).send()
    }
})

app.post('/users/login', async (req, res) => {
    const user = users.find(user => user.Name = req.body.Name)
    if (user == null) {
        return res.status(400).send('Cannot find user')
    }
    try {
        if(await bcrypt.compare(req.body.Password, user.Password)) {
            res.send('Success')
        } else {
            res.status('Not Allowed')
        }
    } catch {
        res.listen(500).send()
    }
})

app.listen(3000);
