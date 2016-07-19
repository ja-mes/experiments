'use strict';

C.FormCharge = React.createClass({
    propTypes: {
        initialData: React.PropTypes.array,
    },

    nextKey: 0,

    getInitialState() {
        return {
            elems: [],
            value: [],
        }
    },

    componentDidMount() {
        this.addCharge();
    },

    deleteCharge(key, event) {
        event.preventDefault();

        let arr = this.state.elems;
        if(arr.length === 1) return;
        arr = _.without(arr, _.findWhere(arr, {key: key.toString()}));
        this.setState({elems: arr});
    },

    getValues() {
        for(var i in this.refs) {
            console.log(i);
        }
    },

    addCharge(event) {
        event && event.preventDefault();

        let arr = this.state.elems;
        let key = this.nextKey++

        arr.push(
            <div key={key} className='panel-body' style={{display: 'table', width: '100%'}}>
                <div style={{marginRight: '15px', verticalAlign: 'top'}}>
                    <button className='btn btn-primary' onClick={this.deleteCharge.bind(this, key)}>
                        <span className='glyphicon glyphicon-minus'></span>
                    </button>
                </div>
                <div className='panel panel-default' style={{display: 'table-cell', width: '100%'}}>
                    <div className='panel-body'>
                        <C.Select inputName='account'>
                            <C.Option value='foo' />
                            <C.Option value='bar' />
                            <C.Option value='qux' />
                        </C.Select>

                        <C.Input inputName='amount' type='money' />
                        <C.Input inputName='memo' />

                        <C.Select inputName='house'>
                            <C.Option value='foo' />
                            <C.Option value='bar' />
                            <C.Option value='qux' />
                        </C.Select>
                    </div>
                </div>
            </div>
        );

        this.setState({elems: arr});
    },

    render() {
        return (
            <div>
                <div className='panel panel-default' ref='objectGroup'>
                    <div className='panel-heading'>
                        <div className='panel-title'>{this.props.label}</div>
                    </div>

                    {this.state.elems}

                    <div className='panel-footer'>
                        <button className='btn btn-primary' onClick={this.addCharge}>
                            <span className='glyphicon glyphicon-plus'></span>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
});
