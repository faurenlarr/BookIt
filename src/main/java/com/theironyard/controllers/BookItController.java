package com.theironyard.controllers;

import com.theironyard.entities.*;
import com.theironyard.services.*;
import com.theironyard.utils.PasswordHash;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;


@RestController
public class BookItController {

    public final String API_KEY = "YlX4r2ab8xzzlYDB";

    @Autowired
    UserRepository users;

    @Autowired
    BandRepository bands;

    @Autowired
    EventRepository events;

    @Autowired
    VenueRepository venues;

    @Autowired
    PicFileRepository pics;

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

        band.user = user;
        bands.save(band);
    }

    @RequestMapping("/edit-band/{bandId}")
    public void editBand(HttpSession session, @RequestBody Band band, @PathVariable("bandId") int id) throws Exception {
        String username = (String) session.getAttribute("username");
        User user = users.findOneByUsername(username);
        if (user == null) {
            throw new Exception("Not logged in.");
        }

        Band band2 = bands.findOne(id);
        band2.name = band.name;
        band2.city = band.city;
        band2.state = band.state;
        band2.genre = band.genre;

        bands.save(band2);
    }

    @RequestMapping("/get-bands/{id}")
    public List<Band> getBands(@PathVariable("id") int id) {
        return bands.findAllByUserId(id);
    }

    @RequestMapping("/get-band/{id}")
    public Band getBand(@PathVariable("id") int id) {
        return bands.findOne(id);
    }

    @RequestMapping("/delete-band/{id}")
    public void deleteBand(@PathVariable("id") int id) {
        bands.delete(id);
    }

    @RequestMapping(path = "/search-venues/{location}", method = RequestMethod.GET)
    public ArrayList<HashMap> getVenues(@PathVariable("location") String location) {
        String request = "http://api.songkick.com/api/3.0/search/venues.json";

        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(request)
                .queryParam("query", location)
                .queryParam("apikey", API_KEY);

        RestTemplate query = new RestTemplate();
        HashMap search = query.getForObject(builder.build().encode().toUri(), HashMap.class);
        HashMap resultsPage = (HashMap) search.get("resultsPage");
        HashMap results = (HashMap) resultsPage.get("results");
        ArrayList<HashMap> venues = (ArrayList<HashMap>) results.get("venue");

        return venues;
    }

    @RequestMapping(path = "/get-calendar/{venueId}", method = RequestMethod.GET)
    public ArrayList<HashMap> getCalendar(@PathVariable("venueId") int venueId) {
        String request = "http://api.songkick.com/api/3.0/venues/" + venueId + "/calendar.json";

        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(request)
                .queryParam("apikey", API_KEY);

        RestTemplate query = new RestTemplate();
        HashMap search = query.getForObject(builder.build().encode().toUri(), HashMap.class);
        HashMap resultsPage = (HashMap) search.get("resultsPage");
        HashMap results = (HashMap) resultsPage.get("results");
        ArrayList<HashMap> events = (ArrayList<HashMap>) results.get("event");

        return events;
    }

    @RequestMapping(path = "/get-shows/{location}/{date}", method = RequestMethod.GET)
    public ArrayList<HashMap> getShows(@PathVariable("location") String location, @PathVariable("date") String date) {
        ArrayList<HashMap> cityResults = new ArrayList();

        String requestVenues = "http://api.songkick.com/api/3.0/search/venues.json";

        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(requestVenues)
                .queryParam("query", location)
                .queryParam("apikey", API_KEY);

        RestTemplate query = new RestTemplate();
        HashMap search = query.getForObject(builder.build().encode().toUri(), HashMap.class);
        HashMap resultsPage = (HashMap) search.get("resultsPage");
        HashMap results = (HashMap) resultsPage.get("results");
        ArrayList<HashMap> venues = (ArrayList<HashMap>) results.get("venue");

        for (HashMap venue : venues) {
            int id = (Integer) venue.get("id");
            String requestCalendar = "http://api.songkick.com/api/3.0/venues/" + id + "/calendar.json";

            UriComponentsBuilder builder2 = UriComponentsBuilder.fromHttpUrl(requestCalendar)
                    .queryParam("apikey", API_KEY);

            RestTemplate query2 = new RestTemplate();
            HashMap search2 = query2.getForObject(builder2.build().encode().toUri(), HashMap.class);
            HashMap resultsPage2 = (HashMap) search2.get("resultsPage");
            HashMap results2 = (HashMap) resultsPage2.get("results");
            ArrayList<HashMap> events = (ArrayList<HashMap>) results2.get("event");

            if (events == null) {
                continue;
            }

            for (HashMap event : events) {
                HashMap show = (HashMap) event.get("start");
                String showDate = (String) show.get("date");

                if (date.equals(showDate)) {
                    cityResults.add(event);
                }
            }
        }

        return cityResults;
    }

    @RequestMapping("/upload")
    public void upload(MultipartFile file) throws IOException {
        File f = File.createTempFile("pic", file.getOriginalFilename(), new File("public/assests"));
        FileOutputStream fos = new FileOutputStream(f);
        fos.write(file.getBytes());

        PicFile pic = new PicFile();
        pic.originalName = file.getOriginalFilename();
        pic.name = file.getName();

        pics.save(pic);
    }
}
