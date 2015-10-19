import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';
import ReactDom from 'react-dom';
import {Link} from 'react-router';
//import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import TabBio from './TabBio.react.js';
import TabConnect from './TabConnect.react.js';


export default class ProfileBody extends Component {

  static propTypes = {
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
      } = this.props;

    const slug = `/profile/${profile.get('slug')}`;

    //this.props.key = location.pathname;

    const activeTabName = this.getActiveTabFromPathname();

    let childComponent =  <TabBio key={activeTabName}/>;
    switch (activeTabName) {
      case 'connect':
        childComponent = <TabConnect key={activeTabName}/>;
        break;
    }

    return (
      <div className="profile-body">
        <div className="profile-nav">
          <ul ref="profileNav">
            <li className="active" id="profile-tab-bio"><Link to={slug}>Bio</Link></li>
            <li id="profile-tab-connect"><Link to={slug + '/connect'}>Connect</Link></li>
          </ul>
        </div>
        <div className="profile-content-wrapper">
          {/*
          Should this work? It does not:
           <TabBio {...this.props}/>
           <TabConnect {...this.props}/>
           <TabContributed {...this.props}/>
           <TabEvents {...this.props}/>
           <TabPromoted {...this.props}/>
          */}
          {/*
          Use with animations
          <ReactCSSTransitionGroup
            component="div"
            transitionName="tabbody"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={1}>
            {React.cloneElement(childComponent, this.props)}
          </ReactCSSTransitionGroup>
           */}
          {React.cloneElement(childComponent, this.props)}
        </div>
      </div>
    );
  }

}
