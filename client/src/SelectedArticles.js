import React from 'react';

export default function SelectedArticles(props) {
  const { articles } = props;

  const articleRows = articles.map((article, idx) => (
    <tr
      key={idx}
      onClick={() => props.onArticleClick(idx)}
    >
      <td>{article.description}</td>
      <td className='right aligned'>{article.title}</td>
      <td className='right aligned'>{article.protein_g}</td>
      <td className='right aligned'>{article.fat_g}</td>
      <td className='right aligned'>{article.carbohydrate_g}</td>
    </tr>
  ));

  return (
    <table className='ui selectable structured large table'>
      <thead>
        <tr>
          <th colSpan='5'>
            <h3>Selected Articles</h3>
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
      <tfoot>
        <tr>
          <th>Total</th>
          <th
            className='right aligned'
            id='total-kcal'
          >
            {sum(articles, 'kcal')}
          </th>
          <th
            className='right aligned'
            id='total-protein_g'
          >
            {sum(articles, 'protein_g')}
          </th>
          <th
            className='right aligned'
            id='total-fat_g'
          >
            {sum(articles, 'fat_g')}
          </th>
          <th
            className='right aligned'
            id='total-carbohydrate_g'
          >
            {sum(articles, 'carbohydrate_g')}
          </th>
        </tr>
      </tfoot>
    </table>
  );
}

function sum(articles, prop) {
  return articles.reduce((memo, article) => (
    parseInt(article[prop], 10) + memo
  ), 0.0).toFixed(2);
}
