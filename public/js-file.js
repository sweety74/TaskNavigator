let taskList = document.querySelector('.js-display');
const taskInput = document.querySelector('.js-task-input');
const statimg = document.querySelector('.status-img');

const display = async function(){
  try {
    await fetch('http://localhost:3000/api/v1/tasks')
    .then(res=>res.json())
    .then((data)=>{
      let html=``;
      let arr = data.tasks;
      for(let i=0;i<arr.length;i++){
        console.log(arr[i]._id);
        let htmlElement = `<div class="show-cont" >
        <div><a href="./task.html?id=${arr[i]._id}">
        <img class="eye-img" src = "./eye.png" style="width:20px">
        </a></div>
        <div class="task-entry">${arr[i].name}</div>`
        if(arr[i].completed){
          htmlElement+=`<div class="status-img"><img class="tick" src="./tick.png"></div>`
        }
        htmlElement+=`<div><button class="btn del-btn" onclick="del(this)" data-id="${arr[i]._id}" >REMOVE</button></div>
        </div>`
        html+=htmlElement;
      }
      taskList.innerHTML=html;
    })
  } catch (error) {
    console.log(error);
  }
}


const addTask = async function(){


  data = {
    name :taskInput.value
  }

  try {
    await fetch('http://localhost:3000/api/v1/tasks',
    {
      method : 'POST',
      headers : {
        'Content-Type' : 'application/json;charset=utf-8'
      },
      body : JSON.stringify(data)
    })
    .then(res=>res.json())
    .then((result)=>{
      display();
    })
    
  } catch (error) {
    console.log(error)
  }
  taskInput.value='';

}

const del = async function(e){
    try {
    const id=e.getAttribute('data-id');
    await fetch(`http://localhost:3000/api/v1/tasks/${id}`,
    {
      method:'DELETE',
    }
    )
    .then(res=>res.json())
    .then((data)=>{
      display()
      // console.log(data);
    })
    } catch (error) {
      console.log(error);
    }
}

taskInput.addEventListener("keydown",(event)=>{
//console.log(event);
if(event.key==='Enter'){
  addTask();
}
});

const checkstatus=()=>{
  console.log("arpit");
  // if(value){
  //   statimg.innerHTML=`<div><img class="tick" src="./tick.png"></div>`
  // }
}

