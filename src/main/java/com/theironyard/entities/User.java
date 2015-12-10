package com.theironyard.entities;


import javax.persistence.*;

/**
 * Created by alhanger on 12/8/15.
 */
@Entity
@Table (name = "users")
public class User {
    @Id
    @GeneratedValue
    public int id;

    @Column(nullable = false)
    public String username;

    @Column(nullable = false)
    public String password;

    @Column(nullable = false)
    public String password2;

    @Column(nullable = false)
    public String firstName;

    @Column(nullable = false)
    public String lastName;

    @Column(nullable = false)
    public String city;

    @Column(nullable = false)
    public String state;

    @Column(nullable = false)
    public String email;

    @Column(nullable = false)
    public String phoneNum;
}
