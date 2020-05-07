[![Build Status](https://travis-ci.org/GovWizely/ita-widgets-react.svg?branch=master)](https://travis-ci.org/GovWizely/ita-widgets-react)

# Search Widgets for ITA

These search widgets make it easy to browse the content of five APIs, and are available here: <https://developer.trade.gov/search-widgets.html>

List of widgets:

* Consolidated Screening List
* Trade Leads
* Trade Events
* Export Assistance Centers
* International Office Locations

## Run locally

* Install Node.js (this app was developed with LTS v8.16.0).
* Install dependencies with `npm install`.
* Then, `npm run start` launches the app in development mode, with changes viewable at [http://localhost:3000](http://localhost:3000).  
  * The page will reload if you make edits.<br>
  * You will also see any lint errors in the console.

## Running tests

In one terminal tab, launch server with `npm run start`.  
In another terminal tab, launch tests with `npm run test`.  
Expect the suite to pass within 10 seconds (depending on network speed).

## How to use as a plugin

1. Host the build bundles (`/build/static/js/widget.js` and `/build/static/css/widget.css` which are generated by running `npm run build`).  As an alternative to the bundled css file, it's also possible to use `/src/ITAwidget.css`, which allows for editing _in situ_.
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
      window.Explorer.renderWidget(endpoints);
    });
  </script>
  ```
  
  The `endpoints` object passed as the first parameter to `renderWidget` should contain a key-value pair for each endpoint name and corresponding div ID where you'd like that particular widget to appear. Remove any key-value pairs that are not needed for your application.

3. For each widget desired, put `<div id="ID_from_the_object"></div>` (substitute the ID used in the object above as the HTML id value) to where ever you'd like the widget to appear within the `<body>` of your HTML document.

## Build and Deploy to GitHub Pages

`npm run build && npm run deploy`

## Additional Info

This project was bootstrapped with Create React App, and has been ejected to enable customization of webpack.

## AKS Deployment

**Prerequisites**

* Azure CLI <https://docs.microsoft.com/en-us/cli/azure/install-azure-cli?view=azure-cli-latest>
* Docker CLI <https://docs.docker.com/engine/reference/commandline/cli/>
* KUBECTL CLI (if deploying to AKS) <https://kubernetes.io/docs/tasks/tools/install-kubectl/>
* Azure Subscription
* Azure Container Registry (ACR)
* Azure Kubernetes Service (AKS)
* A DNS Zone has been configured with a sub-domain that points to an ingress controller in AKS
* An AKS Ingess Controller with TLS
  * Additional documentaion: <https://docs.microsoft.com/en-us/azure/aks/ingress-static-ip>

### Scripts & Configuration Files

1. Log in with the Azure CLI: ```az login```
1. Select the appropriate Subscription. Ex: ```az account set --subscription "Sample_Subscription"```
1. Get credentials. Ex: ````az aks get-credentials --resource-group my-resources --name myAKS --overwrite-existing````
1. Rename ```kube-config-template.yml``` to ```kube-config.yml``` and update it with the following:
        - image locations
        - namespace for each section
        - host names in the Ingress section
1. Update ```deploy-aks.sh``` with the appropriate Azure Container Registry and Azure Container Key
1. Execute ```deploy-aks.sh```
1. For Azure DevOps pipeline configuration, update: ```azure-pipelines.yml```

The application will be available at the following URL: [<http://ip-dns-name.location.cloudapp.azure.com>]
The location in the URL will be the location of the Kubernetes cluster. Ex: eastus, centralus, etc...