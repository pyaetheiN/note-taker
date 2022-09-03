// global selectors
const form = document.querySelector('form');
const textArea = document.querySelector('textarea');
const noteList = document.querySelector('.note__list');
const noNotes = document.querySelector('.no-notes');
const modalContainer = document.querySelector('.modal__container');
const modalTitle = document.querySelector('.modal__title');
const modalBody = document.querySelector('.modal__content');
const modalClose = document.querySelector('.modal__close');
const notes = document.querySelectorAll('.note');

// event listeners
form.addEventListener('submit', addNote);
noteList.addEventListener('click', deleteNote);
noteList.addEventListener('click', viewModal);
modalClose.addEventListener('click', () => {
  modalContainer.classList.remove('active');
})
window.addEventListener('click', (e) => {
  const modal = document.querySelector('.modal');
  if(e.target !== modal && e.target !== modalTitle && e.target !== modalBody){
    modalContainer.classList.remove('active');
  }
})
document.addEventListener('DOMContentLoaded', getLocalNotes);

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

  console.log(textAreaInput.innerText.length);

  // omitText(textAreaInput, 35);

  const noteDiv = document.createElement('div');
  noteDiv.classList.add('note');

  const noteIndex = document.createElement('h3');
  noteIndex.classList.add('note__index');
  
  // noteList.children.length = zero by default
  // console.log(noteList.children.length);
  const updatedNoteIndex = noteList.children.length + 1;
  noteIndex.innerText = `Note ${updatedNoteIndex}`;

  const data = {
    index: updatedNoteIndex, 
    desc: textAreaInput.innerText
  }
  saveLocalNotes(data);

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

// css ellipsis is the saviour

// function omitText(textAreaInput, limit) {
//   const MAX_BODY_LENGTH = limit;

//   if(textAreaInput.innerText.length > MAX_BODY_LENGTH){
//     textAreaInput.innerHTML = `
//     ${textAreaInput.innerText.substring(0, MAX_BODY_LENGTH)}
//     ${textAreaInput.innerText.length > MAX_BODY_LENGTH ? '...' : ''}
//     `;
//   }
// }

// function omitText(textAreaInput, limit) {
//   let MAX_BODY_LENGTH = limit;

//   if(textAreaInput.innerText.length > MAX_BODY_LENGTH){
//     let text = textAreaInput.innerText;
//     text = text.substring(0, MAX_BODY_LENGTH);
//     console.log(text);
//     textAreaInput.innerHTML = `
//       ${text}...
//     `;
//   }
// }

function deleteNote(e){

  if(e.target.classList.contains('delete-btn')){
    e.target.parentElement.remove();
  }

  console.log(e.target.parentElement.children[1].innerText);
  deleteLocalNotes(e.target.parentElement.children[1].innerText);

  if(noteList.children.length > 1){
    noteList.style.gridTemplateColumns = '50% 50%';
  } 
  else if(noteList.children.length === 0){
    noteList.appendChild(noNotes);
  } 
  else{
    noteList.style.gridTemplateColumns = '100%';
  }

  // deleteLocalNotes(e.)
}

function viewModal(e){
  e.stopPropagation();

  if(e.target.classList.contains('view-btn')){
    modalContainer.classList.add('active');
    modalTitle.innerText = e.target.previousElementSibling.previousElementSibling.innerText;
    modalBody.innerText = e.target.previousElementSibling.innerText;
  }
}

function saveLocalNotes(note){
  let localNotes;

  if(localStorage.getItem('notes') === null){
    localNotes = [];
  } 
  else{
    localNotes = JSON.parse(localStorage.getItem('notes'));
  }

  localNotes.push(note);
  localStorage.setItem('notes', JSON.stringify(localNotes));
}

function deleteLocalNotes(desc){
  let localNotes;

  if(localStorage.getItem('notes') === null){
    localNotes = [];
  } 
  else{
    localNotes = JSON.parse(localStorage.getItem('notes'));
  }

  localNotes.forEach(localNote => {
    if(localNote.desc === desc){
      localNotes.splice(localNotes.indexOf(localNote), 1);
    }
  })

  localStorage.setItem('notes', JSON.stringify(localNotes));
}

function getLocalNotes(){
  let localNotes;

  if(localStorage.getItem('notes') === null){
    localNotes = [];
  } 
  else{
    localNotes = JSON.parse(localStorage.getItem('notes'));
  }

  if(notes.length === 0){
    noNotes.remove();
    console.log('removed!');
  }

  localNotes.forEach(localNote => {
    console.log('executed!');

    const textAreaInput = document.createElement('p');
    textAreaInput.classList.add('note__desc')
    textAreaInput.innerText = localNote.desc;
  
    const noteDiv = document.createElement('div');
    noteDiv.classList.add('note');
  
    const noteIndex = document.createElement('h3');
    noteIndex.classList.add('note__index');
  
    const updatedNoteIndex = localNote.index;
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
  })
}