package com.theironyard.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

/**
 * Created by alhanger on 12/8/15.
 */
@Entity
public class Venue {
    @Id
    @GeneratedValue
    public int id;

    @Column
    public String name;

    @Column
    public String address;
}
