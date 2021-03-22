# Scheduled Integration Job

## In this folder you will find:
* /openshift: YAML files that are used on openshift
* /publisher: app used to publish an event
* /subscriber: app used to get an event

References:
* Website of Artemis ActiveMQ: https://activemq.apache.org/components/artemis/
* Image of Artemis ActiveMQ: https://github.com/vromero/activemq-artemis-docker
* Package MQTT from npm: https://www.npmjs.com/package/mqtt

## Openshift
```
oc new-project scheduled-job-dv --display-name="Scheduled Job - Test"

oc new-app --name=artemis vromero/activemq-artemis -e RESTORE_CONFIGURATION=true

oc expose service/artemis --port=8161

oc apply -f template.yaml
oc process scheduled-job-dv-template | oc create -f -

oc apply -f service.yaml

oc apply -f pingsource.yaml

```

## Publisher
* When started it will make a connection to the Artemis ActiveMQ app
* It wil publish a json object to the `change-db` queue
* And end the connection

```
docker run -it --rm -p 8011:8011 -e PORT=8011 -e BROKER_URL=<IP_ADDRESS> -e BROKER_PORT=<PORT> -e BROKER_USER=<NAME> -e BROKER_PWD=<PASSWORD>  neclaes/publisher

```

### Subscriber
* When started it wil make a connection to the Artemis ActiveMQ app
* it will subcribe to the queue `change-db` and listen to incoming events

```
docker run -it --rm -p 8012:8012 -e PORT=8011 -e BROKER_URL=<IP_ADDRESS> -e BROKER_PORT=<PORT> -e BROKER_USER=<NAME> -e BROKER_PWD=<PASSWORD>  neclaes/subscriber

```