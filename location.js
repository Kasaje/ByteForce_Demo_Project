const global_user_id = sessionStorage.getItem('global_user_id');
const url1 = 'http://localhost:8000/location/2';
const url2 = 'http://localhost:8000/location_review/2';
const url3 = `http://localhost:8000/profile/${global_user_id}`;
const title_name = document.getElementById('title_name');
const description = document.getElementById('description');


const comment_zone = document.getElementById('comment_zone');

function commentx(){
  comment_zone.innerHTML = `<form  action="http://localhost:8000/comment/2/${global_user_id}" method="POST">
  <div class="mb-3">
    <div class="d-flex flex-row">
      <div id="comment_U_picture">
        <img src="/Profile_picture/default_profile_pic.png" style="border-radius: 50%;" width="50px" height="50px" class="ms-5 me-4" alt="">
      </div>
      <input type="text" name="message" id="message" class="form-control" required >
    </div>
  </div>
  <div class="text-end">
    <button type="submit" class="btn btn-success">Comment</button>
  </div>
</form>`
}


const address = document.getElementById('address');
const comment = document.getElementById('comment');
const comment_U_picture = document.getElementById('comment_U_picuture');

async function getdata(){
    const response = await fetch(url1);
    const data = await response.json();
    data.forEach(data => {
        title_name.innerHTML = `${data.location_name}`
        description.innerHTML = `${data.description}`
        address.innerHTML = `${data.address}`
    });
}
getdata();

async function getreview(){
    const response = await fetch(url2);
    const data = await response.json();
    data.forEach(data => {
      console.log("Hello")
        const list_comment = document.createElement('p');
        if(data.U_Picture == null){
        list_comment.innerHTML = `<div class="d-flex flex-row mb-2">
        <div class="me-3 ">
          <img src="./Profile_picture/default_profile_pic.png" style="border-radius: 50%;" width="70px" height="70px" alt="">
        </div>
        <div class="bg-secondary-subtle w-100 rounded ps-3 pt-1 pe-3 pb-3">
          <p class="fs-5">${data.username}</p>
          <p>${data.review_message}</p>
        </div>
      </div>`}
        else{
            list_comment.innerHTML = `<div class="d-flex flex-row mb-2">
        <div class="me-3 ">
          <img src="${data.U_Picture}" style="border-radius: 50%;" width="70px" height="70px" alt="">
        </div>
        <div class="bg-secondary-subtle w-100 rounded ps-3 pt-1 pe-3 pb-3">
          <p class="fs-5">${data.username}</p>
          <p>${data.review_message}</p>
        </div>
      </div>`
        }
        comment.appendChild(list_comment);
    })
}
getreview();

async function getuser(){
    const response = await fetch(url3);
    const data = await response.json();
    data.forEach(data => {
        if(data.U_Picture != null)
        comment_U_picture.innerHTML = `<img src="${data.U_Picture}" style="border-radius: 50%;" width="50px" height="50px" class="ms-5 me-4" alt="">`
    })
}
getuser();