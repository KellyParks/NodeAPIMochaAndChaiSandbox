const express = require('express');
const app = express();

app.use(express.json());
const genres = require('./data.js');

app.get('/api/genres', (request, response) => {
    response.send(genres);
});

app.get('/api/genres/:id', (request, response) => {
    const existingGenre = findGenre(request.params.id);

    if (!existingGenre) {
        //use return here because we don't want the rest of the code to be executed if there is an error
        return response.status(404).send('The genre for the passed ID was not found.');
    }

    response.send(existingGenre);
});

app.post('/api/genres', (request, response) => {
    const isValid = isValidGenreName(request.body.genre);

    if (!isValid) {
        return response.status(400).send("Invalid genre name.");
    }
  
    const genre = {
      id: genres.length + 1,
      genre: request.body.genre,
    };

    genres.push(genre);
    response.send(genre);
});

app.put('/api/genres/:id', (request, response) => {
    const existingGenre = findGenre(request.params.id);

    if (!existingGenre) {
        return response.status(404).send('The genre for the passed ID was not found.');
    }
    
    const isValid = isValidGenreName(request.body.name); 
    if (!isValid) {
        return response.status(400).send("Invalid genre name.");
    }
    
    existingGenre.genre = request.body.name; 
    response.send(existingGenre);
});

function isValidGenreName(name) {
    if (!name || name.length < 3) {
        return false;
    }
    return true;
}

function findGenre(genreId) {
    return genres.find(c => c.id === parseInt(genreId));
}

/* 
When you deploy this application to a hosting environment,
the port of dynamically assigned by the hosting environment. You 
can fix this with environment variables. 
'process' is a global oject in node. We can set the value of the
env.PORT property ourselves. We can do that in terminal by running:

export PORT = 5000

Which will set the port to 5000 on the environment variable. We should
always try to read the property at 'process.env.PORT' first, then use
an arituary number as a default if it's not set.
*/
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

module.exports = app;