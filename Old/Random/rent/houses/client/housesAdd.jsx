'use strict';

C.HousesAdd = React.createClass({
    submit(doc, clear) {
        Meteor.call('addHouse', doc, err => {
            if(err) {
                throw err.reason;
            }

            clear();
        });
    },

    render() {
        return (
            <div id="housesAdd">
                <C.HousesHeader />

                <div className="panel panel-default">
                    <div className="panel-heading">
                        <div className="panel-title">Add House</div>
                    </div>

                    <div className="panel-body">
                        <C.Form onSuccess={this.submit}>
                            <C.Input type="string" inputName="address" />
                            <C.Input type="money" inputName="deposit" />
                            <C.Input type="money" inputName="rent" />

                            <C.SubmitButton />
                        </C.Form>
                    </div>
                </div>
            </div>
        );
    }
});
