package com.theironyard.controllers;

import com.theironyard.entities.User;
import com.theironyard.entities.Band;
import com.theironyard.entities.Event;
import com.theironyard.entities.Venue;
import com.theironyard.entities.Member;
import com.theironyard.services.*;
import com.theironyard.utils.PasswordHash;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 * Created by alhanger on 12/8/15.
 */
@RestController
public class BookItController {

    @Autowired
    UserRepository users;

    @Autowired
    BandRepository bands;

    @Autowired
    EventRepository events;

    @Autowired
    VenueRepository venues;

    @RequestMapping("/login")
    public void login(HttpSession session, String username, String password, HttpServletResponse response) throws Exception {

        User user = users.findOneByUsername(username);
        if (user == null) {
            response.sendRedirect("/create-account");
        }
        else if (!PasswordHash.validatePassword(password, user.password)) {
            throw new Exception("Wong password.");
        }

        session.setAttribute("username", username);
    }

    @RequestMapping("/logout")
    public void logout(HttpSession session) {
        session.invalidate();
    }

    @RequestMapping("/get-user")
    public User getUser(HttpSession session) throws Exception {
        User user = users.findOneByUsername((String)session.getAttribute("username"));

        if (user == null) {
            throw new Exception("Not logged in.");
        }

        return user;
    }

    @RequestMapping("/create-account")
    public void createAccount(@RequestBody User user, HttpSession session) throws Exception {

        if (!user.password.equals(user.password2)) {
            throw new Exception ("Your passwords did not match.");
        } else {
            user.password = PasswordHash.createHash(user.password);
        }

        users.save(user);
        session.setAttribute("username", user.username);
    }

    @RequestMapping("/edit-account")
    public void editAccount(HttpSession session, @RequestBody User user) throws Exception {
        String name = (String) session.getAttribute("username");
        User user2 = users.findOneByUsername(name);

        if (user == null) {
            throw new Exception("Not logged in.");
        }

        if (!PasswordHash.validatePassword(user.password, user2.password)) {
            throw new Exception("Your password was incorrect.");
        } else {
            user2.username = user.username;
            user2.password = user.password;
            user2.firstName = user.firstName;
            user2.lastName = user.lastName;
            user2.city = user.city;
            user2.state = user.state;
            user2.email = user.email;
            user2.phoneNum = user.phoneNum;
        }

        users.save(user);
    }

    @RequestMapping("/create-band")
    public void createBand(HttpSession session, @RequestBody Band band) throws Exception {
        String username = (String) session.getAttribute("username");
        User user = users.findOneByUsername(username);
        if (user == null) {
            throw new Exception("Not logged in.");
        }

        bands.save(band);
    }

    @RequestMapping("/edit-band")
    public void editBand(HttpSession session, int id, String name, String location, String genre) throws Exception {
        String username = (String) session.getAttribute("username");
        User user = users.findOneByUsername(username);
        if (user == null) {
            throw new Exception("Not logged in.");
        }

        Band band = bands.findOne(id);
        band.name = name;
        band.location = location;
        band.genre = genre;
        bands.save(band);
    }
}
