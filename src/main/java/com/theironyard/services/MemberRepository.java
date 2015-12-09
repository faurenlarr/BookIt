package com.theironyard.services;

import com.theironyard.entities.Member;
import org.springframework.data.repository.CrudRepository;

/**
 * Created by alhanger on 12/8/15.
 */
public interface MemberRepository extends CrudRepository<Member, Integer> {
}
