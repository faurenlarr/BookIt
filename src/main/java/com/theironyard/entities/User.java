package com.theironyard.entities;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

/**
 * Created by alhanger on 12/8/15.
 */
@Entity
public class User {
    @Id
    @GeneratedValue
    public int id;

    @Column(nullable = false)
    public String username;

    @Column(nullable = false)
    public String password;

    @Column(nullable = false)
    public String firstName;

    @Column(nullable = false)
    public String lastName;

    @Column(nullable = false)
    public String location;

    @Column(nullable = false)
    public String email;

    @Column(nullable = false)
    public String phoneNum;
}
