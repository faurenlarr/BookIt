package com.theironyard.entities;

import javax.persistence.*;

/**
 * Created by alhanger on 12/8/15.
 */
@Entity
public class Band {
    @Id
    @GeneratedValue
    public int id;

    @Column(nullable = false)
    public String name;

    @Column(nullable = false)
    public String location;

    @Column(nullable = false)
    public String genre;

    @ManyToOne
    public User user;
}
