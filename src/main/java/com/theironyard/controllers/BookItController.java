package com.theironyard.controllers;

import com.theironyard.entities.User;
import com.theironyard.entities.Band;
import com.theironyard.entities.Event;
import com.theironyard.entities.Venue;
import com.theironyard.entities.Member;
import com.theironyard.services.BandRepository;
import com.theironyard.services.EventRepository;
import com.theironyard.services.UserRepository;
import com.theironyard.services.VenueRepository;
import com.theironyard.utils.PasswordHash;
import org.springframework.beans.factory.annotation.Autowired;
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

    @RequestMapping("/get-user")
    public User getUser(HttpSession session) throws Exception {
        User user = users.findOneByUsername((String)session.getAttribute("username"));

        if (user == null) {
            throw new Exception("Not logged in.");
        }

        return user;
    }

    @RequestMapping("/create-account")
    public void createAccount(String username,
                              String password,
                              String firstName,
                              String lastName,
                              String location,
                              String email,
                              String phoneNum,
                              HttpSession session) throws Exception {
        User user = new User();
        user.username = username;
        user.password = PasswordHash.createHash(password);
        user.firstName = firstName;
        user.lastName = lastName;
        user.location = location;
        user.email = email;
        user.phoneNum = phoneNum;

        users.save(user);

        session.setAttribute("username", username);
    }

    @RequestMapping("/edit-account")
    public void editAccount(HttpSession session,
                            String username,
                            String oldPassword,
                            String newPassword,
                            String firstName,
                            String lastName,
                            String location,
                            String email,
                            String phoneNum) throws Exception {
        String name = (String) session.getAttribute("username");
        User user = users.findOneByUsername(name);

        if (user == null) {
            throw new Exception("Not logged in.");
        }

        user.username = username;
        user.firstName = firstName;
        user.lastName = lastName;
        user.location = location;
        user.email = email;
        user.phoneNum = phoneNum;

        if (!PasswordHash.validatePassword(oldPassword, user.password)) {
            throw new Exception("Wrong password.");
        } else {
            user.password = newPassword;
        }

        users.save(user);
    }

    @RequestMapping("/create-band")
    public void createBand(HttpSession session, String name, String location, String genre) throws Exception {
        String username = (String) session.getAttribute("username");
        User user = users.findOneByUsername(username);
        if (user == null) {
            throw new Exception("Not logged in.");
        }

        Band band = new Band();
        band.name = name;
        band.location = location;
        band.genre = genre;
        band.user = user;
        bands.save(band);
    }
}
