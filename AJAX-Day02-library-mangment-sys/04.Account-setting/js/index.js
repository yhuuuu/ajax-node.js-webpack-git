/**
 * Goal 1: Render user info
 *  1.1 Fetch user data from the server
 *  1.2 Populate the form fields with the received data
 */

// Render account setting info
const creator = 'cooper'

function renderPage() {
    console.log('hi');
    axios(`http://hmajax.itheima.net/api/settings`, {
        params: {
            creator // Send creator as a query parameter
        }
    })
        .then((result) => {

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