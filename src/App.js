import logo from './logo.svg';
import './App.css';
import { marked } from "marked";
import React from 'react';
import Markdown from 'marked-react';
import 'font-awesome/css/font-awesome.min.css';

function App() {
  return (
    <div className="App">
      <Main />
    </div>
  );
}

class Main extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      input: "",
      editorVis: "visible",
      previewVis: "visible"
    }
    this.markdown = this.markdown.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  handleChange(event){
    this.setState({
      
      input: event.target.value
    })
  }
  handleClick(event){
    if (this.state.editorVis === "hidden" || this.state.previewVis === "hidden"){
      this.setState({
        editorVis: "visible",
        previewVis: "visible"
      })
    }
    else if (event.target.id === "editor-toggle"){
      this.setState({
        previewVis: "hidden"
      })
    }
    else if (event.target.id === "preview-toggle"){
      this.setState({
        editorVis: "hidden"
        
      })
    }
  }

  markdown(){
    let rawMarkup = marked.parse(this.state.input, {breaks:true})
    return {__html: rawMarkup};
  }

  render(){
    let editorStyle = {};
    let editorVis ={}
    let previewVis ={}
    if (this.state.previewVis === "hidden"){
      editorStyle = {
        minHeight: "90vh",
        overflowY: "auto",
      }
      previewVis = {
        display: "none"
      }
    }
    if (this.state.editorVis === "hidden"){
      editorVis = {
        display: "none"
      }
    }
    
    console.log(editorVis)
    return(
      <div>
        <div id="editor-container" style={editorVis}>
          <div id="editor-header"> 
            <p>Editor {this.state.editorVis == "visible" ? "true" : "false"}</p> 
            <i className={this.state.previewVis === "visible" ? "fa fa-arrows-alt hide-toggle" : "fa fa-compress hide-toggle"} id="editor-toggle" onClick={this.handleClick}/>
          </div>
          <textarea id="editor-input" onChange={this.handleChange} style={editorStyle} value={this.state.input}></textarea>
        </div>

        <div id="preview-container" style={previewVis}>
          <div id="preview-header"> 
            <p>Previewer {this.state.previewVis == "visible" ? "true" : "false"}</p> 
            <i className={this.state.editorVis === "visible" ? "fa fa-arrows-alt hide-toggle" : "fa fa-compress hide-toggle"} style={previewVis} id="preview-toggle" onClick={this.handleClick}/>
          </div>
          <div id="preview-output">
            <div id="preview-output-margin">
              <div dangerouslySetInnerHTML={this.markdown()} /> 
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
