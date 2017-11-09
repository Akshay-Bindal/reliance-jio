/**
 * Created by akshaybindal on 09/11/17.
 */

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './articlePage.css';

class Article extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    path: PropTypes.string,
    id: PropTypes.string,
  };

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          You are currently on {this.props.path}.
          This is article no {this.props.id}.
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Article);
