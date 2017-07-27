// npm packages
import React from 'react';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import axios from 'axios';

// components
import MyEditor from './MyEditor';

class DocumentEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      document: {
        _id: "5977b384a943ca3e78a7112a",
        title: "sampleDocument",
        userID: "abcdefghijklmnopqrstuvwxyz",
        collaboratorIDs: [],
        rawContent: {}
      }
    };
  };

  saveDoc(contentState){
    const rawContent = convertToRaw(contentState);
    const newDoc = this.state.document;
    newDoc.rawContent = rawContent;
    this.setState({document: newDoc});
    axios({
            method: 'POST',
            url: 'http://localhost:3000/updateDoc',
            data: JSON.stringify(this.state.document)
    }).then(function(response) {
      return response.json()
    }).then(function(json) {
        console.log("save successful! JSON response:", json);
    }).catch(function(e) {
        console.log('ERROR in function saveDoc: ', e);
    });
  };

  render() {
    return (
      <div>
        <h1>This is the text editor</h1>
        <p>Sharable documentID: {this.state.document._id}</p>
        <p>Collaborators: {this.state.document.collaboratorIDs.toString()}</p>
        <MyEditor saveDoc={this.saveDoc.bind(this)} />
      </div>
    );
  }
}

export default DocumentEditor;
