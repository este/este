import Component from './component.react';
import React from 'react';
import {msg} from '../intl/store';
import {IconButton} from 'material-ui';
import './pagination.scss';

export default class Pagination extends Component {
    static propTypes = {
        action: React.PropTypes.func.isRequired,
        msg: React.PropTypes.object.isRequired
    };

    componentWillMount() {
        this.current = 1;
    }

    changePage(e) {
        let page = 1;
        const buttonClass = e.currentTarget.className;

        if (buttonClass == 'pagination-previous') {
            page = this.current > 1 ? this.current - 1 : 1;
        } else if (buttonClass == 'pagination-next') {
            page = this.current + 1;
        }

        console.log(page);

        this.props.action(page);
    }

    render() {
        const {msg: {components: {pagination: msg}}} = this.props;

        return (
            <div className="pagination">
                <IconButton className="pagination-first" tooltipPosition="top-center" tooltip={msg.first} onClick={::this.changePage}>
                    <i className="material-icons">skip_previous</i>
                </IconButton>
                <IconButton className="pagination-previous" tooltipPosition="top-center" tooltip={msg.previous} onClick={::this.changePage}>
                    <i className="material-icons">keyboard_arrow_left</i>
                </IconButton>
                <IconButton className="pagination-next" tooltipPosition="top-center" tooltip={msg.next} onClick={::this.changePage}>
                    <i className="material-icons">keyboard_arrow_right</i>
                </IconButton>
                <IconButton className="pagination-last" tooltipPosition="top-center" tooltip={msg.last}>
                    <i className="material-icons">skip_next</i>
                </IconButton>
            </div>
        );
    }

}

