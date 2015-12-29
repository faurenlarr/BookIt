package com.theironyard.services;

import com.theironyard.entities.Event;
import org.springframework.data.repository.CrudRepository;

import java.util.ArrayList;

/**
 * Created by alhanger on 12/8/15.
 */
public interface EventRepository extends CrudRepository<Event, Integer> {
    Event findFirstByDate(String date);
}
