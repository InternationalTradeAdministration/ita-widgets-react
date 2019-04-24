[![Build Status](https://travis-ci.org/GovWizely/ita-widgets-react.svg?branch=master)](https://travis-ci.org/GovWizely/ita-widgets-react)

# Search Widgets for ITA

These search widgets make it easy to browse the content of five APIs, and are available here: https://developer.trade.gov/search-widgets.html

List of widgets:
* Consolidated Screening List
* Trade Leads
* Trade Events
* Export Assistance Centers
* International Office Locations

## How to use as a plugin
1. Host the build bundles (one JS and one CSS file)
2. Add the following lines to the `<head>` of the html doc:

  ```html
  <link rel="stylesheet" type="text/css" href="widget.css">
  <script type="text/javascript" src="widget.js"></script>
  <script>
    document.addEventListener("DOMContentLoaded", function() {
      endpoints = {
        "consolidated_screening_list": "consolidated_screening_list_widget_container",
        "trade_leads": "trade_leads_widget_container",
        "trade_events": "trade_events_widget_container",
        "export_assistance_centers": "export_assistance_centers_widget_container",
        "international_office_locations": "international_office_locations_widget_container",
      };
      API_KEY = "your_API_KEY"; // get it from http://api.trade.gov/
      window.Explorer.renderWidget(endpoints, API_KEY);
    });
  </script>
  ```
  
  The `endpoints` object passed as the first parameter to `renderWidget` should contain a key-value pair for each endpoint name and corresponding div ID where you'd like that particular widget to appear. Remove any key-value pairs that are not needed for your application, and include your API_KEY as the second parameter, including the quotation marks.

3. For each widget desired, put `<div id="ID_from_the_object"></div>` (substitute the ID used in the object above as the HTML id value) to where ever you'd like the widget to appear within the `<body>` of your HTML document.

## Run locally
  * Install dependencies with `npm install`.
  * Then, `npm run start` launches the app in development mode, with changes viewable at [http://localhost:3000](http://localhost:3000).  
    * The page will reload if you make edits.<br>
    * You will also see any lint errors in the console.

## Running tests
In one terminal tab, launch server with `npm run start`.  
In another terminal tab, launch tests with `npm run test`.  
Expect the suite to pass within 10 seconds (depending on network speed).

## Build and Deploy to GitHub Pages
`npm run build && npm run deploy`

## Additional Info
This project was bootstrapped with Create React App, and has been ejected to enable customization of webpack.