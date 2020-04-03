#!/usr/bin/env bash

kubectl delete deployment,service,ingress ita-search-widgets -n mdsnamespace
kubectl apply -f kube-config.yml -n mdsnamespace
