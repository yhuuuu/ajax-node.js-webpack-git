/**
 * Goal 1: Render user info
 *  1.1 Fetch user data from the server
 *  1.2 Populate the form fields with the received data
 */

// Render account setting info
const creator = 'cooper'

function renderPage() {
    axios(`http://hmajax.itheima.net/api/settings`, {
        params: {
            creator // Send creator as a query parameter
        }
    })
        .then((result) => {
            const userObj = result.data.data
            // Expected fields:['avatar', 'nickname', 'email', 'desc', 'gender']
            Object.keys(userObj).forEach((key) => {
                if (key === 'avatar') {
                    // Set the preview image source
                    document.querySelector('.prew').src = userObj[key]
                } else if (key === 'gender') {
                    // Select gender radio buttons
                    const gRadioList = document.querySelectorAll('.gender')
                    // Get gender identifier: 0 male, 1 female
                    const gNum = userObj[key]
                    // Use the gender value (0 for male, 1 for female) as the index to select the correct radio button and mark it as checked
                    gRadioList[gNum].checked = true

                } else {
                    // Fill input fields with matching class names
                    document.querySelector(`.${key}`).value = userObj[key]
                }
            })
        })
}

renderPage()

// Goal 2: Update user avatar
document.querySelector('.upload').addEventListener('change', (e) => {
    // 1. Get the selected image file
    const uploadedFile = e.target.files[0]

    // 2. Create FormData to hold the file and creator info
    const avatarFormData = new FormData()
    avatarFormData.append('avatar', uploadedFile)
    avatarFormData.append('creator', creator)

    // 3. Send PUT request to update avatar on the server
    axios.put('http://hmajax.itheima.net/api/avatar', avatarFormData
    ).then((result) => {
        // 4. Re-render the page to show updated avatar
        renderPage()

        //     const imgUrl = result.data.data.avatar
        // // 把新的头像回显到页面上
        // document.querySelector('.prew').src = imgUrl
    })
})

// Goal 3: Update user info
document.querySelector('.submit').addEventListener('click', () => {
    const userForm = document.querySelector('.user-form')
    const userObj = serialize(userForm, { hash: true, empty: true })
    // console.log(userInfo);
    userObj.creator = creator
    // 性别数字字符串，转成数字类型
    userObj.gender = +userObj.gender
    console.log(userObj);
    //{"email":"itheima@itcast.cn","nickname":"itheima","gender":0,"desc":"我是Cooper","creator":"cooper"}

    axios.put('http://hmajax.itheima.net/api/settings',
        userObj
    ).then((result) => {
        // 4.1 创建toast对象
        const toastDom = document.querySelector('.my-toast')
        const toast = new bootstrap.Toast(toastDom)

        // 4.2 调用show方法->显示提示框
        toast.show()
    })

})
