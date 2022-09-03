// global selectors
const form = document.querySelector('form');
const error = document.querySelector('.error-msg');
const textAreaTitle = document.querySelector('.text-area__title');
const textAreaNote = document.querySelector('.text-area__note');
const noteList = document.querySelector('.note__list');
const noNotes = document.querySelector('.no-notes');
const modal = document.querySelector('.modal');
const modalContainer = document.querySelector('.modal__container');
const modalTitle = document.querySelector('.modal__title');
const modalBody = document.querySelector('.modal__content');
const modalClose = document.querySelector('.modal__close');
const line = document.querySelector('hr');

// event listeners
form.addEventListener('submit', addNote);
noteList.addEventListener('click', deleteNote);
noteList.addEventListener('click', viewModal);
modalClose.addEventListener('click', () => {
  modalContainer.classList.remove('active');
})
document.addEventListener('click', (e) => {
  const modal = document.querySelector('.modal');
  if(e.target !== modal && e.target !== modalTitle && e.target !== modalBody && e.target !== line){
    modalContainer.classList.remove('active');
  }
  // if(e.target !== modal){
  //   e.stopPropagation();
  //   modalContainer.classList.remove('active');
  // }
})
document.addEventListener('DOMContentLoaded', getLocalNotes);

// functions
function addNote(e){
  e.preventDefault();

  const textAreaTitleInput = document.createElement('h3');
  textAreaTitleInput.classList.add('note__title');
  textAreaTitleInput.innerText = textAreaTitle.value;

  const textAreaNoteInput = document.createElement('p');
  textAreaNoteInput.classList.add('note__desc')
  textAreaNoteInput.innerText = textAreaNote.value;

  if(textAreaTitle.value === '' || textAreaNote.value === ''){
    error.style.display = 'block';
    return;
  } 
  else{
    error.style.display = 'none';
    textAreaTitle.value = '';
    textAreaNote.value = '';
    noNotes.remove();
  }

  // omitText(textAreaNoteInput, 35);

  const noteDiv = document.createElement('div');
  noteDiv.classList.add('note');

  const data = {
    title: textAreaTitleInput.innerText, 
    desc: textAreaNoteInput.innerText
  }

  saveLocalNotes(data);

  const viewBtn = document.createElement('button');
  viewBtn.classList.add('view-btn');
  viewBtn.innerText = 'View Detail';

  const deleteBtn = document.createElement('button');
  deleteBtn.classList.add('delete-btn');
  deleteBtn.innerText = 'Delete';

  noteDiv.appendChild(textAreaTitleInput);
  noteDiv.appendChild(textAreaNoteInput);
  noteDiv.appendChild(viewBtn);
  noteDiv.appendChild(deleteBtn);

  noteList.appendChild(noteDiv);

  if(noteList.children.length > 1){
    noteList.style.gridTemplateColumns = '50% 50%';
  } else{
    noteList.style.gridTemplateColumns = '100%';
  }
}

// css ellipsis is the saviour xD

// function omitText(textAreaNoteInput, limit) {
//   const MAX_BODY_LENGTH = limit;

//   if(textAreaNoteInput.innerText.length > MAX_BODY_LENGTH){
//     textAreaNoteInput.innerHTML = `
//     ${textAreaNoteInput.innerText.substring(0, MAX_BODY_LENGTH)}
//     ${textAreaNoteInput.innerText.length > MAX_BODY_LENGTH ? '...' : ''}
//     `;
//   }
// }

// function omitText(textAreaNoteInput, limit) {
//   let MAX_BODY_LENGTH = limit;

//   if(textAreaNoteInput.innerText.length > MAX_BODY_LENGTH){
//     let text = textAreaNoteInput.innerText;
//     text = text.substring(0, MAX_BODY_LENGTH);
//     console.log(text);
//     textAreaNoteInput.innerHTML = `
//       ${text}...
//     `;
//   }
// }

function deleteNote(e){

  if(e.target.classList.contains('delete-btn')){
    e.target.parentElement.remove();
  }

  // console.log(e.target.parentElement.children[0].innerText);
  deleteLocalNotes(e.target.parentElement.children[0].innerText);

  if(noteList.children.length > 1){
    noteList.style.gridTemplateColumns = '50% 50%';
  } 
  else if(noteList.children.length === 0){
    noteList.appendChild(noNotes);
  } 
  else{
    noteList.style.gridTemplateColumns = '100%';
  }
}

function viewModal(e){
  e.stopPropagation(); // stopPropagation() is used to prevent click event on document from firing
  // console.log(e.target);
  if(e.target.classList.contains('view-btn')){
    modalContainer.classList.add('active');
    modalTitle.innerText = e.target.previousElementSibling.previousElementSibling.innerText;
    modalBody.innerText = e.target.previousElementSibling.innerText;

    console.log('clicked')
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

function deleteLocalNotes(title){
  let localNotes;

  if(localStorage.getItem('notes') === null){
    localNotes = [];
  } 
  else{
    localNotes = JSON.parse(localStorage.getItem('notes'));
  }

  localNotes.forEach(localNote => {
    if(localNote.title === title){
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

  if(localNotes.length === 0){
    return;
  } 
  else{
    noNotes.remove();

    localNotes.forEach(localNote => {
      console.log('executed!');
  
      const textAreaNoteInput = document.createElement('p');
      textAreaNoteInput.classList.add('note__desc')
      textAreaNoteInput.innerText = localNote.desc;
    
      const noteDiv = document.createElement('div');
      noteDiv.classList.add('note');
    
      const textAreaTitleInput = document.createElement('h3');
      textAreaTitleInput.classList.add('note__title');
      textAreaTitleInput.innerText = localNote.title;
    
      const viewBtn = document.createElement('button');
      viewBtn.classList.add('view-btn');
      viewBtn.innerText = 'View Detail';
    
      const deleteBtn = document.createElement('button');
      deleteBtn.classList.add('delete-btn');
      deleteBtn.innerText = 'Delete';
    
      noteDiv.appendChild(textAreaTitleInput);
      noteDiv.appendChild(textAreaNoteInput);
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
}