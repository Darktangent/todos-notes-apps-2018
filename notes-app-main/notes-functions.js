// Read existing notes from localStorage
const getSavedNotes = function () {
    const notesJSON = localStorage.getItem('notes')

    if (notesJSON !== null) {
        return JSON.parse(notesJSON)
    } else {
        return []
    }
}

//remove a note

const removeNote = function (id) {

    const noteIndex = notes.findIndex(function (note) {
        return note.id === id
    })

    if (noteIndex > -1) {
        notes.splice(noteIndex, 1)
    }
}

// generate dom structure for note

const generateNoteDOM = (note) => {



    const noteEl = document.createElement('div')
    const textEl = document.createElement('a')
    const button = document.createElement('button')


    //setup remove note button
    button.textContent = 'x'
    noteEl.appendChild(button)
    button.addEventListener('click', function () {
        removeNote(note.id)
        savedNotes(notes)
        renderNotes(notes, filters)
    })











    //setting up note title
    if (note.title.length > 0) {
        textEl.textContent = note.title
    } else {
        textEl.textContent = 'Enter a note to begin. Clicking this button wont magically create a note!!'
    }
    textEl.setAttribute('href', `/edit.html#${note.id}`)
    noteEl.appendChild(textEl)
    return noteEl
}

//save notes to local storage

const savedNotes = (notes) => {
    localStorage.setItem('notes', JSON.stringify(notes))
}


//render application notes
const renderNotes = function (notes, filters) {
    const filteredNotes = notes.filter(function (note) {
        return note.title.toLowerCase().includes(filters.searchText.toLowerCase())
    })

    document.querySelector('#notes').innerHTML = ''

    filteredNotes.forEach(function (note) {
        //generating DOM
        const noteEl = generateNoteDOM(note)

        document.querySelector('#notes').appendChild(noteEl)
    })
}