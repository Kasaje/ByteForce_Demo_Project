const global_user_id = sessionStorage.getItem('global_user_id');
const url = `http://localhost:8000/profile/${global_user_id}`;
const users = document.getElementById('user');
const users1 = document.getElementById('users');

async function deleteuser(){
    const user = await fetch(url);
    const username = await user.json();
    username.forEach(data => {
        users.innerHTML = `คุณกำลังจะลบบัญชี TryTravel`
        users1.innerHTML = `หากลบบัญชี TryTravel จะทำให้ข้อมูลในบัญชีถูกลบอย่างถาวร`
    });
}
deleteuser();