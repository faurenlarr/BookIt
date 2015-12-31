package com.theironyard.services;

import com.theironyard.entities.Message;
import org.springframework.data.repository.CrudRepository;

/**
 * Created by alhanger on 12/31/15.
 */
public interface MessageRepository extends CrudRepository<Message, Integer> {
}
