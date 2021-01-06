import React, {Component} from "react";
import './App.css';
import SideBar from './components/sideBar';
import Content from './components/content';

class App extends React.Component {
  render(){
      return (
        <div id="wrapper">
          <SideBar />
          <Content />
        </div>
      );
  }
  
}

export default App;
