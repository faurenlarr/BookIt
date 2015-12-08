package com.theironyard.entities;

import javax.persistence.*;

/**
 * Created by alhanger on 12/8/15.
 */
@Entity
public class Member {
    @Id
    @GeneratedValue
    public int id;

    @Column(nullable = false)
    public String firstName;

    @Column(nullable = false)
    public String lastName;

    @Column
    public String role;

    @Column
    public String email;

    @Column
    public String phoneNum;

    @ManyToOne
    public Band band;
}
