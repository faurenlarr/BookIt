package com.theironyard.controllers;

import com.theironyard.entities.*;
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
    public void login(HttpSession session, @RequestBody User params, HttpServletResponse response) throws Exception {

        User user = users.findOneByUsername(params.username);
        if (user == null) {
            response.sendRedirect("/create-account");
        }
        else if (!PasswordHash.validatePassword(params.password, user.password)) {
            throw new Exception("Wong password.");
        }

        session.setAttribute("username", params.username);
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

        user.password = PasswordHash.createHash(user.password);

        users.save(user);
        session.setAttribute("username", user.username);
    }

    @RequestMapping("/edit-account")
    public void editAccount(HttpSession session, @RequestBody User user) throws Exception {
        String name = (String) session.getAttribute("username");
        User user2 = users.findOneByUsername(name);

        if (user2 == null && user2.id != user.id) {
            throw new Exception("Not logged in.");
        }

        user.password = PasswordHash.createHash(user.password);

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
    public void editBand(HttpSession session, @RequestBody Band band) throws Exception {
        String username = (String) session.getAttribute("username");
        User user = users.findOneByUsername(username);
        if (user == null) {
            throw new Exception("Not logged in.");
        }

        bands.save(band);
    }
}
