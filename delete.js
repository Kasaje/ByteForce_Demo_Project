const url = 'http://localhost:8000/profile/10';
const users = document.getElementById('user');
const users1 = document.getElementById('users');

async function deleteuser(){
    const user = await fetch(url);
    const username = await user.json();
    username.forEach(data => {
        users.innerHTML = `คุณกำลังจะลบบัญชี ${data.username}`
        users1.innerHTML = `หากลบบัญชี ${data.username} จะทำให้ข้อมูลในบัญชีถูกลบอย่างถาวร`
    });
}
deleteuser();