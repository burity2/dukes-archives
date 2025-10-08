// stores books
const myLibrary = [];

//hide/shows forms
let formToggle = document.querySelector("#form-toggler");
formToggle.addEventListener("click", () => {
    let btn = document.querySelector("#form-toggler");
    btn.innerHTML += "pancake" 

    let form = document.querySelector("#book-form");
    form.style.display="block";
    formToggle.style.display="none";


});



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
const book1 = new Book("Moby Dick", "Herman Melville", false);
const book2 = new Book("Twenty thousand leagues under the sea", "Jules Verne", true);
const book3 = new Book("There's a hole in my love cup", "Sven Erlandson", false);

addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);

// will loop through the Library array and then display the books
let arr = myLibrary;
let bookDisplayer = () => {
    for (i= 0; i < arr.length; i++) {
        let bookDivCreator = document.getElementById("library");
        let bookUl = document.createElement("div");
        let bookIntel = arr[i].declaration;
        bookUl.className = "book-div";
        bookDivCreator.appendChild(bookUl);
        
        bookUl.innerHTML = `<span class="book-span"><p class="title">${arr[i].title} <p class="author">, by ${arr[i].author}</span>`;
        bookUl.innerHTML += "<button></button>"
}
};

//will transform the form inputs into an object
let addBookTitle = document.querySelector("#book-title").value;

/*
let formData = document.querySelectorAll("#book-form input");
let formDataArray = Array.from(formData);
let formObj = formDataArray.reduce((acc, input) => ({...acc, [input.id]: input.value }), {});
*/
