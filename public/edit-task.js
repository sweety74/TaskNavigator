const params = window.location.search;
const urlSearch = new URLSearchParams(params);
const id = urlSearch.get('id');
const taskID = document.querySelector('.task-edit-id');
const inputName = document.querySelector('.task-edit-name');
const inputStatus = document.querySelector('.task-edit-completed');
const submitBtn = document.querySelector('.btn');

taskID.innerHTML = id;


const show = async ()=>{
  try {
    const task = await fetch(`http://localhost:3000/api/v1/tasks/${id}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }
    })
    .then(res => res.json())
    .then((data)=>{
      const {name,completed} = data.task;
      inputName.value= name;
      console.log(completed);
      if(completed)
      inputStatus.checked = true;
    })

  } catch (error) {
    console.log(error);
  }
}

show();

const implement = async (obj)=>{
    try {
      console.log('hello');
      const editTask = await fetch(`http://localhost:3000/api/v1/tasks/${id}`,
    {
      method: 'PATCH',
      headers : {
        'Content-Type':'application/json; charset=utf-8'
      },
      body : JSON.stringify(obj)
    })
    .then(res => res.json())
    .then((data)=>{
      //console.log('arpit');
      console.log(data);
    })
      
    } catch (error) {
      console.log(error);
    }

  }

submitBtn.addEventListener("click",
(event)=>{
  event.preventDefault();
  const newName = inputName.value;
  const newStatus = inputStatus.checked;
  console.log(newName);
  console.log(newStatus);
  const obj = {name:newName,completed:newStatus};
  console.log(obj);
  implement(obj);
})


