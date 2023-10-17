const profile_name = document.getElementById('profile_name');
const profile_pic = document.getElementById('profile_pic');
const name = document.getElementById('name');
const email = document.getElementById('email');
const global_user_id = sessionStorage.getItem('global_user_id')
const url = `http://localhost:8000/profile/${global_user_id}`;

async function getdata(){
    const response = await fetch(url);
    const data = await response.json();
    data.forEach(d => {
        profile_name.innerHTML = `${d.username}`
        name.innerHTML = `${d.firstname} ${d.lastname}`
        email.innerHTML = `${d.email}`
        if(d.U_Picture != null){
            profile_pic.innerHTML = `<img id="profile_pic" src="${d.U_Picture}" style="border: 5px solid white;
            border-radius: 50%;
            background-color: rgb(202, 202, 202);
            position: relative;" alt="" width="200px" height="200px">`
        }
    });
}
getdata();
