/* eslint-disable no-unused-vars */
const main = document.querySelector(".main");
const body = document.querySelector("body");
const side = document.querySelector(".side-info");


const bookLibrary = [];

main.addEventListener("click", (e) => {
    e.stopPropagation();
    console.log(e.target.nodeName);
    if(e.target.classList[0] == "main" ){

        body.classList.toggle("hidden", true);
        
    }
});







function Book(title, author, pages, status, index){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
    this.index = index;
}
   

const templateBook = document.querySelector("#template-book");
function addBookElement(book){
    const bookElement = templateBook.content.cloneNode(true).querySelector(".lib-book");
    console.log(Object.getPrototypeOf(bookElement));
    bookElement.dataset.index = book.index;
    bookElement.querySelector(".title").textContent = book.title;
    bookElement.querySelector(".author").textContent = book.author;
    main.appendChild(bookElement);
}

bookLibrary.push(new Book('Ultimate Placeholder Book', "John Doe", "420", true, bookLibrary.length));

bookLibrary.push(new Book('How to Do Stuff', "Guru-Man", "42", false, bookLibrary.length));

function loadLibrary(){
    bookLibrary.forEach((book) => {
        addBookElement(book);
    });
}

loadLibrary();
const libBook = document.querySelectorAll(".lib-book");

libBook.forEach((bookNode) => bookNode.addEventListener("click", (e) => {
    
   
        console.log(e.target);
        body.classList.toggle("hidden", false);
        const book = bookLibrary[bookNode.dataset.index];
        
        side.querySelector(".title span").textContent = book.title;
        side.querySelector(".author span").textContent = book.author;
        side.querySelector(".pages span").textContent = book.pages;
        side.querySelector(".status span").textContent = (book.status) ? "Read" : "Not Read";
    
}, true
));
