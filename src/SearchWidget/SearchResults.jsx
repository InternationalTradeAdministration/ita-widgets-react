import React, { Component } from 'react';
import SearchDetails from './SearchDetails';
import {widgetInfo} from '../widgetInfo';

class SearchResults extends Component {

  render() {
    const resultsList = this.props.results.map(item => {
      switch (this.props.endpoint) {
        case "consolidated_screening_list":
          return (<SearchDetails key={item.id} name={item.name} item={item} endpoint={this.props.endpoint}/>);
        case "trade_leads":
          return (<SearchDetails key={item.id} title={item.title} item={item} endpoint={this.props.endpoint}/>);
        case "trade_events":
          return (<SearchDetails key={item.id} event_name={item.event_name} item={item} endpoint={this.props.endpoint}/>);
        case "export_assistance_centers":
          return (<SearchDetails key={item.id} item={item} endpoint={this.props.endpoint}/>);
        case "international_office_locations":
          return (<SearchDetails key={item.id} post={item.post} item={item} endpoint={this.props.endpoint}/>);
        default: return null
      }
    })

    return (
      <div className="resultsList">
        <p>{this.props.total} results {(this.props.endpoint === "consolidated_screening_list") ? <a href={widgetInfo.consolidated_screening_list.moreInfo}><i> More Information About the Results</i></a> : null}</p>
        {resultsList}
      </div>
    );
  }
}
export default SearchResults;