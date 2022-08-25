import React, { Component } from 'react';
import SearchResults from './SearchResults';
import Pagination from "react-js-pagination";
import Select from 'react-select';
import { IoMdSearch } from 'react-icons/io'
import Loader from 'react-loader-spinner';
import widgetInfo from '../widgetInfo';
import config from '../config.js';
import '../ITAwidget.css';

class SearchContainer extends Component {
  constructor() {
    super()
    this.state = { 
      queryString: '',
      results: [],
      totalItemsCount: 0,
      submitted: false,
      loading: false,
      activePage: 1,
      selected: {value: ''},
      errorMessage: '',
    };
    this._onSelect = this._onSelect.bind(this)
  }

  _onSelect(option) {
    this.setState({selected: option});
    // console.log(`You selected ${option.label}, which has code ${option.value}`);
  }
  
  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  queryParams() {
    switch (this.props.endpoint) {
      case "consolidated_screening_list":
        return `&name=${this.state.queryString}&fuzzy_name=true`;
      case "trade_leads":
        return `&q=${this.state.queryString}&countries=${this.state.selected.value}`;
      case "trade_events":
        return `&q=${this.state.queryString}&countries=${this.state.selected.value}`;
      case "export_assistance_centers":
	return `&assigned_zip_codes=${this.state.queryString}`;
      case "international_office_locations":
        return `&q=${this.state.queryString}&countries=${this.state.selected.value}`;
      default: return null
    }
  }
  
  fetchResults = () => {
    this.setState({loading: true, submitted: true}, () => {
      const targetUrl = `${config.BASE_URL+widgetInfo[this.props.endpoint].endpoint}?${this.queryParams()}&offset=${(this.state.activePage-1)*10}`;
      fetch(targetUrl, {
        headers: { 'subscription-key': config.SUBSCRIPTION_KEY }
      })
      .then(response => response.json())
      .then(response => this.setState({
          results: response.results,
          totalItemsCount: response.total,
          loading: false,
       }))
      .catch(error => console.log(error), (error) => {
        this.setState({loading: false, errorMessage: error});
      })
    })
  }

  handleSubmit = event => {
    event.preventDefault();
    this.fetchResults();
  }

  handlePageChange(pageNumber) {
    this.setState({ activePage: pageNumber }, () => this.fetchResults());
  }

  clearResults = () => {
    this.setState({ 
      queryString: '',
      results: [],
      totalItemsCount: 0,
      submitted: false,
      activePage: 1,
      selected: {value: '', label: 'Select a Country'},
      errorMessage: '',
    });
  }

  placeholderText = () => widgetInfo[this.props.endpoint].placeholder || "Enter search query";

  render() {
    return (
      <div className="widget-container" id={this.props.endpoint}>
        <form onSubmit={(event) => this.handleSubmit(event)}>
          <h3 id="widget-title">Search {widgetInfo[this.props.endpoint].title}</h3>
          <input 
            type="text"
            name="queryString"
            aria-label={this.placeholderText()}
            placeholder={this.placeholderText()}
            value={this.state.queryString}
            onChange={(event) => this.handleChange(event)}
          />
          {(this.props.endpoint === "trade_leads" || this.props.endpoint === "trade_events" || this.props.endpoint === "international_office_locations") ? (
            <Select
            options={widgetInfo.countriesList}
            placeholder={this.state.selected.label || "Select Country"}
            onChange={this._onSelect}
            value={this.state.selected.value}
            className="Dropdown"
            classNamePrefix="react-select"
            aria-label="Select Country"
            />
          ) : null }
          <button type="submit" aria-label="submit"><IoMdSearch size="2em"/></button>
        </form>

        { this.state.loading ? <div className="spinner"><Loader type="Bars" color="#00CC66" width="100" /></div> : null }

        { (this.state.submitted && !this.state.loading) ? 
          <SearchResults 
            className="results"
            results={this.state.results} 
            total={this.state.totalItemsCount}
            endpoint={this.props.endpoint}
            /> : null }
        { ((this.state.errorMessage !== '') && this.state.submitted) ? <p>There was an error processing the request: {this.state.errorMessage}</p> : null }
        { this.state.submitted ? (
          <div className="footer">
            <Pagination 
              activePage={this.state.activePage}
              totalItemsCount={this.state.totalItemsCount}
              firstPageText="First"
              prevPageText="<"
              nextPageText=">"
              lastPageText="Last"
              onChange={(pageNumber) => this.handlePageChange(pageNumber)} />
            <button type="reset" id="clearButton" onClick={this.clearResults}>Clear</button>
          </div> 
          ) : null }
      </div>
    );
  }
}

export default SearchContainer;
