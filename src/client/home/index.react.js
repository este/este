import Component from '../components/component.react';
import Logout from '../auth/logout.react';
import DocumentTitle from 'react-document-title';
import React from 'react';
import {FormattedHTMLMessage} from 'react-intl';
import {Link} from 'react-router';

export default class Index extends Component {

    static propTypes = {
        actions: React.PropTypes.object.isRequired,
        msg: React.PropTypes.object.isRequired
    };

    render() {
        const {actions, msg} = this.props;

        console.log(actions);

       /* const {
            actions: {auth: actions},
            msg: {auth: msg}
        } = this.props;*/


        return (
            <DocumentTitle title={msg.home.title}>
                <div className="home-page">
                    <p>
                        This is a Home, check <Link to="todos">{msg.home.todos}</Link>.
                    </p>
                    <Logout {...{actions, msg}} />
                </div>
            </DocumentTitle>
        );
    }

}



