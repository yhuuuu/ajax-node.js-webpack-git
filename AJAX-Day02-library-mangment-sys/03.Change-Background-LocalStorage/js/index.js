/**
 * Goal: Website - Change background image
 * 
 * 1. When an image is selected, upload it and set it as the body background
 * 2. After a successful upload, save the image URL to localStorage
 * 3. When the page loads, retrieve and apply the saved background image URL
 */

// 1. Upload image and update background
document.querySelector('#bg').addEventListener('change', (e) => {
    const bgImgObj = e.target.files[0]

    const imgFormFile = new FormData()
    imgFormFile.append('img', bgImgObj)

    // Optional: Log FormData content for debugging
    for (let b of imgFormFile) {
        console.log(b[0], b[1])
    }
    
    // Send POST request to upload the image
    axios.post(`http://hmajax.itheima.net/api/uploadimg`, imgFormFile)
        .then((result) => {
            console.log('Upload successful');
            const imgURL = result.data.data.url
            
            // 2. Save image URL to localStorage
            localStorage.setItem('bgImg', imgURL)

            // Apply image as body background
            document.body.style.backgroundImage = `url(${imgURL})`

        }).catch((err) => {
            console.error('Upload failed:', err)
        });
})

// 3. On page load, apply saved background image (if available)
const bgURL = localStorage.getItem('bgImg')

// bgURL && (document.body.style.backgroundImage = `url(${bgURL})`)
if (bgURL) { 
    document.body.style.backgroundImage = `url(${bgURL})`
}
