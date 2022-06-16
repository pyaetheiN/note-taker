// selectors
const form = document.querySelector('form');
const textArea = document.querySelector('textarea');
const noteList = document.querySelector('.note__list');
const noNotes = document.querySelector('.no-notes');

// event listeners
form.addEventListener('submit', addNote);
noteList.addEventListener('click', deleteNote);
// noteList.addEventListener('click', viewModal);

// functions
function addNote(e){
  e.preventDefault();

  const textAreaInput = document.createElement('p');
  textAreaInput.classList.add('note__desc')
  textAreaInput.innerText = textArea.value;

  if(textArea.value === ''){
    return;
  } else{
    textArea.value = '';
    noNotes.remove();
  }

  // omit text
  const MAX_BODY_LENGTH = 60;

  if(textAreaInput.innerText.length > MAX_BODY_LENGTH){
    textAreaInput.innerHTML = `
    ${textAreaInput.innerText.substring(0, MAX_BODY_LENGTH)}
    ${textAreaInput.innerText.length > MAX_BODY_LENGTH ? '...' : ''}
    `;
  }

  console.log(textAreaInput.innerText.length);

  const noteDiv = document.createElement('div');
  noteDiv.classList.add('note');

  const noteIndex = document.createElement('h3');
  noteIndex.classList.add('note__index');
  
  // noteList.children.length = zero by default
  // console.log(noteList.children.length);
  const updatedNoteIndex = noteList.children.length + 1;
  noteIndex.innerText = `Note ${updatedNoteIndex}`;

  const viewBtn = document.createElement('button');
  viewBtn.classList.add('view-btn');
  viewBtn.innerText = 'View Detail';

  const deleteBtn = document.createElement('button');
  deleteBtn.classList.add('delete-btn');
  deleteBtn.innerText = 'Delete';

  noteDiv.appendChild(noteIndex);
  noteDiv.appendChild(textAreaInput);
  noteDiv.appendChild(viewBtn);
  noteDiv.appendChild(deleteBtn);

  noteList.appendChild(noteDiv);

  if(noteList.children.length > 1){
    noteList.style.gridTemplateColumns = '50% 50%';
  } else{
    noteList.style.gridTemplateColumns = '100%';
  }
}

function deleteNote(e){

  if(e.target.classList.contains('delete-btn')){
    e.target.parentElement.remove();

    // if(noteList.children.length = 1){
    //   noteList.appendChild(noNotes);
    // }
  }

  // for(i = 0; i < noteList.children.length; i++){
  //   // console.log(noteList.children.length);
  //   const updatedNoteIndex = noteList.children.length - 1;
  //   // e.target.previousElementSibling.previousElementSibling.previousElementSibling.innerText = `Note ${updatedNoteIndex}`;
  //   // console.log(updatedNoteIndex);
  // }
}

// function viewModal(e){

//   if(e.target.classList.contains('view-btn')){

//   }
// }