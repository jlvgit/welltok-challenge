import React from 'react';

class SubmitForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      author: '',
      tags: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
      const state = this.state
      state[e.target.name] = e.target.value;
      this.setState(state);
  }

  handleSubmit(e) {
    e.preventDefault();

    fetch('api/v1/articles', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: this.state.title,
        description: this.state.description,
        author: this.state.author,
        tags: this.state.tags,
      })
    })
    window.location.reload();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h4>Add new article: </h4>
        <label>
          Title:
          <input type="text" name="title" value={this.state.title} onChange={this.handleChange} />
        </label>
        <label>
          Descripton:
          <input type="text" name="description" value={this.state.description} onChange={this.handleChange} />
        </label>
        <label>
          Author:
          <input type="text" name="author" value={this.state.author} onChange={this.handleChange} />
        </label>
        <label>
          Tags:
          <input type="text" name="tags" value={this.state.tags} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Add" />
      </form>
    );
  }
}

export default SubmitForm;
