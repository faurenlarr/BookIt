package com.theironyard.entities;

import javax.persistence.*;
import java.util.Collection;

/**
 * Created by alhanger on 12/8/15.
 */
@Entity
@Table (name = "events")
public class Event {
    @Id
    @GeneratedValue
    public int id;

    @Column(nullable = false)
    public String date;

    @Column(nullable = false)
    public String venueName;

    @Column
    public String venueAddress;

    @Column
    public String venuePhoneNum;

    @Column
    public String venueWebsite;

    @Column
    public int venueLong;

    @Column
    public int venueLat;

    @ManyToMany(
            cascade = {CascadeType.PERSIST, CascadeType.MERGE},
            mappedBy = "events",
            targetEntity = Band.class
    )
    public Collection bands;

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getVenueName() {
        return venueName;
    }

    public void setVenueName(String venueName) {
        this.venueName = venueName;
    }

    public String getVenueAddress() {
        return venueAddress;
    }

    public void setVenueAddress(String venueAddress) {
        this.venueAddress = venueAddress;
    }

    public String getVenuePhoneNum() {
        return venuePhoneNum;
    }

    public void setVenuePhoneNum(String venuePhoneNum) {
        this.venuePhoneNum = venuePhoneNum;
    }

    public String getVenueWebsite() {
        return venueWebsite;
    }

    public void setVenueWebsite(String venueWebsite) {
        this.venueWebsite = venueWebsite;
    }

    public int getVenueLong() {
        return venueLong;
    }

    public void setVenueLong(int venueLong) {
        this.venueLong = venueLong;
    }

    public int getVenueLat() {
        return venueLat;
    }

    public void setVenueLat(int venueLat) {
        this.venueLat = venueLat;
    }

    public Collection getBands() {
        return bands;
    }

    public void setBands(Collection bands) {
        this.bands = bands;
    }
}
