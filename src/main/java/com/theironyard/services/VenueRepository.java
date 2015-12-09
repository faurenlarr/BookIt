package com.theironyard.services;

import com.theironyard.entities.Venue;
import org.springframework.data.repository.CrudRepository;

/**
 * Created by alhanger on 12/8/15.
 */
public interface VenueRepository extends CrudRepository<Venue, Integer> {
}
