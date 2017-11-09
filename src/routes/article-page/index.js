/**
 * Created by akshaybindal on 09/11/17.
 */


import React from 'react';
import Layout from '../../components/Layout';
import ArticlePage from './articlePage.js';

let title = 'Landing Page'
function action(props) {
  return {
    chunks: ['not-found'],
    title,
    component: (
      <Layout>
        <ArticlePage path={props.path} title={title} id={props.params.id}/>
      </Layout>
    ),
  };
}

export default action;
