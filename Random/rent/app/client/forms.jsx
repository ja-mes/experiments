'use strict';

let refNum = 0;

function renderLabel() {
    let label;

    if(this.props.label) {
        if(typeof this.props.label === 'string')  {
            label = this.props.label;
        }
        else {
            label = this.props.inputName
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, str => { return str.toUpperCase() });
        }

        return <label htmlFor={this.props.inputName} className="control-label">{label}</label>
    }
}

C.Form = React.createClass({
    addError(input, data) {
        input.setState({ error: true });
        data.error = true;
    },

    getValues() {
        let data = {};

        for(let ref in this.refs) {
            let input = this.refs[ref];

            let type = input.props.type;
            let name = input.props.inputName;
            let value = input.state.value;

            input.setState({ error: false });

            let addError = this.addError.bind(this, input, data);

            if(input.props.isObjectGroup) {
                if(value.length <= 0) {
                    addError();
                }

                let arr = [];

                for(let i of value) {
                    arr.push(_.omit(i, 'key'));
                }

                data[name] = arr;

                continue;
            }
            else if(type !== 'string' && parseFloat(value) !== parseFloat(value)) {
                addError();
            }
            else if(input.props.isSelect && value === '(Select One)' || value === undefined) {
                addError()
            }
            else if(value === '') {
                addError();
            }

            if(input.props.noLoop === true) {
                continue;
            }

            type === 'string' ? data[name] = value : data[name] = parseFloat(value);
        }

        return data;
    },

    clear() {
        for(let ref in this.refs) {
            let input = this.refs[ref];
            input.setState({ error: false, value: '' });
        }
    },

    submit(event) {
        event.preventDefault();
        let data = this.getValues();

        if(data.error) { return }
        this.props.onSuccess(data, this.clear);
    },

    cloneChildren(children) {
        return React.Children.map(children, child => {
            let childProps = {};

            if(child.props.children) {
                childProps.children = this.cloneChildren(child.props.children);
            }

            if('inputName' in child.props) {
                childProps.ref = refNum++;
            }

            return React.cloneElement(child, childProps);
        });
    },

    render() {
        return (
            <form onSubmit={this.submit}>
                {this.cloneChildren(this.props.children)}
            </form>
        );
    }
});

C.SubmitButton = React.createClass({
    propTypes: {
        text: React.PropTypes.string,
        align: React.PropTypes.oneOf(['left', 'right']),
    },

    getDefaultProps() {
        return {
            text: 'Save',
            align: 'left',
        }
    },

    render() {
        let className = 'btn btn-success ';
        className += this.props.align === 'right' ? 'pull-right' : 'pull-left';

        let style = {
            margin: this.props.align === 'right' ? '0 0 0 5px' : '0 5px 0 0',
        };

        return <button type='submit' style={style} className={className}>{this.props.text}</button>
    }
});

C.DeleteButton = React.createClass({
    propTypes: {
        text: React.PropTypes.string,
        align: React.PropTypes.oneOf(['left', 'right']),
        onClick: React.PropTypes.func.isRequired,
    },

    getDefaultProps() {
        return {
            text: 'Delete',
            align: 'left',
        }
    },

    handleClick(event) {
        event.preventDefault();
        this.props.onClick(event);
    },

    render() {
        let className = 'btn btn-danger ';
        className += this.props.align === 'right' ? 'pull-right' : 'pull-left';

        let style = {
            margin: this.props.align === 'right' ? '0 0 0 5px' : '0 5px 0 0',
        };

        return <button onClick={this.handleClick} style={style} className={className}>{this.props.text}</button>
    }
});

C.CancelButton = React.createClass({
    propTypes: {
        text: React.PropTypes.string,
    },

    getDefaultProps() {
        return {
            text: 'Cancel',
        }
    },

    render() {
        return <button type='submit' className='btn btn-default'>{this.props.text}</button>
    }
});

C.BackButton = React.createClass({
    propTypes: {
        align: React.PropTypes.string,
    },

    getDefaultProps() {
        return { align: 'left' };
    },

    back(event) {
        event.preventDefault();
        history.back();
    },

    render() {
        let className='btn btn-default ';
        className += this.props.align === 'right' ? 'pull-right' : 'pull-left';

        let style = {
            margin: this.props.align === 'right' ? '0 0 0 5px' : '0 5px 0 0',
        };

        return (
            <button style={style} type='submit' className={className} onClick={this.back}>
                <span className='glyphicon glyphicon-arrow-left'></span> Back
            </button>
        );
    }
});

C.DateRange = React.createClass({
    propTypes: {
        from: React.PropTypes.string,
        to: React.PropTypes.string,
    },

    componentDidMount() {
        $('.input-daterange').datepicker({
            orientation: 'top auto',
        });
    },

    render() {
        return (
            <div className="input-daterange input-group" id="datepicker" style={{maxWidth: '400px'}}>
                <input
                    type="text"
                    className="input-sm form-control"
                    name="start"
                    onChange={this.props.changeFrom}
                    value={this.props.from}/>

                <span className="input-group-addon">to</span>

                <input
                    type="text"
                    className="input-sm form-control"
                    name="end"
                    onChange={this.props.changeTo}
                    value={this.props.to}/>
            </div>
        );
    }
});

