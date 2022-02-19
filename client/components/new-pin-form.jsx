import React from 'react';
import { Row } from 'react-bootstrap';

export default class NewPinForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      artist: '',
      info: ''

    };

    this.fileInputRef = React.createRef();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    const { handleChange, handleSubmit, fileInputRef } = this;

    return (
      <form onSubmit={handleSubmit}>
        <Row>
        <label htmlFor='title'>
          Street Art Title:
        </label>
        <input
          required
          autoFocus
          id='title'
          type='text'
          name='title'
          placeholder='Enter Title'
          onChange={handleChange}
        />
        </Row>
        <Row>
         <label htmlFor='artist'>
          Artist Name or Tag:
        </label>
        <input
          required
          autoFocus
          id='artist'
          type='text'
          name='artist'
          placeholder='Enter Artist Name or Tag'
          onChange={handleChange}
        />
        </Row>
        <Row>
         <label htmlFor='image'>
          Artist Name or Tag:
        </label>
        <input
          required
          autoFocus
          id='image'
          type='file'
          name='image'
          ref={fileInputRef}
          accept=".png, .jpg, jpeg, .gif"
          onChange={handleChange}
        />
        </Row>
          <Row>
         <label htmlFor='info'>
          Description or Information:
        </label>
        <textarea
          required
          autoFocus
          id='info'
          name='info'
          placeholder='Add some information about this pin...'
          accept=".png, .jpg, jpeg, .gif"
          onChange={handleChange}
        />
        </Row>

      </form>
    );
  }

}
