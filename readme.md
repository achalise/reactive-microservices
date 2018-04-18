# online banking example

Example project showcasing:

* SpringBoot microservices with reactive streams
* Kafka for messaging between microservices
* OAuth2 security
* Angular 5 front end
* All deployed in local kubernetes cluster (minikube)
* Finally Instructions on how to deploy on AWS

To use local docker daemon within minikube, `eval $(minikube docker-env)`

To run kafka locally and test producer and consumer on console:

* Run `bin/zookeeper-server-start.sh config/zookeeper.properties`
      `bin/kafka-server-start.sh config/server.properties`
      `bin/kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic test --from-beginning`
      `bin/kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic baeldung --from-beginning`


The application comprises of following microservices:


1. CardsService
2. CashService
3. MortgageService
4. CustomerService

# Cash Service

To build docker image of cashservice
`docker build -t achalise/cash-service:0.0.1 .`

for gateway service using the dockerfile-maven-plugin, 
`./mvnw dockerfile:build`

Create a spring boot starter project with start.spring.io selecting reactive web and reactive MongoDB options.



Order to run:

1. zookeeper-services.yaml (`kubectl create -f kafka/zookeeper-services.yaml`)
2. zookeeper-cluster.yaml
3. kafka-service.yaml
4. kafka-cluster.yaml
5. mongo-cash.yaml
6. cash-service.yaml
7. gateway-service.yaml


uninstall all:
--------------
kubectl delete -f gateway/k8s/gateway-service.yaml

kubectl delete -f cash-service/k8s/cash-service.yaml
kubectl delete -f cash-service/k8s/mongo-cash.yaml

kubectl delete -f card-service/k8s/card-service.yaml 
kubectl delete -f card-service/k8s/mongo-card.yaml

kubectl delete -f kafka/kafka-cluster.yaml
kubectl delete -f kafka/kafka-service.yaml

kubectl delete -f kafka/zookeeper-cluster.yaml
kubectl delete -f kafka/zookeeper-services.yaml

install all:
------------
eval $(minikube docker-env)
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

kubectl create -f gateway/k8s/gateway-service.yaml

***** during minikube upgrade if there are issues, try
   - removing .minikube, .kube
   - upgrading virtual box - if not current
   - upgrading docker - if not current





## For the front end

- Install Angular cli globally
  npm install -g @angular/cli
- When there are multiple modules in the project, and using ng generate, specify module like this:
   ng generate component payment/from-account --module=app.module



