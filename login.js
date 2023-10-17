const alert_message = document.getElementById('alert')
const url_login = 'http://localhost:8000/users';

async function getuser(){
    const login_username = await document.getElementById("login_username").value;
    const login_password = await document.getElementById("login_password").value;
    const response = await fetch(url_login);
    const data = await response.json();
    data.forEach(data => {
        if (login_username == data.username && login_password == data.password){      
            sessionStorage.setItem("global_user_id" , data.user_id);    
            location.replace("Profile.html"); 
        }
        else{
            alert_message.innerHTML = "<div class='alert alert-danger' role='alert'>Username or Password is not match , Please try again.</div>"
        }
    });
}

