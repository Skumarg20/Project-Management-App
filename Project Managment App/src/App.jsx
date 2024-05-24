import { useState } from "react";
import NewProject from "./components/NewProject";
import NoprojectSelected from "./components/NoprojectSelected";
import ProjectSidebar from "./components/ProjectSidebar";
import SelectedProject from "./components/SelectedProject";

function App() {
  const [projectState,setProjectState]=useState({
    selectedProjectId:undefined,
    projects:[],
    tasks:[]
  });
  function handleAddTask(text){
    setProjectState((prevState)=>{
      const taskId=Math.random();
      const newTask={
        text:text,
        projectId:prevState.selectedProjectId,
        id:taskId,
      };
      return {
        ...prevState,
         selectedProjectId:undefined,
         tasks:[...prevState.tasks,newTask]
      }
    })

  }
  function handleDeleteTask(id){
    setProjectState(prevState=>{
      return {
        ...prevState,
        tasks:prevState.tasks.filter((task)=>task.id !==id),
      };
    }); 

  }
  function handleStartProject(){
    setProjectState(prevState=>{
      return {
        ...prevState,
        selectedProjectId:null,
      };
    });
  }
  function handleSelectProject(id){
    setProjectState(prevState=>{
      return {
        ...prevState,
        selectedProjectId:id,
      };
    });
  }
  function handleAddProject(projectData){
    setProjectState(prevState=>{
      const newProject={
        ...projectData,
        id:Math.random() 
      }
      return {
        ...prevState,
        selectedProjectId:undefined,
        projects:[...prevState.projects,newProject]
      }
    })
  }
  function handleCancelAddProject(){
    setProjectState(prevState=>{
      return {
        ...prevState,
        selectedProjectId:undefined,
      };
    });
  }
  function handleDeleteProject(id){
    setProjectState(prevState=>{
      return {
        ...prevState,
        selectedProjectId:undefined,
        projcts:prevState.projects.filter((project)=>project.id !==prevState.selectedProjectId),
      };
    }); 
  }
  const selectedProject=projectState.projects.find(project=>project.id===projectState.selectedProjectId);
  let content=<SelectedProject
   project={selectedProject} 
  onDelete={handleDeleteProject} onAddTask={handleAddTask} 
  onDeleteTask={handleDeleteTask}
  tasks={projectState.tasks}
  />;
  if(projectState.selectedProjectId===null){
    content=<NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject}/>;
  }
  else if(projectState.selectedProjectId===undefined){
    content=<NoprojectSelected onStartAddProject={handleStartProject}/>;
  }
  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectSidebar onStartAddProject={handleStartProject} projects={projectState.projects} onSelectProject={handleSelectProject}/>
      {/* <NewProject/> */}
      {content}
    </main>
  );
}

export default App;
