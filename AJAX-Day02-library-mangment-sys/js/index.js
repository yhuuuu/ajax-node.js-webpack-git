/**
 * 1. Get creator's book list 
 * 1.1 Fetch data from server
 * 1.2 Render the book list into the table
 * */
const creator = 'cooper'
const creatorList = document.querySelector('.table .list')
// 1.1 Fetch data from server
const getBookList = function () {
    axios('http://hmajax.itheima.net/api/books', {
        params: {
            creator
        }
    })
        .then((result) => {
            creatorList.innerHTML = ''
            const creatorBooks = result.data.data
            // 1.2 Render the book list into the table
            const htmlStr = creatorBooks.map((book, index) => {
                return `
                <tr>
                    <td>${index + 1}</td>
                    <td>${book.bookname}</td>
                    <td>${book.author}</td>
                    <td>${book.publisher}</td>
                    <td data-id=${book.id}>
                        <span class="del">删除</span>
                        <span class="edit">编辑</span>
                    </td>
                </tr>`
            }).join('')
            creatorList.innerHTML = htmlStr
        })
}
// Fetch and render the list when the page has loaded
getBookList()


/**
 * 2. Post a new book
 * 
 * 2.1 Add button -> show and hide
 * 2.2 Collect form data, and sumbit to the server
 * 2.3 Re-render book list
 */

// 2.1 Create modal object 
const addModalDom = document.querySelector('.add-modal')
const addModal = new bootstrap.Modal(addModalDom)

// 2.2 Collect form data
document.querySelector('.modal-footer .add-btn').addEventListener('click', () => {
    const addForm = document.querySelector('.add-form')
    const bookObj = serialize(addForm, { hash: true, empty: true })

    axios.post('http://hmajax.itheima.net/api/books', {
        ...bookObj,
        creator
    }).then(response => {
        // 2.3 Re-render book list
        getBookList()
        // Clear form input
        addForm.reset()
        // Hide pop-up window
        addModal.hide()
    })
})


/**
 * 3.Delete book
 * 3.1 Use event delegation to listen for delete button clicks and retrieve the book ID
 * 3.2 Send a DELETE request to the server using the book ID
 * 3.3 Refresh the book list after deletion
 */

// 3.1 Event delegation: listen for clicks on delete buttons
document.querySelector('.list').addEventListener('click', (e) => {

    if (e.target.classList.contains('del')) {
        // Retrieve book ID from a custom data attribute on the row or button  
        const bookId = e.target.parentNode.dataset.id

        // 3.2 Send DELETE request    
        axios.delete(`http://hmajax.itheima.net/api/books/${bookId}`)
            .then((response) => {
                //3.3 Re-render book list
                getBookList()
            })

    }

})

/**
 * 4 Edit book info 
 * 
 * * 4.1 Use event delegation to listen for edit button clicks and get book ID
 * 4.2 Populate form fields with the selected book’s data
 * 4.3 On "Save", send a PUT request to update book info
 * 4.4 Refresh book list and close the modal
 */


// 4.1 Create modal instance
const editModalDom = document.querySelector('.edit-modal')
const editModal = new bootstrap.Modal(editModalDom)
let currentEditId = null

document.querySelector('.list').addEventListener('click', (e) => {
    if (e.target.classList.contains('edit')) {
        // Objective: Autofill book data from the serve 

        // 4.1.1 Identify the selected book's ID
        const bookId = e.target.parentNode.dataset.id
        currentEditId = bookId

        // 4.1.2 Retrieve book info by id 
        axios(`http://hmajax.itheima.net/api/books/${bookId}`)
            .then((response) => {
                const bookObj = response.data.data
                // {
                //     "id": 645524,
                //     "bookname": "as",
                //     "author": "as",
                //     "publisher": "as"
                // }

                // 4.1.3 Populate edit form with book data
                // document.querySelector('.edit-form .bookname').value = bookObj.bookname

                const keys = Object.keys(bookObj)

                // Works only if the object keys match the input class names in the form
                keys.forEach((key) => {
                    const input = document.querySelector(`.edit-form .${key}`)
                    if (input) input.value = bookObj[key]
                })
                // Display modal only after form is populated
                editModal.show()

            })

    }
})
// Close pop-up windown after edit saved
document.querySelector('.edit-btn').addEventListener('click', () => {

    // 4.3 Collect new book data
    const editBookForm = document.querySelector('.edit-form')
    const editedBookInfo = serialize(editBookForm, { hash: true, empty: true })
    console.log(editedBookInfo);
    // {
    //     "id": "645524",
    //     "bookname": "as",
    //     "author": "as",
    //     "publisher": "as"
    // }
    const { id, bookname, author, publisher } = editedBookInfo

    axios.put(`http://hmajax.itheima.net/api/books/${id}`, {
        bookname,
        author,
        creator,
        publisher
    }).then((response) => {
        // Refresh book list and close the modal
        getBookList()
        editModal.hide()
    })
})