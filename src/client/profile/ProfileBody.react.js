import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';
import ReactDom from 'react-dom';
import {Link} from 'react-router';
//import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class ProfileBody extends Component {

  static propTypes = {
    children: PropTypes.object.isRequired,
    cssPrefix: PropTypes.string.isRequired,
    defaultActiveTab: PropTypes.string.isRequired,
    key: PropTypes.string,
    location: PropTypes.object.isRequired,
    navListRefName: PropTypes.string.isRequired,
    profile: PropTypes.object.isRequired,
  }

  static defaultProps = {
    cssPrefix: 'profile',
    defaultActiveTab: 'bio',
    navListRefName: 'profileNav',
  }

  getActiveTabFromPathname() {
    const {location: {pathname}} = this.props;
    const pathArray = pathname.split('/');
    let activeTabName = this.props.defaultActiveTab;
    if (pathArray.length === 4) {
      activeTabName = pathArray.pop();
    }
    return activeTabName;
  }

  updateTabTriggers() {
    const activeTabName = this.getActiveTabFromPathname(this.props.defaultActiveTab);
    const nav = ReactDom.findDOMNode(this.refs[this.props.navListRefName]);
    [...nav.querySelectorAll('li')].map(li => {
      li.className = '';
    });
    const activeLi = nav.querySelector('#' + this.props.cssPrefix + '-tab-' + activeTabName);
    activeLi.className = 'active';
  }


  componentDidUpdate() {
    this.updateTabTriggers();
  }


  render() {
    const {
      profile,
      children
      } = this.props;

    const slug = `/profile/${profile.get('slug')}`;

    return (
      <div className="profile-body">
        <div className="profile-nav">
          <ul ref="profileNav">
            <li className="active" id="profile-tab-bio"><Link to={slug}>Bio</Link></li>
            <li id="profile-tab-connect"><Link to={slug + '/connect'}>Connect</Link></li>
          </ul>
        </div>
        <div className="profile-content-wrapper">
          {React.cloneElement(children, this.props)}
        </div>
      </div>
    );
  }

}
