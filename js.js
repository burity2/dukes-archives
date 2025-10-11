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