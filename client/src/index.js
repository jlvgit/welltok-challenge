import React from "react";
import { render } from "react-dom";
import SubmitForm from "./Form"
import "./index.css";

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

class App extends React.Component {
    constructor () {
        super()
        this.state = {}
        this.getArticles = this.getArticles.bind(this)
    }

    componentDidMount () {
        this.getArticles()
    }

    fetch (endpoint) {
        return new Promise((resolve, reject) => {
            window.fetch(endpoint)
            .then(response => response.json())
            .then(json => resolve(json))
            .catch(error => reject(error))
      })
    }

    getArticles () {
        this.fetch('api/v1/articles')
        .then(articles => {
            this.setState({articles: articles})
      })
    }

    getArticle (id) {
        this.fetch(`api/v1/articles/${id}`)
        .then(article => this.setState({article: article}))
    }

  render() {
    const { articles } = this.state;
    return (
      <div>
        <SubmitForm />
        <br />
        <ReactTable
          data={articles}
          columns={[
            {
              Header: "Title",
              accessor: "title"
            },
            {
              Header: "Descripton",
              accessor: "description"
            },
            {
              Header: 'Author',
              accessor: "author",
              maxWidth: 150
            },
            {
              Header: 'Tags',
              accessor: "tags",
              maxWidth: 150
            }
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
        />
        <br />
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
