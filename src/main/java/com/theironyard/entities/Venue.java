package com.theironyard.entities;

import javax.persistence.*;

/**
 * Created by alhanger on 12/8/15.
 */
@Entity
@Table (name = "venues")
public class Venue {
    @Id
    @GeneratedValue
    public int id;

    @Column
    public String name;

    @Column
    public String address;
}
