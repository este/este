import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';
import {Link} from 'react-router';

export default class LargeAvatar extends Component {

  static propTypes = {
    img: PropTypes.string.isRequired
  }

  render() {
    const {img} = this.props;

    return (
      <div className="profile-header-image">
        <div className="thumb">
          <img src={img} alt="Profile picture"/>
        </div>
      </div>
    );
  }

}
