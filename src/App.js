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
      input: ""
    }
    this.markdown = this.markdown.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event){
    this.setState({
      
      input: event.target.value
    })
  }
  markdown(){
    let rawMarkup = marked.parse(this.state.input, {breaks:true})
    return {__html: rawMarkup};
  }
  render(){
    return(
      <div>
        <div id="editor-container">
          <div id="editor-header"> 
            <p>Editor</p> 
            <i className="fa fa-arrows-alt hide-toggle" />
          </div>
          <textarea id="editor-input" onChange={this.handleChange}></textarea>
        </div>
        <div id="preview-container">
          <div id="preview-header"> 
            <p>Previewer</p> 
            <i className="fa fa-arrows-alt hide-toggle" />
          </div>
          <div id="preview-output">
            <div id="preview-output-margin">
              <div dangerouslySetInnerHTML={this.markdown()}/> 

            </div>
            
          </div>
        </div>
      </div>
    );
  }
}

export default App;
