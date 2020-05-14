import React, { Component } from 'react';

class SearchDetails extends Component {
  constructor(props) {
    super(props)
    this.state = { toggleDetails: false, };
  }

  handleClick = (e) => {
    e.preventDefault();
    this.setState({ toggleDetails: !this.state.toggleDetails, }, () => this.hideParentOfEmpty());
  }

  hideParentOfEmpty = () => {
    let elem = document.querySelectorAll('td:empty');
    if (elem.length) {
      for (let el of elem) {
        el.parentNode.style.display = 'none';
      }
    }
  }

  displayUrl = (url) => {
    if ( Array.isArray(url) ) {
      return url.map((u, i) => <div key={i}><a href={u}>{u}</a></div>)
    } else if ( !!url && (url !== null) ) {
      return <a href={url}>{url}</a>
    }
  }

  displayVenues = (venues) => {
    if ( Array.isArray(venues) ) {
      return venues[0].location
    }
  }

  render() {
    
    const detailsTable = () => {
      switch (this.props.endpoint) {
        case "consolidated_screening_list":
          return (
            <table>
              <tbody>
                <tr><td>Name</td><td>{this.props.item.name}</td></tr>
                <tr><td>Remarks</td><td>{this.props.item.remarks}</td></tr>
                <tr><td>Source</td><td>{this.props.item.source}</td></tr>
                <tr><td>Alt Names</td><td>{this.props.item.alt_names}</td></tr>
              </tbody>
            </table>
          );
        case "trade_leads":
          return (
              <table>
                <tbody>
                  <tr><td>Agency</td><td>{this.props.item.agency}</td></tr>
                  <tr><td>Description</td><td><div dangerouslySetInnerHTML={{__html: this.props.item.description}}></div></td></tr>
                  <tr><td>URL</td><td>{this.displayUrl(this.props.item.url)}</td></tr>
                </tbody>
              </table>
            );
        case "trade_events":
          return (
            <table>
              <tbody>
                <tr><td>Event Name</td><td>{this.props.item.event_name}</td></tr>
                <tr><td>Event Type</td><td>{this.props.item.event_type}</td></tr>
                <tr><td>Description</td><td>{this.props.item.description}</td></tr>
                <tr><td>Start Date</td><td>{this.props.item.start_date}</td></tr>
                <tr><td>End Date</td><td>{this.props.item.end_date}</td></tr>
                <tr><td>Venues</td><td>{this.displayVenues(this.props.item.venues)}</td></tr>
                <tr><td>URL</td><td>{this.displayUrl(this.props.item.url)}</td></tr>
                <tr><td>Source</td><td>{this.props.item.source}</td></tr>
              </tbody>
            </table>
          );
        case "export_assistance_centers":
          return (
            <table>
              <tbody>
                <tr><td>Zip Code</td><td>{this.props.item.zip_code}</td></tr>
                <tr><td>Office Name</td><td>{this.props.item.office_name}</td></tr>
                <tr><td>Address</td><td>{this.props.item.address.map((line, i) => <div key={i}>{line}</div>)}</td></tr>
                <tr><td>Email</td><td>{this.props.item.email}</td></tr>
                <tr><td>Phone</td><td>{this.props.item.phone}</td></tr>
              </tbody>
            </table>
          );
        case "international_office_locations":
          return (
            <table>
              <tbody>
                <tr><td>Post</td><td>{this.props.item.post}</td></tr>
                <tr><td>Address</td><td>{this.props.item.address.map((line, i) => <div key={i}>{line}</div>)}</td></tr>
                <tr><td>Email</td><td>{this.props.item.email}</td></tr>
                <tr><td>Phone</td><td>{this.props.item.phone}</td></tr>
              </tbody>
            </table>
          );
        default: return null;
      }
    };

    return (
      <div>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <p><a href="#" title="Expand details table" aria-label="Expand details table" onClick={this.handleClick}>
        {(this.props.endpoint==="export_assistance_centers") ? 
          `${this.props.item.zip_code} - ${this.props.item.office_name}` : 
          `${this.props[Object.keys(this.props)[0]]}` 
        }</a></p>
        
        { this.state.toggleDetails ? detailsTable() : null }
      </div>
    );
  }
}

export default SearchDetails;