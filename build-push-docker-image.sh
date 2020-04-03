#!/usr/bin/env bash

sudo az acr login --name $AZURE_CONTAINER_USER
sudo docker login $AZURE_CONTAINER_USER.azurecr.io -u $AZURE_CONTAINER_USER -p $AZURE_CONTAINER_KEY  #use container username and access key
sudo docker build -t $AZURE_CONTAINER_USER.azurecr.io/ita-search-widgets .
sudo docker push $AZURE_CONTAINER_USER.azurecr.io/ita-search-widgets:latest
