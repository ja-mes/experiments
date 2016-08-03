'use strict';

C.Nav = React.createClass({
    propTypes: {
        route: React.PropTypes.string.isRequired,
        routeParams: React.PropTypes.object,
    },

    render() {
        return (
            <li className={A.isActiveRoute(this.props.route)}>
                <a href={FlowRouter.path(this.props.route, this.props.routeParams)}>{this.props.children}</a>
            </li>
        );
    }
});
