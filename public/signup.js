

const form = document.getElementById('form');
const name = document.getElementById('name');
const email = document.getElementById('email');
const phone = document.getElementById('ph-no');
const password = document.getElementById('pass');

form.addEventListener("submit", signup);

async function signup(e) {
    e.preventDefault();
    const obj = {
       name: name.value,
       email: email.value,
       phone: phone.value,
       password: password.value
    }
    name.value='';
    email.value='';
    phone.value='';
    password.value='';

    try {
        const resp = await axios.post('http://localhost:3000/user/signup', obj);
        console.log(resp);
        if (resp.status === 201) {
            //console.log(resp)
           showNotification(resp.data.message);
        }
        if (resp.status === 207) {
            showNotification(resp.data.message);
        }
       
    }catch (err) {
        console.log(err);
    }
}

function showNotification(message) {
    parentNode = document.getElementById('signup-notification');
    const msg = `<li>${message}</li>`;
    parentNode.innerHTML += msg;
}