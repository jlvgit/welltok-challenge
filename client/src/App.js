import React, { Component } from 'react';
import SelectedArticles from './SelectedArticles';
import ArticleSearch from './ArticleSearch';

class App extends Component {
  state = {
    selectedArticles: [],
  }

  removeArticleItem = (itemIndex) => {
    const filteredArticles = this.state.selectedArticles.filter(
      (item, idx) => itemIndex !== idx,
    );
    this.setState({ selectedArticles: filteredArticles });
  }

  addArticle = (article) => {
    const newArticles = this.state.selectedArticles.concat(article);
    this.setState({ selectedArticles: newArticles });
  }

  render() {
    const { selectedArticles } = this.state;

    return (
      <div className='App'>
        <div className='ui text container'>
          <SelectedArticles
            articles={selectedArticles}
            onArticleClick={this.removeArticleItem}
          />
          <ArticleSearch
            onArticleClick={this.addArticle}
          />
        </div>
      </div>
    );
  }
}

export default App;
