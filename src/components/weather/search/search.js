import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import './search.css'


const SearchPresentational = props => {
    const { handleSearch, handleChange, clearInput, value } = props
    return (
        <div className="search-row">
            <div>
                <Form.Control type="text" placeholder="Search for a city" value={value}
                    onKeyPress={(e) => {
                        if (e.charCode === 13) {
                            handleSearch(value);
                            clearInput(e);
                        }
                    }}
                    onChange={(e) => handleChange(e)} />
            </div>
            <Button variant="primary" onClick={(e) => { handleSearch(value); clearInput(e); }}>Search</Button>
        </div>
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
        this.setState({ value: '' }, () => { event.target.blur() });
    }

    render() {
        return <SearchPresentational
            value={this.state.value}
            handleChange={this.handleChange}
            clearInput={this.clearInput}
            handleSearch={this.props.handleSearch}
        />
    }
}
export default Search;