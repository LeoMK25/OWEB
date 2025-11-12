//Variables
var users = [
    {
        username: "admin",
        password: "adm"
    }
]
var impressions = []
var next_impression_id = 1
var pictures = [
    {
        id: 1,
        url: "Images/picture1.jpg",
        title: "Reduit Tilly",
        description: "Home to the Bavarian Army Museums WW1 exibit.",
        likes: 0,
        comments: []
    },
    {
        id: 2,
        url: "Images/picture2.jpg",
        title: "New Castle (Neues Schloss)",
        description: "The New Castle in Ingolstadt is a 15th-century Gothic palace that houses the Bavarian Army Museum.",
        likes: 0,
        comments: []
    },
    {
        id: 3,
        url: "Images/picture3.jpg",
        title: "Audi Sportpark",
        description: "Football stadium home to FC Ingolstadt 04.",
        likes: 0,
        comments: []
    },
    {
        id: 4,
        url: "Images/picture4.jpg",
        title: "Danube River",
        description: "The Danube river in Ingolstadt",
        likes: 0,
        comments: []
    }
]
var currentUser = {
    username: "admin",
    password: "adm"
}

//Signup
if(document.getElementById('signupForm')) { //Runs only on signupForm
    document.getElementById('signupForm').addEventListener('submit',function(event){
        event.preventDefault() //Dont reload when submitting

        const username = document.getElementById('username')
        const password = document.getElementById('password')
        const message = document.getElementById('message')

        const userExists = users.find(user => user.username == username) //Checks for usernames already present
        if(userExists){
            message.textContent = "Username taken."
        }
        else { //Creates new user and add it to users
            const newUser = {
                username: username,
                password: password
            }

            users.push(newUser)

            message.textContent = 'Account created successfully! Redirecting to login...' 
        
            document.getElementById('signupForm').reset() 
            setTimeout(() => {
                window.location.href = 'login.html' //Redirects to login
            }, 2000)

            
        }
    })    
}

//Login
if(document.getElementById('loginForm')) { //Runs only on loginForm page
    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault() //Don't reload when submitting
        
        const username = document.getElementById('username').value
        const password = document.getElementById('password').value
        const message = document.getElementById('message')
        
        //Search for user in users array that matches both username AND password
        const user = users.find(u => u.username == username && u.password == password)
        
        if(user) { //If user exists in users array
            currentUser = user //Set currentUser to the found user
            message.textContent = 'Login successful!' //Show success message
            
            setTimeout(() => {
                window.location.href = 'index.html' //Redirect to homepage after 2 seconds
            }, 2000)
        }
        else { //If no matching user found
            message.textContent = 'Login failed. Try again or sign up' //Show error message
        }
    })
}

