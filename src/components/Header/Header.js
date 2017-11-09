/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Header.css';
import Link from '../Link';
import InputElem from '../InputBox';


class Header extends React.Component {
  constructor(){
    super();

  }

  componentDidMount() {

  }

  componentWillUnmount() {
    
  }

  render() {
    var html1 = (<div className={s.root}>
      <div className={s.container}>
        <Link className={s.brand} to="/">
          <span className={s.brandTxt}>Brand</span>
        </Link>
        <div className={s.banner}>
          <InputElem />
        </div>
      </div>
    </div>);
    return html1;
  }
}

export default withStyles(s)(Header);
