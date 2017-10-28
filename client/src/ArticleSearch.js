
import React from 'react';
import Client from './Client';

const MATCHING_ITEM_LIMIT = 25;

class ArticleSearch extends React.Component {
  state = {
    articles: [],
    showRemoveIcon: false,
    searchValue: '',
  };

  handleSearchChange = (e) => {
    const value = e.target.value;

    this.setState({
      searchValue: value,
    });

    if (value === '') {
      this.setState({
        articles: [],
        showRemoveIcon: false,
      });
    } else {
      this.setState({
        showRemoveIcon: true,
      });

      Client.search(value, (articles) => {
        this.setState({
          articles: articles.slice(0, MATCHING_ITEM_LIMIT),
        });
      });
    }
  };

  handleSearchCancel = () => {
    this.setState({
      articles: [],
      showRemoveIcon: false,
      searchValue: '',
    });
  };

  render() {
    const { showRemoveIcon, articles } = this.state;
    const removeIconStyle = showRemoveIcon ? {} : { visibility: 'hidden' };

    const articleRows = articles.map((article, idx) => (
      <tr
        key={idx}
        onClick={() => this.props.onArticleClick(article)}
      >
        <td>{article.description}</td>
        <td className='right aligned'>{article.kcal}</td>
        <td className='right aligned'>{article.protein_g}</td>
        <td className='right aligned'>{article.fat_g}</td>
        <td className='right aligned'>{article.carbohydrate_g}</td>
      </tr>
    ));

    return (
      <div id='article-search'>
        <table className='ui selectable structured large table'>
          <thead>
            <tr>
              <th colSpan='5'>
                <div className='ui fluid search'>
                  <div className='ui icon input'>
                    <input
                      className='prompt'
                      type='text'
                      placeholder='Search articles...'
                      value={this.state.searchValue}
                      onChange={this.handleSearchChange}
                    />
                    <i className='search icon' />
                  </div>
                  <i
                    className='remove icon'
                    onClick={this.handleSearchCancel}
                    style={removeIconStyle}
                  />
                </div>
              </th>
            </tr>
            <tr>
              <th className='eight wide'>Description</th>
              <th>Kcal</th>
              <th>Protein (g)</th>
              <th>Fat (g)</th>
              <th>Carbs (g)</th>
            </tr>
          </thead>
          <tbody>
            {articleRows}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ArticleSearch;
