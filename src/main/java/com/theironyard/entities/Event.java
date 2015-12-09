package com.theironyard.entities;

import javax.persistence.*;

/**
 * Created by alhanger on 12/8/15.
 */
@Entity
@Table (name = "events")
public class Event {
    @Id
    @GeneratedValue
    public int id;

    @Column
    public String date;

    @ManyToMany
    public Band band;

    @ManyToOne
    public Venue venue;
}
