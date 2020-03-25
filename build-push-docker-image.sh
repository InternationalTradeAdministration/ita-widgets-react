#!/usr/bin/env bash

sudo az acr login --name dataservices
sudo docker login dataservices.azurecr.io -u dataservices -p $AZURE_CONTAINER_KEY  #use container username and access key
sudo docker build -t dataservices.azurecr.io/ita-search-widgets .
sudo docker push dataservices.azurecr.io/ita-search-widgets:latest
