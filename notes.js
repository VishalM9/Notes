const express = require('express'); 
const Joi = require('joi'); 
const app = express(); 
app.use(express.json()); 
 
//Give data to the server
const notes = [
{id: 1, Description:'Let us learn about Node js today' },
{id: 2, Description:'Let us learn about API today' },
{id: 3,Description:'Let us learn about Postman today' },
]
 
//Read Request Handlers
// Display the Message when the URL consist of '/'
app.get('/', (req, res) => {
res.send('Welcome to Notes!');
});
// Display the List Of notes when URL consists of api notes
app.get('/notes', (req,res)=> {
res.send(notes);
});
// Display the Information Of Specific notes when you mention the id.
app.get('/notes/:id', (req, res) => {
const note = notes.find(c => c.id === parseInt(req.params.id));
//If there is no valid notes ID, then display an error with the following message
if (!note) res.status(404).send('<h2 style="font-family: Malgun Gothic; color: darkred;">Ooops... Cant find what you are looking for!</h2>');
res.send(note);
});
 
//CREATE Request Handler
//CREATE New notes Information
app.post('/notes', (req, res)=> {
 
const { error } = validatenotes(req.body);
if (error){
res.status(400).send(error.details[0].message)
return;
}
//Increment the notes id
const note = {
id: notes.length + 1,

Description: req.body.Description
};
notes.push(note);
res.send(note);
});
 
//Update Request Handler
// Update Existing notes Information
app.put('/notes/:id', (req, res) => {
const note = notes.find(c=> c.id === parseInt(req.params.id));
if (!note) res.status(404).send('<h2 style="font-family: Malgun Gothic; color: darkred;">Not Found!! </h2>');
 
const { error } = validatenotes(req.body);
if (error){
res.status(400).send(error.details[0].message);
return;
}
 

note.Description=req.body.Description;
res.send(note);
});
 
//Delete Request Handler
// Delete notes Details
app.delete('/notes/:id', (req, res) => {
 
const note = notes.find( c=> c.id === parseInt(req.params.id));
if(!note) res.status(404).send('<h2 style="font-family: Malgun Gothic; color: darkred;">Not Found!!</h2>');
 
const index = notes.indexOf(note);
notes.splice(index,1);
 
res.send(note);
});
//Validate Information
function validatenotes(note) {
const schema = Joi.object({
Description: Joi.string().min(3).required()
});
const validation = schema.validate(note);
return validation;
 
}
 
//PORT ENVIRONMENT VARIABLE
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));