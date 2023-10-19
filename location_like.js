const global_user_id = sessionStorage.getItem('global_user_id');
const url = `http://localhost:8000/location_like/${global_user_id}`;
const show_location_like = document.getElementById('show_location_like');

async function show_location_like_user(){
    const location_like = document.createElement('p');
    const response = await fetch(url);
    const data = await response.json();
    data.forEach(data => {
        const location_like = document.createElement('p');
        console.log(data.location_id , data.user_id , data.datetime_like)
        if (data.user_id != null){
            location_like.innerHTML = `<div class="d-flex mt-4 bg-secondary-subtle p-2 rounded w-50" >
            <div style="width: 20vw;">
              <img src="${data.L_Picture}" style="border-radius: 10px;" width="100%"  alt="">
            </div>
            <div class="m-auto text-center">
              <p class=" fs-1 text-success">${data.location_name}</p>
              <form method="post" action="http://localhost:8000/delete_location_like/${data.location_id}/${data.user_id}"><button class="btn btn-danger" type="submit">ลบ</button></form>
            </div>
          </div>`
          show_location_like.appendChild(location_like);
        }
    });

}
show_location_like_user();

