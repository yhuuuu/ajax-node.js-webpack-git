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
                    <td>
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


