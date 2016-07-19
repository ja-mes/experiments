'use strict';

C.Login = React.createClass({
    render() {
        return (
            <div className="container">
                <div className="jumbotron">
                    <h1>Welcome</h1>
                    <p>Please login to continue</p>
                </div>
            </div>
        );
    }
});

Accounts.onLogin(() => {
    if(FlowRouter.current().path === '/login') {
        FlowRouter.go('/');
    }
});