//Gallery
if (document.getElementById("galleryContainer")) { //Runs only in gallery
    const galleryContainer = document.getElementById("galleryContainer") 

    pictures.forEach(pic => {
        // Add likedBy tracking if not already present
        if (!pic.likedBy) pic.likedBy = [] 

        const galleryItem = document.createElement("div") 
        galleryItem.classList.add("gallery_item") 

        const img = document.createElement("img") 
        img.src = pic.url
        img.alt = pic.title 

        const infoDiv = document.createElement("div") 
        infoDiv.classList.add("gallery_info") 

        const title = document.createElement("h3") 
        title.textContent = pic.title 

        const desc = document.createElement("p") 
        desc.textContent = pic.description 

        // Likes section
        const likeContainer = document.createElement("div") 
        likeContainer.style.display = "flex" 
        likeContainer.style.alignItems = "center" 
        likeContainer.style.gap = "8px" 

        const likeBtn = document.createElement("button") 
        likeBtn.textContent = "❤️ Like" 
        likeBtn.style.background = "white" 
        likeBtn.style.color = "rgb(59,40,204)" 
        likeBtn.style.border = "none" 
        likeBtn.style.borderRadius = "8px" 
        likeBtn.style.padding = "6px 10px" 
        likeBtn.style.cursor = "pointer" 

        const likes = document.createElement("p") 
        likes.textContent = "Likes: " + pic.likes 

        // Like button behavior
        likeBtn.addEventListener("click", function() {
            if (!currentUser) {
                alert("Please log in before liking!") 
                return 
            }

            const username = currentUser.username 
            const userLiked = pic.likedBy.includes(username) 

            if (userLiked) {
                // Unlike
                pic.likedBy = pic.likedBy.filter(u => u !== username) 
                pic.likes-- 
                likeBtn.textContent = "❤️ Like" 
            } else {
                // Like
                pic.likedBy.push(username) 
                pic.likes++ 
                likeBtn.textContent = "💙 Liked" 
            }
            likes.textContent = "Likes: " + pic.likes 
        }) 

        likeContainer.appendChild(likeBtn) 
        likeContainer.appendChild(likes) 

        //Comment
        const commentSection = document.createElement("div") 
        commentSection.classList.add("comment_section") 

        const commentTitle = document.createElement("h4") 
        commentTitle.textContent = "Comments:" 

        const commentList = document.createElement("div") 
        commentList.classList.add("comment_list") 

        function renderComments() {
            commentList.innerHTML = "" 
            pic.comments.forEach(c => {
                const cmt = document.createElement("p") 
                cmt.textContent = `${c.user}: ${c.text}` 
                commentList.appendChild(cmt) 
            }) 
        }
        renderComments() 

        const commentInput = document.createElement("textarea") 
        commentInput.placeholder = "Write a comment..." 

        const submitBtn = document.createElement("button") 
        submitBtn.textContent = "Post Comment" 
        submitBtn.addEventListener("click", function() {
            if (!currentUser) {
                alert("Please log in before commenting!") 
                return 
            }

            const text = commentInput.value.trim() 
            if (text) {
                pic.comments.push({ user: currentUser.username, text: text }) 
                renderComments() 
                commentInput.value = "" 
            }
        }) 

        commentSection.appendChild(commentTitle) 
        commentSection.appendChild(commentList) 
        commentSection.appendChild(commentInput) 
        commentSection.appendChild(submitBtn) 

        // Assemble everything
        infoDiv.appendChild(title) 
        infoDiv.appendChild(desc) 
        infoDiv.appendChild(likeContainer) 
        infoDiv.appendChild(commentSection) 

        galleryItem.appendChild(img) 
        galleryItem.appendChild(infoDiv) 

        galleryContainer.appendChild(galleryItem) 
    }) 
}

//Feedback form
if(document.getElementById('feedback_form')) { //Runs only in feedback form
    document.getElementById('feedback_form').addEventListener('submit', function(event) {
        event.preventDefault() // Prevent page reload
        
        // Get form elements
        const first_name = document.getElementById('first_name').value
        const last_name = document.getElementById('last_name').value
        const country = document.getElementById('country').value
        const comment = document.getElementById('comment').value
        const form_message = document.getElementById('form_message')
        
        const rating_inputs = document.getElementsByName('rating')
        let rating = ''
        for(let i = 0; i < rating_inputs.length;  i++) {
            if(rating_inputs[i].checked) {
                rating = rating_inputs[i].value
                break
            }
        }
        
        const page_inputs = document.getElementsByName('pages')
        const pages_visited = []
        for(let i = 0;  i < page_inputs.length;  i++) {
            if(page_inputs[i].checked) {
                pages_visited.push(page_inputs[i].value)
            }
        }
        
        // Create impression object
        const impression = {
            id: next_impression_id,
            name: first_name + ' ' + last_name,
            country: country,
            site_rating: rating,
            pages_visited: pages_visited,
            comment: comment
        }
        
        impressions.push(impression)
        next_impression_id++ // Increment ID for next impression
        
        // Show success message
        form_message.textContent = 'Thank you for your feedback!'
        form_message.style.background = 'rgb(240, 255, 240)'
        form_message.style.color = 'rgb(0, 128, 0)'
        
        document.getElementById('feedback_form').reset()
        
    })
}
