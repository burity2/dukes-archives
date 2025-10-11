// stores books
const myLibrary = [];

//start the page with the book function
window.onload = function() {
    let form = document.querySelector("#book-form");
    form.style.display="none";
    libSorter();
    bookDisplayer();
    emptyLibraryMessage();
};

//deletes book divs
let libraryClean = () => {
    let bookDivSelector = document.querySelectorAll(".book-div");
    bookDivSelector.forEach(element => {element.remove();

    });
}

//clear library btn
let libClearButton = document.getElementById("clear-library")
libClearButton.addEventListener("click", () => {
    let checker = () => {
        let result = confirm("this will delete all your books, are you sure?");
        if (result == true) {
            let clearLib = () => {myLibrary.splice(0, myLibrary.length)}
            clearLib();
            libraryClean();
            let p = document.getElementById("subtitle");
            p.innerHTML = "What have you done..."
        } else {
            let p = document.getElementById("subtitle");
            p.innerHTML = "Please, do not repeat this joke"
        }
    }
    checker();
})

//library refresher (delete books + display them again)
let libraryRefresher = () => {
    libSorter();
    libraryClean();
    bookDisplayer();
    emptyLibraryMessage();
}

//hide/shows form
let displayForm = document.querySelector("#form-toggler");
displayForm.addEventListener("click", () => {

    let form = document.querySelector("#book-form");
    form.style.display="grid";
    displayForm.disabled = true;

});

let hideForm = document.querySelector("#form-closer-btn");
hideForm.addEventListener("click", () => {
        
    let form = document.querySelector("#book-form");
    form.style.display="none";
    displayForm.disabled=false;
})

// creates books
function Book(title, author, isRead) {
    this.title = title;
    this.author = author;
    this.isRead = isRead;

    let id = crypto.randomUUID();
    this.id = id;
    
};

// add books to the storage (library) of books
function addBookToLibrary(book){
    myLibrary.push(book)
};

// manually created 3 books & added them to Library
const book1 = new Book("Moby Dick", "Herman Melville", "false");
const book2 = new Book("Twenty thousand leagues under the sea", "Jules Verne", "true");
const book3 = new Book("There's a hole in my love cup", "Sven Erlandson", "false");

addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);

// will loop through the Library array and then display the books
let arr = myLibrary;
let bookDisplayer = () => {
    libSorter();
    for (i= 0; i < arr.length; i++) {
        let bookDivCreator = document.getElementById("library");
        let bookUl = document.createElement("div");
        bookUl.className = "book-div";
        bookDivCreator.appendChild(bookUl);
        
        bookUl.innerHTML = `<span class="book-span"><p class="title">${arr[i].title} <p class="author">, by ${arr[i].author}</span>`;
        
        if(arr[i].isRead == true || arr[i].isRead == "true") {
            bookUl.innerHTML += `<input id="${arr[i].id}" class='isRead-checkbox' type='checkbox' checked>`
        } else {
            bookUl.innerHTML += `<input id="${arr[i].id}" class='isRead-checkbox' type='checkbox'>`
        }
        
        bookUl.innerHTML += `<button id="${arr[i].id}" class='delete-book-btn'>delete</button>`
}
};

//will transform the form inputs into an object, add it to the Library array and display it
let form = document.querySelector("form");

form.addEventListener("submit", (ev) => {
    ev.preventDefault();

    let isRead = document.querySelector("input[name='book-status']:checked").value;
    let title = document.getElementById("book-title").value;
    let author = document.getElementById("book-author").value;
    let newBook = new Book(title, author, isRead);


    myLibrary.push(newBook);
    libraryRefresher();
    document.book-form.reset();
});

//delete specific books by matching book & button id
document.addEventListener("click", function(event){
    let btn = event.target;
    let arr = myLibrary;
    for (n= 0; n < arr.length; n++) {
    if (btn.className == "delete-book-btn" && btn.id == arr[n].id) {
        arr.splice(n, 1)
        libraryRefresher();
    }
}
});

//toggle isRead status of an specific books by matching book & checkbox id
document.addEventListener("click", function(event){
    let input = event.target;
    let arr = myLibrary;
    for (n= 0; n < arr.length; n++) {
    if ((input.className == "isRead-checkbox" && input.id == arr[n].id) && arr[n].isRead == "false"){
        arr[n].isRead = "true"
    } else if ((input.className == "isRead-checkbox" && input.id == arr[n].id) && arr[n].isRead == "true"){
        arr[n].isRead = "false"
    }
}
libraryRefresher();
});

//sort the array, pushing read books to its end
let libSorter = () => {
 myLibrary.sort((a, b) => {
    if (a.isRead > b.isRead) {
        return 1;
    } else {
        return -1;
    }
});
}

