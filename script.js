/* eslint-disable no-unused-vars */
const main = document.querySelector(".main");
const body = document.querySelector("body");
const side = document.querySelector(".side-info");





const bookLibrary = [];

main.addEventListener("click", (e) => {
    e.stopPropagation();
    if(e.target.classList[0] === "main" ){

        body.classList.toggle("hidden", true);
        
    }
});


function Book(title, author, pages, status){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;

}
    

const templateBook = document.querySelector("#template-book");
const addBookBox = document.querySelector(".add-book");

// Deleting book

function deleteBook(bookBtn){
    bookBtn.addEventListener("click", (e) =>{
        
        const i =  Array.prototype.indexOf.call(bookBtn.parentNode.parentNode.children, bookBtn.parentNode) - 1;
        console.log(`Value : ${i}`);
        bookLibrary.splice(i, 1);
    
        main.removeChild(bookBtn.parentNode);      
    });
}

// Takes a Book from library array and creates a html Element in the DOM from it 
function createBookElement(book){
    const bookElement = templateBook.content.cloneNode(true).querySelector(".lib-book");
    //bookElement.dataset.index = book.index;
    bookElement.querySelector(".title").textContent = book.title;
    bookElement.querySelector(".author").textContent = book.author;
    main.insertBefore(bookElement, addBookBox);
    deleteBook(bookElement.querySelector(".delete"));
    return bookElement;
}




// Loads the already saved library
function loadLibrary(){
    bookLibrary.forEach((book) => {
        createBookElement(book);
    });
}


bookLibrary.push(new Book('Ultimate Placeholder Book', "John Doe", "420", true));

bookLibrary.push(new Book('How to Do Stuff', "Guru-Man", "42", false));


loadLibrary();

const libBook = document.querySelectorAll(".lib-book");

// Shows the side bar info when a book is clicked on   

function setBookInfo(bookNode){
    bookNode.addEventListener("click", (e) => {
    if(e.target.classList[0] !== "delete"){
            body.classList.toggle("hidden", false);
            let index = Array.prototype.indexOf.call(bookNode.parentNode.children, bookNode) - 1;
            console.log(`Index : ${index} and ${bookNode.children[0].textContent}`);
            const book = bookLibrary[index];
            
            side.querySelector(".title span").textContent = book.title;
            side.querySelector(".author span").textContent = book.author;
            side.querySelector(".pages span").textContent = book.pages;
            side.querySelector(".status span").textContent = (book.status) ? "Read" : "Not Read";
        }
});

}
function setBookInfoAll(){
    libBook.forEach((bookNode) => {setBookInfo(bookNode);}, true);
}

const form = document.querySelector(".book-setup");
const bookSetup = document.querySelector(".back-book-setup");

function showBookSetup(){
    addBookBox.addEventListener("click", () =>{
        bookSetup.classList.toggle("hidden");
    });
    
    bookSetup.querySelector(".cancel-button").addEventListener("click", (e) =>{
        e.preventDefault();
        bookSetup.classList.toggle("hidden");
    });
}

function resetFormData(){
    bookSetup.querySelector("#book-title").value = "";
    bookSetup.querySelector("#book-author").value = "";
    bookSetup.querySelector("#book-pages").value = "";
    bookSetup.querySelector("#book-status").checked = false;
}

function addFormBook(){
    form.addEventListener("submit", (e)=>{
        e.preventDefault();
        const formData = new FormData(form);
        const book = new Book(formData.get('title'), formData.get('author'), 
                            formData.get('pages'), formData.get('status'));
        bookLibrary.push(book);
        setBookInfo(createBookElement(book));
        resetFormData();
        bookSetup.classList.toggle("hidden");
    });
}








showBookSetup();
addFormBook();
setBookInfoAll();  



