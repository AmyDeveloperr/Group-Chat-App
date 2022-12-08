
const form = document.getElementById('form');

form.addEventListener('submit', login);

async function login(e) {
   
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const obj = {
        email,
        password
    }

    email.value = '';
    password.value = '';

    try {
        const resp = await axios.post('http://localhost:3000/user/login', obj);

        localStorage.setItem('token', resp.data.token);
        localStorage.setItem('name', resp.data.name);
        localStorage.setItem('userId', resp.data.userId);
        localStorage.setItem('localMsg', '[]');


        if (resp.status === 201 ) {
            showNotification(resp.data.message);
            window.location.href = './chat.html';
        }
       if (resp.status === 207 ) {
       
            showNotification(resp.data.message);
        } 
        if (resp.status === 203) {
            console.log(resp)
            showNotification(resp.data.message);
        }
    }catch(err) {
        console.log(err);
    }
    
}

function showNotification(message) {
    parentNode = document.getElementById('notification');
    const msg = `<li>${message}</li>`;
    parentNode.innerHTML += msg;
}