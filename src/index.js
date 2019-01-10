import React from 'react';
import ReactDOM from 'react-dom';
import SearchContainer from './SearchWidget/SearchContainer';
import * as serviceWorker from './serviceWorker';


/* Uncomment the following line and replicate for each widget you would like on the page */
// ReactDOM.render(<SearchContainer endpoint="consolidated_screening_list" API_KEY={API_KEY} />, document.getElementById('widget-container'));

/* Available endpoint values: "consolidated_screening_list", "trade_leads", "trade_events", "export_assistance_centers", "international_office_locations" */


/* Unified view demonstrating all the endpoints: */
ReactDOM.render(
  <div className="root">
    <h1>ITA Search Widgets</h1>
    <p>ITA has created these widgets to make it as easy as possible to put a search engine for several of our APIs on your web page. These search widgets deliver results straight from our APIs so your customers get the same results as anyone using the APIs directly.</p>
    <p>Please <a href="https://developer.trade.gov/contact.html">contact us</a> if you would like to install and use the widgets.</p>
    <hr /><br />

    <h2>Consolidated Screening List Widget</h2>
    <p>The <a href="https://developer.trade.gov/consolidated-screening-list.html">Consolidated Screening List</a> widget searches eleven export screening lists from the Departments of Commerce, State and the Treasury. The widget enables your customers to do a quick screening search for people or companies with whom they are doing business or are party to their overseas transactions.</p>
    <p>The widget returns results that are either exact matches and near matches in case your customers don’t have the exact spelling of the name. The closer the match, the higher the name in the results.</p>
    <SearchContainer endpoint="consolidated_screening_list" API_KEY={window.API_KEY} /><br/>

    <h2>Trade Leads Widget</h2>
    <p>The <a href="https://developer.trade.gov/trade-leads.html">Trade Leads</a> widget searches contract opportunities for U.S. businesses selling their products and services overseas. These leads come from a variety of sources including FedBizOps, The United Kingdom, Canada, The Millennium Challenge Corporation, and Australia.</p>
    <p>The widget enables your customers to do a quick search for trade leads, procurement opportunities, and contract notifications in a particular country or within all countries. They can also search for all of the leads in a country by leaving the search box blank.</p>
    <SearchContainer endpoint="trade_leads" API_KEY={window.API_KEY} /><br/>

    <h2>Trade Events Widget</h2>
    <p>The <a href="https://developer.trade.gov/trade-events.html">Trade Events</a> widget searches for events organized by ITA, the U.S. Trade and Development Agency, the State Department, and the Small Business Administration.</p>
    <p>The widget enables your customers to do a quick search for trade events such as industry conferences, webinars, lectures, and trade missions in a particular country or within all countries. They can also search for all of the events in a country by leaving the search box blank.</p>
    <SearchContainer endpoint="trade_events" API_KEY={window.API_KEY} /><br/>

    <h2>Export Assistance Centers Widget</h2>
    <p>The <a href="https://developer.trade.gov/ita-zip-codes.html">Export Assistance Centers</a> widget provides direct access to the U.S. Export Assistance Centers (USEACs) that have been assigned to all of the 40,000+ zip codes in the United States.</p>
    <p>The widget enables your customers to do a quick search for search for both a zip code and a USEAC. Each center has specialists on hand for each particular region.</p>
    <SearchContainer endpoint="export_assistance_centers" API_KEY={window.API_KEY} /><br/>

    <h2>International Office Locations Widget</h2>
    <p>The <a href="https://developer.trade.gov/ita-office-locations.html">International Office Locations</a> widget provides direct access to ITA offices and centers around the world. The widget enables your customers to do a quick search for an office in a particular city or country. Each office has specialists on hand for each particular region.</p>
    <SearchContainer endpoint="international_office_locations" API_KEY={window.API_KEY} /><br/>
  </div>
  , document.getElementById('widget-container'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
