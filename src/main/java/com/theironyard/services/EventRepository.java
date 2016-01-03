package com.theironyard.services;

import com.theironyard.entities.Event;
import org.springframework.data.repository.CrudRepository;


/**
 * Created by alhanger on 12/8/15.
 */
public interface EventRepository extends CrudRepository<Event, Integer> {
    Event findFirstByDateAndVenueName(String date, String venueName);
    Event findFirstByDateAndBandId(String date, int bandId);
}
