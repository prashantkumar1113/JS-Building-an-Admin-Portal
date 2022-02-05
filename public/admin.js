// Your Code Here
async function main() {
    let response = await fetch("http://localhost:3001/listBooks");
    let books = await response.json();

    books.forEach(renderBook);
}
async function updateQuantity(bookId) {
    let newQuantity = document.querySelector(`input[name="${bookId}"]`).value; //value from the input field

    if (Number.isInteger(parseInt(newQuantity))) {
        let response = await fetch("http://localhost:3001/updateBook", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: bookId,
                quantity: newQuantity,
            }),
        });
    } else {
        console.log("Error: Quantity is not an integer");
    }
}
function renderBook(book) {
    let bookContainer = document.querySelector("#form-container");
    bookContainer.innerHTML += `
        <div class="col-sm-3">
            <div class="card" style="width: 100%;">
                ${
                    book.imageURL
                        ? `
                    <img class="card-img-top" src="${book.imageURL}" />
                `
                        : ``
                }
                <div class="card-body">
                    <h5 class="card-title">${book.title}</h5>
                        <input name="${
                            book.id
                        }" class="form-control" type="text" value=${
        book.quantity
    } />
                        <button  class="btn btn-primary" onclick="updateQuantity(${
                            book.id
                        })">Update</button>
                    
                </div>
            </div>
        </div>
    `;
}

main();
