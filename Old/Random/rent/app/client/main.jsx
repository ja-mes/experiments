'use strict';

let AccountsUI = React.createClass({
    componentDidMount() {
        this.view = Blaze.render(Template._loginButtons, ReactDOM.findDOMNode(this.refs.container));
    },

    componentWillUnmount() {
        Blaze.remove(this.view);
    },

    render() {
        return <a href='#' ref="container" />;
    },
});

C.Layout = React.createClass({
    getDefaultProps() {
        return {
            sidebar: true,
        }
    },

    render() {
        return  (
            <div className="container-fluid">
                <nav className="navbar navbar-inverse navbar-fixed-top">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="#">Property Management Software</a>
                        </div>
                        <ul className="nav navbar-nav navbar-right">
                            <li><AccountsUI /></li>
                        </ul>
                    </div>
                </nav>

                {this.props.sidebar ?
                <div className="row">
                    <div className="col-sm-3 col-md-2 sidebar">
                        <ul className="nav nav-sidebar">
                            <li className={A.isActiveRoute('dashboard')}>
                                <a href={FlowRouter.path('dashboard')}><span className="glyphicon glyphicon-dashboard"></span> Dashboard</a>
                            </li>
                            <li className={A.isActiveRoute('customers')}>
                                <a href={FlowRouter.path('customers')}><span className="glyphicon glyphicon-user"></span> Customers</a>
                            </li>
                            <li className={A.isActiveRoute('houses')}>
                                <a href={FlowRouter.path('houses')}><span className="glyphicon glyphicon-home"></span> Houses</a>
                            </li>
                            <li>
                                <a><span className="glyphicon glyphicon-th-list"></span> Chart of Accounts</a>
                            </li>
                            <li>
                                <a><span className="glyphicon glyphicon-usd"></span> Vendors</a>
                            </li>
                            <li>
                                <a><span className="glyphicon glyphicon-credit-card"></span> Write Checks</a>
                            </li>
                            <li>
                                <a><span className="glyphicon glyphicon-lock"></span> Banking</a>
                            </li>
                            <li>
                                <a><span className="glyphicon glyphicon-list-alt"></span> Check Register</a>
                            </li>
                            <li>
                                <a><span className="glyphicon glyphicon-transfer"></span> Enter Deposits</a>
                            </li>
                            <li>
                                <a><span className="glyphicon glyphicon-time"></span> Recurring Transactions</a>
                            </li>
                        </ul>
                    </div>
                </div>
                : '' }

                {this.props.sidebar ?
                    <div className="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main" id="content">{this.props.content}</div>
                : <div>{this.props.content}</div> }
            </div>
        );
    }
});

C.Loading = React.createClass({
    render() {
        return <div>Loading...</div>
    }
});
