package com.theironyard.services;

import com.theironyard.entities.User;
import org.springframework.data.repository.CrudRepository;

/**
 * Created by alhanger on 12/8/15.
 */
public interface UserRepository extends CrudRepository<User, Integer> {
}
