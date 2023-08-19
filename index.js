// task #1

let express = require('express');

const app = express();

const users = [
    { id: 1, name: 'Pasha', isMan: true, age: 25 },
    { id: 2, name: 'Yura', isMan: true, age: 33 },
    { id: 3, name: 'Olga', isMan: false, age: 63 },
    { id: 4, name: 'Elena', isMan: false, age: 22 },
];

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/users', (req, res) => {
    res.send(users);
});

app.post('/user', (req, res) => {
    users.push(req.body);
    res.send(req.body);
});

app.put('/user/:id', (req, res) => {
    const updatedUsers = users.map( i => i.id == req.params.id ? req.body : i );
    users.splice(0, users.length, ...updatedUsers);
    res.send(updatedUsers);
});

app.patch('/user/:id', (req, res) => {
    const updatedUsers = users.map( i => i.id == req.params.id ? { ...i, name: req.body.name } : i );
    users.splice(0, users.length, ...updatedUsers);
    res.send(updatedUsers);
});

app.delete('/user/:id', (req, res) => {
    const id = users.findIndex(i => i.id == req.params.id);
    users.splice(id, 1);
    id === -1 ? res.send('false') : res.send('true');
});

app.get('/users/:gender', (req, res) => {
    if (req.params.gender === 'M') {
        res.send(users.filter(el => el.isMan));
    }
    if (req.params.gender === 'F') {
        res.send(users.filter(el => !el.isMan));
    }
});

app.get('/filtredUsers', (req, res) => {
    res.send( users.filter( el => el.age > req.query.min && el.age < req.query.max )
    );
});

const port = 3000;
app.listen(port, () => {
    console.log('Server started');
});
