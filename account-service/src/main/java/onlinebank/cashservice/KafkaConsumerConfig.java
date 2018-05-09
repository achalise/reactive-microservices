package onlinebank.cashservice;

import lombok.extern.java.Log;
import onlinebank.cashservice.model.Transaction;
import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.kafka.common.serialization.StringDeserializer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.annotation.EnableKafka;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.config.ConcurrentKafkaListenerContainerFactory;
import org.springframework.kafka.core.ConsumerFactory;
import org.springframework.kafka.core.DefaultKafkaConsumerFactory;
import org.springframework.kafka.support.converter.DefaultJackson2JavaTypeMapper;
import org.springframework.kafka.support.serializer.JsonDeserializer;
import reactor.core.publisher.Mono;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by achalise on 4/10/17.
 */
@EnableKafka
@Configuration
@Log
public class KafkaConsumerConfig {

    @Autowired
    private CashAccountService cashAccountService;

    @Value(value = "${kafka.bootstrapAddress}")
    private String bootstrapAddress;

    @Bean
    public ConsumerFactory<String, Transaction> consumerFactory() {
        Map<String, Object> props = new HashMap<>();
        props.put(
                ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG,
                bootstrapAddress);
        props.put(
                ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG,
                StringDeserializer.class);
        props.put(
                ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG,
                JsonDeserializer.class);
        JsonDeserializer<Transaction> deserializer = new JsonDeserializer<>();
        deserializer.addTrustedPackages("*");
        Mapper mapper = new Mapper();

        Map<String, Class<?>> mapping = new HashMap<>();
        //mapping.put("TRANSACTION", Transaction.class);
        mapping.put("onlinebank.gateway.model.Transaction", Transaction.class);
        mapper.setIdClassMapping(mapping);
        mapper.addTrustedPackages("*");
        deserializer.setTypeMapper(mapper);
        return new DefaultKafkaConsumerFactory<>(props, new StringDeserializer(), deserializer);
    }

    @Bean
    public ConcurrentKafkaListenerContainerFactory<String, Transaction>
    kafkaListenerContainerFactory() {

        ConcurrentKafkaListenerContainerFactory<String, Transaction> factory
                = new ConcurrentKafkaListenerContainerFactory<>();
        factory.setConsumerFactory(consumerFactory());
        return factory;
    }

    @KafkaListener(topics = "mytopic", groupId = "two", containerFactory = "kafkaListenerContainerFactory")
    public void listen(Transaction message) {
        log.info("Received message " + message);
        System.out.println("Received Messasge in group foo: " + message);
        Mono<Boolean> result = cashAccountService.processTransaction(message);
        result.subscribe(t -> System.out.print("The result is " + t));
    }

    private class Mapper extends DefaultJackson2JavaTypeMapper {

    }
}