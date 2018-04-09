1. Start minikube
`minikube start`
2. Run `kubectl get service` to see what services are running
3. Go to the online banking root folder
4. Undeploy the services
```bash
kubectl delete -f gateway/k8s/gateway-service.yaml
kubectl delete -f gateway/k8s/mongo-gateway.yaml

kubectl delete -f cash-service/k8s/cash-service.yaml
kubectl delete -f cash-service/k8s/mongo-cash.yaml

kubectl delete -f card-service/k8s/card-service.yaml 
kubectl delete -f card-service/k8s/mongo-card.yaml

kubectl delete -f kafka/kafka-cluster.yaml
kubectl delete -f kafka/kafka-service.yaml

kubectl delete -f kafka/zookeeper-cluster.yaml
kubectl delete -f kafka/zookeeper-services.yaml

```

5. Ensure there are no services or pods running for the online banking application
```bash
kubectl get service
/** Should have no services for online banking example **/
kubectl get pods
/** Should have no pods for online banking example **/
```

6. Ensure that docker instance within minikube is being used by executing `eval $(minikube docker-env)`

7. Install docker images of the services by running in each project
`./mvnw install dockerfile:build -DskipTests`

8. Now start the services in the following order:
```bash
kubectl create -f kafka/namespace-kafka.yaml
kubectl config set-context kafka --namespace=kafka-cluster --user=cluster-admin
kubectl config use-context kafka

kubectl create -f kafka/zookeeper-services.yaml
kubectl create -f kafka/zookeeper-cluster.yaml

kubectl create -f kafka/kafka-service.yaml 
kubectl create -f kafka/kafka-cluster.yaml

kubectl create -f cash-service/k8s/mongo-cash.yaml
kubectl create -f cash-service/k8s/cash-service.yaml 

kubectl create -f card-service/k8s/mongo-card.yaml
kubectl create -f card-service/k8s/card-service.yaml

kubectl create -f gateway/k8s/mongo-gateway.yaml
kubectl create -f gateway/k8s/gateway-service.yaml
```