//display "empty library" message if all boook are deleted
let emptyLibraryMessage = () => {
    let emptyMsg = document.getElementById("empty-library-message");
    let bookDivs = document.querySelectorAll(".book-div");
    if (bookDivs.length === 0) {
        emptyMsg.style.display = "block";
    } else {
        emptyMsg.style.display = "none"
    }
}

//add Thoth's dialogue related to pressed buttons
let thothSpeaks = document.querySelector("body");
let number = () => Math.floor(Math.random() * 3);

thothSpeaks.addEventListener("click", (event) => {
    let target = event.target;
    let p = document.getElementById("subtitle");
    let phrase = number();

    switch(target.id){
        case "body", "container":
            if (phrase === 2) {
                p.innerHTML = "Are you lost, mortal?"
            } else if (phrase === 1){ 
                p.innerHTML = "Wouldn't you rather test the Library?"
            } else {
                p.innerHTML = "That's not where you click..."
            }
            break;

        case "header-img":
            if (phrase === 2) {
                p.innerHTML = "How dare you touch the sculpture of Thoth?!"
            } else if (phrase === 1){ 
                p.innerHTML = "Out of my sight, mortal!"
            } else {
                p.innerHTML = "Quit pestering me, human-size mosquito!"
            }
            break;

        case "form-toggler":
            if (phrase === 2) {
                p.innerHTML = "A new tome ready for submisson!"
            } else if (phrase === 1){ 
                p.innerHTML = "Will you read this one?"
            } else {
                p.innerHTML = "There's no more room for foolish tomes!"
            }            
            break;

        case "form-closer-btn":
            if (phrase === 2) {
                p.innerHTML = "You deny me knowledge?"
            } else if (phrase === 1){ 
                p.innerHTML = "No more books? Sad"
            } else {
                p.innerHTML = "Better to finish the ones you already started"
            }
            break;

        case "book-title":
            if (phrase === 2) {
                p.innerHTML = "Never heard of this one..."
            } else if (phrase === 1){ 
                p.innerHTML = "That is the TITLE? HAHAHAHAHA"
            } else {
                p.innerHTML = "I disapprove this tome"
            }
            break;

        case "book-author":
            if (phrase === 2) {
                p.innerHTML = "Who is this mortal?"
            } else if (phrase === 1){ 
                p.innerHTML = "What a strange name..."
            } else {
                p.innerHTML = "Are you sure that's how you spell it?"
            }
            break;

        case "yes":
            if (phrase === 2) {
                p.innerHTML = "Pffft, I doubt it!"
            } else if (phrase === 1){ 
                p.innerHTML = "Do you know how to read?"
            } else {
                p.innerHTML = "I bet this was your first book ever ¬¬"
            }
            break;

        case "no":
            if (phrase === 2) {
                p.innerHTML = "Another one never to be read..."
            } else if (phrase === 1){ 
                p.innerHTML = "What secrets might it contain?"
            } else {
                p.innerHTML = "Somehow I don't doubt that"
            }
            break;

        case "book-adder":
            if (phrase === 2) {
                p.innerHTML = "A newcomer! Our Library is now bigger than ever!"
            } else if (phrase === 1){ 
                p.innerHTML = "Let's delight on this tome's secrets!"
            } else {
                p.innerHTML = "More books! YAY"
            }
            break;

        case "form-resetter":
            if (phrase === 2) {
                p.innerHTML = "Missed a letter?"
            } else if (phrase === 1){ 
                p.innerHTML = "I'll teach you how to write soon enough"
            } else {
                p.innerHTML = "Another mistake! Unacceptable!"
            }
            break;
        };

    switch(target.className){
        case "book-div", "book-span":
            if (phrase === 2) {
                p.innerHTML = "Seems like an interesting one!"
            } else if (phrase === 1){ 
                p.innerHTML = "Nah, already read it, it was rather dull..."
            } else {
                p.innerHTML = "I'm halfway done with this one, quite good"
            }
            break;

        case "isRead-checkbox":
            if (phrase === 2) {
                p.innerHTML = "Why lie to yourself?"
            } else if (phrase === 1){ 
                p.innerHTML = "You finished this one faster than me!"
            } else {
                p.innerHTML = "Finally! Took you long enough!"
            }
            break;

        case "delete-book-btn":
            if (phrase === 2) {
                p.innerHTML = "Knowledge lost... Are you happy now?"
            } else if (phrase === 1){ 
                p.innerHTML = "I was about to start that one, evil human!"
            } else {
                p.innerHTML = "NO, THAT WAS MY FAVOURITE!"
            }
            break;
    }

});
