
const token = localStorage.getItem('token');
const name = localStorage.getItem('name');
const userId = localStorage.getItem('userId');

const authAxios = axios.create({
    baseURL: "http://localhost:3000",
    headers: { Authorization: token },
  });

  //top-display 

  document.getElementById("login-name").innerHTML = `${name}`;
  const currentGroup = document.getElementById("current-group-name");
  if(localStorage.getItem("groupName") != null) {
    currentGroup.innerHTML = `${localStorage.getItem("groupName")}`
  } else {
    currentGroup.innerHTML = "Select a Group";
  }

  function logout() {
    localStorage.clear();
    window.location.href="./login.html";
  }

 

  { 

    async function createGroup(event) {
      event.preventDefault();
      try {
          const name = document.getElementById("create-group-input").value;
      const res = await authAxios.post('/create-group', {name, isAdmin:true});
      //console.log('>>GrouP ID', res.data.group.id);
      const groupId = res.data.group.id;
      localStorage.setItem('groupId', groupId);
  
      }catch (err) {
          console.log(err);
      }
      
    }

    authAxios
  .get("/get-groups")
  .then((res) => {
    //getting groups
    const groupListDiv = document.getElementById("group-list");
    groupListDiv.innerHTML = "";
    res.data.groups.forEach((group) => {
      groupListDiv.innerHTML += `
          <li id="${group.id}" style="padding:5px 0;">
          <span>${group.name}</span>
          <button id="show-users">Show Users</button>
          <button id="change-group-btn" class="group-btn">Enter Chat</button>
          <button id="delete-group-btn" class="group-btn">Delete Group</button>
          </li>
          `;
    });
  })
  .catch((err) => console.log(err));

  }

  //get groups

  


  //chats
  {
    //chats
    let localMsg = JSON.parse(localStorage.getItem("localMsg"));
    //console.log(typeof(localMsg))
    let lastId;
    if (localMsg.length == 0) {
      //console.log('hiiiiiiiiiiiiiiii')
      lastId = 0;
    }
    if (localMsg.length > 0) {
      lastId = localMsg[localMsg.length - 1].id;
    }
    const groupId = localStorage.getItem("groupId");
  
    if (localStorage.getItem("groupId") != null) {
      console.log('***********', lastId)
       //setInterval(() => {
      authAxios
        .get(`/get-chats?id=${lastId}&gId=${groupId}`)
        .then((response) => {
          console.log('*******RESP', response)
        
          let retrivedMsg = localMsg.concat(response.data.chat);

          console.log('all retrrrrrrrr',retrivedMsg)
          //deleting old messages from local storage
          if (retrivedMsg.length > 100) {
            for (let i = 0; i < retrivedMsg.length - 100; i++)
              retrivedMsg.shift();
          }
          localStorage.setItem("localMsg", JSON.stringify(retrivedMsg));
  
          const div = document.getElementById("group-chat-receive-box");
          div.innerHTML = "";
          retrivedMsg.forEach((chat) => {
            div.innerHTML += `<div id="${chat.id}>"><span style="color:green;"><b>${chat.name}:</b></span><span>${chat.message}</span></div>`;
          });
        })
        .catch((err) => console.log(err.response));
     //  }, 1000)
    }
  
    function sendGroupMsg(event) {
      event.preventDefault();
  
      if (localStorage.getItem("groupId") == null) {
        alert("Select a group first");
        document.getElementById("group-chat-input").value = "";
      } else {
        const input = document.getElementById("group-chat-input").value;
        const obj = {
          message: input,
          name: name,
          groupId: localStorage.getItem("groupId"),
        };
        console.log(obj);
        authAxios
          .post("/post-chat", obj)
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
        document.getElementById("group-chat-input").value = "";
        document.getElementById("group-chat-receive-box").innerHTML += `
                  <div><span style="color:green;"><b>${name}:</b></span><span>${input}</span></div>`;
      }
    }
  }

 