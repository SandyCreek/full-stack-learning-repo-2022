var express = require('express');
var app = express();
const { db } = require("./util/admin.js");
const PORT = process.env.PORT || 5050

/*
app.get('/', (req, res) => {
    res.send('This is my demo project')
})
app.listen(PORT, function () {
    console.log(`Demo project at: ${PORT}!`); 
});
*/

app.use(express.json());
app.use(express.urlencoded());

app.get("/todo", function(req, res) {
    const body = req.body;
    console.log(req.body);
    console.log(getByUsername(body["username"]));
    res.status(200).json(getByUsername(body["username"]));
});

app.listen(PORT, function() {
    console.log(`Running at ${PORT}`);
});

async function getByUsername(username){
    const docs = await db.collection("todo").where("username", "==", username).get();
    //console.log(docs.data());
    var matches = [];
    docs.forEach(
        doc => {
            console.log(doc.data());
            matches.push(doc.data());
        }
    );
    return matches;
}

let temp = getByUsername("b1168");

console.log(temp);

/*
app.get('/todo', (req, res) => {
    res.setEncoding(f());
});
app.


if (!todo.exists) {
    console.log('not found');
}
else{
    console.log(doc.data());
}
*/