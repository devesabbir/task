import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Task } from "../context/TaskContext";
import { idGenerator } from "../utils/randomId";

const useAxios = () => {
  const { data, setData } = useContext(Task);
  const navigate = useNavigate()



  const getSectors = () => {
    let data = sessionStorage.getItem('sectors') ? JSON.parse(sessionStorage.getItem('sectors')) : [] 
    setData((prev) => ({
        ...prev,
        sectorOptions:data
    }))
  }


  const addSector = (title) => {
     let id = idGenerator()
     let data = {id:id,title:title}
     let arry = sessionStorage.getItem('sectors') ? JSON.parse(sessionStorage.getItem('sectors')) : []
     arry.push(data)
     sessionStorage.setItem('sectors', JSON.stringify(arry))
     getSectors()
  }


  const getTasks = () => {
    let data = sessionStorage.getItem('tasks') ? JSON.parse(sessionStorage.getItem('tasks')) : [] 
    setData((prev) => ({
        ...prev,
        tasks:data
    }))
  }


  const createTask = () => {
     let id = idGenerator()
     let obj = { id: id, name:'', sector:'', 
     agreeWithTerms:false}
     let arry = sessionStorage.getItem('tasks') ? JSON.parse(sessionStorage.getItem('tasks')) : []
     navigate('/edit/' + obj.id)
     arry.push(obj)
     sessionStorage.setItem('tasks', JSON.stringify(arry))
     getTasks()
  }

   // Create New Task
   const editTask = (data) => {
       let arry = sessionStorage.getItem('tasks') ? JSON.parse(sessionStorage.getItem('tasks')) : []
       let index = arry.findIndex( item => item.id === data.id)
       arry.splice(index, 1, {...data})
       sessionStorage.setItem('tasks', JSON.stringify(arry))
       navigate('/')
       getTasks()
 
  };


  return {
    getSectors,
    addSector,
    getTasks,
    createTask,
    editTask
  };
};

export default useAxios;
