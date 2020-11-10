const express = require('express') // import express
const app = express() // a function that create express app assigned to app variable
const cors = require('cors');

app.use(cors())
// default json data
let notes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2019-05-30T17:30:31.098Z",
    important: true
  },
  {
    id: 2,
    content: "Browser can execute only Javascript",
    date: "2019-05-30T18:39:34.091Z",
    important: false
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2019-05-30T19:20:14.298Z",
    important: true
  }
]

// get notes
app.get('/', (request, response) => {
  response.send('<h1> ABCDEFDHIJ </>')
})

app.get('/api/notes', (request, response) => {
  response.json(notes);
})

app.get('/api/notes/:id', (request, response) => {// vi route co :id => phai truy xuat qua req.PARAMS.id

  const id = Number(request.params.id); // truy xuat thuoc tinh qua request.params.<attr>, tra ve dang string  
  //console.log(id);
  const note = notes.find(note => {
    //console.log(note, typeof note, note.id, typeof note.id, note.id === id, typeof id);

    return note.id === id;
  })

  if (note) {
    console.log(note);
    response.json(note)
  } else {
    response.status(404).end();

  }

})

//use post to create new note

app.use(express.json());// to use the request.body. without it=> body will be undefined

//choose id for new note( max note.id +1)
const generateID = () => {
  const maxId = notes.length > 0
    ? Math.max(...notes.map(note => note.id))
    : 0
  return maxId + 1;
}
app.post('/api/notes', (request, response) => {
  const note = request.body // neu ko co express.json => body is null
                            // body truy xuat phan tu kieu key:value trong request

  if(!note.content){
    return response.status(400).json({
      error: 'bad request-content missing'
    })
  }

  const newNote = {
    content: note.content,
    important: note.important || false,
    date: new Date(),
    id: generateID()
  }
  
 
  // console.log('headers ',request.headers);
  notes = notes.concat(newNote);
  response.json(newNote)
})


//use app.delete to delete note
app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id);
  console.log('delete id ', id)
  notes = notes.filter(note => note.id !== id);
  console.log('remain notes ', notes)

  //console.log(notes);
  response.status(204).end();
})

// create server
const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
