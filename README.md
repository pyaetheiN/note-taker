# Note Taker 

My take on a Beginner JavaScript project.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the site depending on their device's screen size
- View details via pop-up modal
- Delete notes
- Receive an error message when the `form` is submitted if:
  - Any `input` field is empty. The message for this error should say *"Please enter all the fields"*

### Screenshot

![](/solution-design/mobile-preview.png)

### Links

- Live Site URL: https://pyaethein.github.io/note-taker/

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- SASS
- Vanilla JavaScript

### What I learned

- truncating string with ellipsis
- using `pointer-events: auto` to enable pointer-events only on the modal 
 - why? to prevent pointer-events from reaching delete btn
 - as a result, we can't use `stopPropagation()` because pointer-events are enabled (click events)
- using `stopPropagation()` method again on view button to prevent click event on document from firing

```css
.note__desc{
  overflow: hidden;
  text-overflow: ellipsis;
}
```

```js
document.addEventListener('click', (e) => {
  // if(e.target !== modal){
  //   e.stopPropagation;
  //   modalContainer.classList.remove('active');
  // }
  const modal = document.querySelector('.modal');
  if(e.target !== modal && e.target !== modalTitle && e.target !== modalBody && e.target !== line){
    modalContainer.classList.remove('active');
  }
})
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
```

### Useful resources

- https://css-tricks.com/snippets/css/truncate-string-with-ellipsis/
- https://www.youtube.com/watch?v=Dat21TyS6_w
- https://stackoverflow.com/questions/22028369/unable-to-click-on-items-in-modal-window
- https://stackoverflow.com/questions/5299740/stoppropagation-vs-stopimmediatepropagation
- https://javascript.info/bubbling-and-capturing

## Author

- Email - pyaethein246@gmail.com
- Twitter - [@pt_boyyy](https://www.twitter.com/pt_boyyy)