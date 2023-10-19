const global_user_id = sessionStorage.getItem('global_user_id');
const url = `http://localhost:8000/delete/user/${global_user_id}`;
const delete_user = document.getElementById("delete_user");

async function delete_user_(){
    delete_user.innerHTML = `<form class="text-center" method="post" action="${url}">
    <div class="mb-3 d-flex justify-content-center">
      <input name="user_id" type="checkbox" class="mb-1" required>
      <label for="exampleInputEmail1" class="form-label">&nbsp;&nbsp;ยืนยันและรับทราบว่าข้อมูลทั้งหมดบัญชีจะถูกลบอย่างถาวร</label>
    </div>
    <button type="submit" class="btn btn-danger">&nbsp;&nbsp;Submit&nbsp;&nbsp;</button>
  </form>
  </div>
  <div class="text-center mt-3">
    <a href="Profile.html" class="btn btn-secondary ">&nbsp;&nbsp;Cancel&nbsp;&nbsp;</a>
  </div>`
}
