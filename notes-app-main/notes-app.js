let notes = getSavedNotes()

const filters = {
    searchText: ''
}

// const user = {
//     name: 'Andrew',
//     age: 27
// }
// const userJSON = JSON.stringify(user)
// console.log(userJSON)
// localStorage.setItem('user', userJSON)




renderNotes(notes, filters)

document.querySelector('#create-note').addEventListener('click', function (e) {
    const id = uuidv4()
    notes.push({
        id: id,
        title: '',
        body: ''
    })

    savedNotes(notes)
    location.assign(`/edit.html#${notes.id}`)
    // renderNotes(notes, filters)
})

document.querySelector('#search-text').addEventListener('input', function (e) {
    filters.searchText = e.target.value
    renderNotes(notes, filters)
})

document.querySelector('#filter-by').addEventListener('change', function (e) {
    console.log(e.target.value)
})

window.addEventListener('storage', (e) => {
    if (e.key === 'notes') {
        notes = JSON.parse(e.newValue)
        renderNotes(notes, filters)
    }
})

const now = new Date()
console.log(now.toString())