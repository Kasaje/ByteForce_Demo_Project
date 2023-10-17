const global_user_id = sessionStorage.getItem('global_user_id');
const url = `http://localhost:8000/edit/user/${global_user_id}`;
async function showedit(){   
    const response = await fetch(`http://localhost:8000/profile/${global_user_id}`);
    const data = await response.json();
    data.forEach(data => {
        edit_area.innerHTML = `<form method="post" action="http://localhost:8000/edit/user/${global_user_id}" enctype="multipart/form-data">
        <div class="mb-3 " id="edit_area">
        <label class="form-label ">Firstname</label>
        <input id="firstname" type="text" name="firstname" placeholder="${data.firstname}" class="form-control"  required>
        <label class="form-label mt-2">Lastname</label>
        <input id="lastname" type="text" name="lastname" placeholder="${data.lastname}" class="form-control"  required>
        <label class="form-label mt-2">Email</label>
        <input id="email" type="email" name="email" class="form-control" placeholder="${data.email}" id="exampleInputEmail1" aria-describedby="emailHelp" required>
        <label class="form-label mt-2">Profile Picture</label>
        <input id="file" type="file" name="image" class="form-control"  id="exampleInputEmail1" required>
        </div>
        <div class="text-center">
        <button type="submit" onsubmit="window.location.href('Profile.html')" class="btn btn-success mt-4">Submit</button>
        </div>
        </form>`

    });
}