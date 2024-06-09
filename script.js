const addNoteButton = document.getElementById("add");
const savedNotes = JSON.parse(localStorage.getItem("notes"));

const saveNotes = () => {
  const noteTextAreas = document.querySelectorAll("textarea");
  const notes = [];
  noteTextAreas.forEach((textarea) => notes.push(textarea.value));
  localStorage.setItem("savedNotes", JSON.stringify(notes));
};

const createNewNote = (text = "") => {
  const newNoteElement = document.createElement("div");
  newNoteElement.classList.add("note");
  newNoteElement.innerHTML = `
    <div class="tools">
      <button class="edit"><i class="fas fa-edit"></i></button>
      <button class="delete"><i class="fas fa-trash-alt"></i></button>
    </div>
    <div class="main ${text ? "" : "hidden"}"></div>
    <textarea class="${text ? "hidden" : ""}"></textarea>`;

  const editButtonElement = newNoteElement.querySelector(".edit");
  const deleteButtonElement = newNoteElement.querySelector(".delete");
  const mainElement = newNoteElement.querySelector(".main");
  const textAreaElement = newNoteElement.querySelector("textarea");
  textAreaElement.value = text;
  mainElement.innerHTML = marked(text);

  deleteButtonElement.addEventListener("click", () => {
    newNoteElement.remove();
    saveNotes();
  });
  editButtonElement.addEventListener("click", () => {
    mainElement.classList.toggle("hidden");
    textAreaElement.classList.toggle("hidden");
  });
  textAreaElement.addEventListener("input", (event) => {
    const { value } = event.target;
    mainElement.innerHTML = marked(value);
    saveNotes();
  });
  document.body.appendChild(newNoteElement);
};

addNoteButton.addEventListener("click", () => createNewNote());

if (savedNotes) {
  savedNotes.forEach((note) => createNewNote(note));
}
