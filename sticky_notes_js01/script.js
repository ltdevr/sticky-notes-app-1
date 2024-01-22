const notesContainer = document.getElementById("app");
const addNoteButton = notesContainer.querySelector(".add-note");

let current = new Date();
let cDate = current.getFullYear() + '-' + (current.getMonth() + 1) + '-' + current.getDate();
let dateTime = cDate;


addNoteButton.addEventListener("click", () => addNote());
/* addNoteButton.addEventListener("focus", () => addNote()); */

function getNotes() {
    return JSON.parse(localStorage.getItem("stickynotes-notes") || "[]");
}

getNotes().forEach((note) => {
    const noteElement = createNoteElement(note.id, note.content);
    notesContainer.insertBefore(noteElement, addNoteButton);
});

function saveNotes(note) {
    localStorage.setItem("stickynotes-notes", JSON.stringify(note));
}
/* function saveNotes(notes) {
    localStorage.setItem("stickynotes-notes", JSON.stringify(notes));
} */

function createNoteElement(id, content) {
    const element = document.createElement("textarea");
    /* const current = new Date();
    const cDate = current.getFullYconst() + '-' + (current.getMonth() + 1) + '-' + current.getDate();
    const cTime = current.getHours() + ":" + current.getMinutes() + ":" + current.getSeconds();
    const dateTime = cDate + ' ' + cTime; */
    /* let dateTime = cDate; */

    element.classList.add("note");
    /* element.value = content; */
    element.value = dateTime + "\n" + content;
   

        element.addEventListener("change", () => {
        updateNote(id, element.value);
    });

    element.addEventListener("dblclick", () => {
        /* const doDelete = ('#confirm("Delete this note?")'); */
        /* var confirmBox = ("#confirm"); */
        
        /* const doDelete = confirmBox("Delete this note?"); */
        const doDelete = confirm("Delete this note?");
        /* confirmBox.find(".message").text(msg);
            confirmBox.find(".yes").unbind().click(function () {
                confirmBox.hide();
            });
            confirmBox.find(".yes").click(myYes);
            confirmBox.show(); */

        if (doDelete) {
            deleteNote(id, element);
        }
    });

    return element;
}

function addNote() {
    const notes = getNotes();
    const noteObject = {
        id: Math.floor(Math.random() * 100000),
        content: ""
        /* content: "" + dateTime */
    };

    const noteElement = createNoteElement(noteObject.id, noteObject.content);
    notesContainer.insertBefore(noteElement, addNoteButton);
    

    notes.push(noteObject);
    saveNotes(notes);
    /* saveNotes(notes + dateTime); */
    /* notesContainer.addEventListener("focus", noteObject); */
}


function updateNote(id, newContent) {
    const notes = getNotes();
    const targetNote = notes.filter(note => note.id == id)[0];

    targetNote.content = newContent;
    saveNotes(notes);
}

function deleteNote(id, element) {
    const notes = getNotes().filter(note => note.id != id);

    saveNotes(notes);
    notesContainer.removeChild(element);
}