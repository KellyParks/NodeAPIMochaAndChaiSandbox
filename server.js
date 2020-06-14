const express = require('express');
const app = express();

const genres = [
    { id: 1, genre: 'Science Fiction' },
    { id: 2, genre: 'Fantasy' },
    { id: 3, genre: 'Thriller' },
];

app.get('/api/genres', (request, response) => {
    response.send(genres);
});

app.get('/api/genres/:id', (request, response) => {
    const existingGenre = findGenre(request.params.id);

    if (!existingGenre) {
        //use return here because we don't want the rest of the code to be executed if there is an error
        return response.status(404).send('The genre for the passed ID was not found.');
    }

    response.send(genre);
});

app.post('/api/genres', (request, response) => {
    const error = isValidGenreName(request.body);

    if (error) {
        return response.status(400).send("Invalid genre name.");
    }
  
    const genre = {
      id: genres.length + 1,
      name: request.body.name,
    };

    genres.push(genre);
    response.send(genre);
});

app.put('/api/genres/:id', (request, response) => {
    const existingGenre = findGenre(request.params.id);

    if (!existingGenre) {
        return response.status(404).send('The genre for the passed ID was not found.');
    }
  
    const error = validateGenre(request.body.name); 
    if (error) {
        return response.status(400).send("Invalid genre name.");
    }
    
    genre.name = request.body.name; 
    response.send(genre);
});


app.get('/api/courses', (request, response) => {
    response.send(courses);
});

app.get('/api/courses/:id', (request, response) => {
    course = courses.find(c => c.id === parseInt(request.params.id));
    if(!course){
        response.status(404).send('The id was not found');
    }
    response.send(course);
});

function isValidGenreName(name) {
    if (!name || name.length < 3) {
        return false;
    }
    return true;
}

function findGenre(genreId) {
    return genres.find((c) => {
        c.id === parseInt(genreId);
    });
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