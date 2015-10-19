import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';
import ReactDom from 'react-dom';
import {Link} from 'react-router';
//import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import TabBio from './TabBio.react.js';
import TabConnect from './TabConnect.react.js';
import TabContributed from './TabContributed.react.js';
import TabEvents from './TabEvents.react.js';
import TabPromoted from './TabPromoted.react.js';


export default class ProfileBody extends Component {

  static propTypes = {
    profile: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
  }

  static defaultProps = {
    defaultActiveTab: 'bio',
    navListRefName: 'profileNav',
    cssPrefix: 'profile'
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
      location,
      } = this.props;

    const slug = `/profile/${profile.get('slug')}`;

    this.props.key = location.pathname;

    const activeTabName = this.getActiveTabFromPathname();

    let childComponent =  <TabBio key={activeTabName}/>;
    switch(activeTabName) {
      case 'connect':
        childComponent = <TabConnect key={activeTabName}/>
        break;
      case 'contributed':
        childComponent = <TabContributed key={activeTabName}/>
        break;
      case 'events':
        childComponent = <TabEvents key={activeTabName}/>
        break;
      case 'promoted':
        childComponent = <TabPromoted key={activeTabName}/>
        break;
    }

    return (
      <div className="profile-body">
        <div className="profile-nav">
          <ul ref="profileNav">
            <li id="profile-tab-bio" className="active"><Link to={slug}>Bio</Link></li>
            <li id="profile-tab-connect"><Link to={slug + '/connect'}>Connect</Link></li>
            <li id="profile-tab-contributed"><Link to={slug + '/contributed'}>Contributed Ways</Link></li>
            <li id="profile-tab-promoted"><Link to={slug + '/promoted'}>Promoted Ways</Link></li>
            <li id="profile-tab-events"><Link to={slug + '/events'}>Events</Link></li>
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
