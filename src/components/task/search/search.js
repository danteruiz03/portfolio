import React from 'react';
import Form from 'react-bootstrap/Form'
import './search.css'
import Add from '../../../assets/task/Add.png';

const SearchPresentational = props => {
    const { handleAdd, handleChange, clearInput, value } = props
    return (
        <div className="search-row">
            <Form.Control className="searchbar" type="text" placeholder="Add a task" value={props.value}
                onKeyPress={(e) => {
                    if (e.charCode === 13) {
                        handleAdd(props.value);
                        clearInput(e);
                    }
                }}
                onChange={(e) => handleChange(e)} />
            <img src={Add} alt="add-button" onClick={(e) => { handleAdd(value); clearInput(e); }}></img>
        </div >
    )
}

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: '' }
    }

    handleChange = (event) => {
        this.setState({ value: event.target.value });
    }

    clearInput = (event) => {
        this.setState({ value: '' });

    }

    render() {
        return <SearchPresentational
            value={this.state.value}
            handleChange={this.handleChange}
            clearInput={this.clearInput}
            handleAdd={this.props.handleAdd}
        />
    }
}
export default Search;