C.Input = React.createClass({
    propTypes: {
        type: React.PropTypes.string,
        inputName: React.PropTypes.string.isRequired,
        onChange: React.PropTypes.func,

        value: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.number,
        ]),
    },

    getDefaultProps() {
        return {
            label: true,
            value: '',
            type: 'string',
        }
    },

    componentWillReceiveProps(nextProps) {
        if(nextProps.value) {
            this.setState({ value: nextProps.value });
        }
    },

    getInitialState() {
        return { value: this.props.value };
    },

    handleChange(event) {
        let value = event.target.value;
        if((this.props.type === 'money' || this.props.type === 'number') && +value !== +value) {
            return;
        }

        this.setState({
            value: this.props.type === 'money' || this.props.type === 'number' ? +value : value
        });

        if(this.props.onChange) {
            this.props.onChange(event);
        }
    },

    renderInput() {
        let type = this.props.type === 'money' || this.props.type === 'number' ? 'number' : 'text';
        let className = `form-control ${type}`;
        let input = <input
                        type='text'
                        id={this.props.inputName}
                        onChange={this.handleChange}
                        value={this.state.value}
                        className={className} />

        if(this.props.type === 'money') {
            return (
                <div className="input-group">
                    <div className="input-group-addon">$</div>
                    {input}
                </div>
            );
        }
        else {
            return input;
        }
    },

    renderLabel: renderLabel,

    render() {
        let className = 'form-group';
        if(this.state.error) className += ' has-error';

        return (
            <div className={className}>
                {this.renderLabel()}
                {this.renderInput()}
            </div>
        )
    },
});

C.Select = React.createClass({
    propTypes: {
        inputName: React.PropTypes.string.isRequired,
        onChange: React.PropTypes.func,
    },

    getDefaultProps() {
        return {
            label: true,
            isSelect: true,
            value: '(Select One)',
            type: 'string',
        }
    },

    getInitialState() {
        return {
            value: this.props.value,
        };
    },

    handleChange(event) {
        this.setState({ value: event.target.value });

        if(this.props.onChange) {
            this.props.onChange(event);
        }
    },

    renderLabel: renderLabel,

    render() {
        let className = 'form-group';
        if(this.state.error) className += ' has-error';

        return (
            <div className={className}>
                {this.renderLabel()}
                <select
                    className='form-control'
                    id={this.props.inputName}
                    onChange={this.handleChange}
                    value={this.state.value || this.props.value}>
                    <option value='(Select One)'>(Select One)</option>
                    {this.props.children}
                </select>
            </div>
        );
    }
});

C.Option = React.createClass({
    propTypes: {
        value: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.number,
        ]),
    },

    render() {
        return (
            <option value={this.props.value}>{this.props.label || this.props.value}</option>
        );
    }
})

C.FormObject = React.createClass({
    propTypes: {
        initialData: React.PropTypes.array,
    },

    nextKey: 0,

    getInitialState() {
        return {
            elements: [],
            value: [],
        }
    },

    getDefaultProps() {
        return {
            isObjectGroup: true,
        }
    },

    componentDidMount() {
        this.createElems(this.props.initialData);
    },

    createElems(elems) {
        let arr = this.state.elements;
        arr.splice(0, arr.length);

        if(elems) {
            for(let i of elems) {
                this.addElement(i);
            }
        }
        else {
            this.addElement();
        }
    },

    componentWillReceiveProps(nextProps) {
        this.createElems(nextProps.initialData);
    },

    deleteElement(key, event) {
        event && event.preventDefault();

        if(this.state.elements.length === 1) {
            return;
        }

        for(let i in this.state.elements) {
            if(+this.state.elements[i].key === +key) {
                let arr = this.state.elements;
                arr.splice(i, 1);
                this.setState({ elements: arr });

                break;
            }
        }

        for(let i in this.state.value) {
            if(+this.state.value[i].key === key) {
                let arr = this.state.value;
                arr.splice(i, 1);

                this.setState({ value: arr });
            }
        }
    },

    handleChange(key, event) {
        let values = _.clone(this.state.value);
        let value = event.target.value;

        for(let i in values) {
            if(values[i].key === key) {
                if(event.target.className.match(/number/)) {
                    value = parseFloat(value);
                }
                values[i][event.target.id] = value;
            }
        }
    },

    addElement(arg = {}, initialData) {
        arg.preventDefault ? arg.preventDefault() : initialData = arg;

        let arr = this.state.elements;
        let key = this.nextKey++;
        let ref = 0;

        let children = React.Children.map(this.props.children, child => {
            let props = _.clone(child.props);
            props.noLoop = true;
            return React.cloneElement(child, {noLoop: true, value: initialData[child.props.inputName]});
        });

        arr.push(
            <div key={key} className='panel-body' style={{display: 'table', width: '100%'}} onChange={this.handleChange.bind(this, key)}>
                <div style={{marginRight: '15px', verticalAlign: 'top'}} onClick={this.deleteElement.bind(this, key)}>
                    <button className='btn btn-primary'>
                        <span className='glyphicon glyphicon-minus'></span>
                    </button>
                </div>
                <div className='panel panel-default' style={{display: 'table-cell', width: '100%'}}>
                    <div className='panel-body'>
                        {children}
                    </div>
                </div>
            </div>
        );

        let values = this.state.value;

        if(Array.isArray(values)) {
            if(typeof initialData === 'object') {
                values.push(_.extend(initialData, {key: key}));
            }
            else {
                values.push({key: key});
            }
        }

        this.setState({ elements: arr, value: values });
    },

    render() {
        return (
            <div className='panel panel-default' ref='objectGroup'>
                <div className='panel-heading'>
                    <div className='panel-title'>{this.props.label}</div>
                </div>
                {this.state.elements}
                <div className='panel-footer'>
                    <button className='btn btn-primary' onClick={this.addElement}>
                        <span className='glyphicon glyphicon-plus'></span>
                    </button>
                </div>
            </div>
        );
    }
});
