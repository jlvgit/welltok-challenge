import React from "react";
import { render } from "react-dom";
import SubmitForm from "./Form"
import "./index.css";

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

// Import close icon
import Icon from 'react-icons-kit';
import { cross } from 'react-icons-kit/icomoon/cross';

class App extends React.Component {
    constructor () {
        super()
        this.state = {}
        this.getArticles = this.getArticles.bind(this)
        this.deleteArticle = this.deleteArticle.bind(this)
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

    deleteArticle (id) {
      return fetch(`api/v1/articles/${id}`, {
        method: 'delete'
      })
      .then(this.getArticles(),
      window.location.reload())
    }

  render() {
    const { articles } = this.state;
    return (
      <div>
        <SubmitForm />
        <br />
        <h2>All Articles </h2>
        <br />
        <ReactTable
          data={articles}
          getTdProps={(state, rowInfo, column, instance) => {
          return {
            onClick: (e, handleOriginal) => {
              console.log('It was in this column:', rowInfo)
              if (column.className === "deleteColumn"){
                this.deleteArticle (rowInfo.original.id);
              }
            }
          }
        }}
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
              maxWidth: 125
            },
            {
              Header: 'Tags',
              accessor: "tags",
              maxWidth: 150
            },
            {
              className: "deleteColumn",
              maxWidth: 40,
              Cell: <button><Icon icon={cross} /></button>
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
