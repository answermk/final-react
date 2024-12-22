package com.rail.railway.controller;

import com.rail.railway.model.Ticket;
import com.rail.railway.model.User;
import com.rail.railway.model.Train;
import com.rail.railway.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;


@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class AdminController {

    @Autowired
    private AdminService adminService;

    // Admin Dashboard
    @GetMapping("/dashboard")
    public String getDashboard(Model model) {
        List<User> users = adminService.getAllUsers();
        model.addAttribute("users", users);
        return "admin/dashboard";
    }

    // Add User
    @GetMapping("/user/add")
    public String addUserForm(Model model) {
        model.addAttribute("user", new User());
        return "admin/user-form";
    }

    @PostMapping("/user/add")
    public String addUser(@ModelAttribute("user") User user) {
        adminService.registerUser(user);
        return "redirect:/admin/dashboard";
    }

    // Edit User
    @GetMapping("/user/edit/{id}")
    public String editUser(@PathVariable Long id, Model model) {
        User user = adminService.getUserById(id);
        model.addAttribute("user", user);
        return "admin/user-form";
    }

    @PostMapping("/user/edit")
    public String editUser(@ModelAttribute("user") User user) {
        adminService.updateUser(user);
        return "redirect:/admin/dashboard";
    }

    // Delete User
    @GetMapping("/user/delete/{id}")
    public String deleteUser(@PathVariable Long id) {
        adminService.deleteUser(id);
        return "redirect:/admin/dashboard";
    }

    // Add Train
    @GetMapping("/train/add")
    public String addTrainForm(Model model) {
        model.addAttribute("train", new Train());
        return "admin/train-form";
    }

    @PostMapping("/train/add")
    public String addTrain(@ModelAttribute("train") Train train) {
        adminService.addTrain(train);
        return "redirect:/admin/dashboard";
    }

    // Edit Train
    @GetMapping("/train/edit/{id}")
    public String editTrain(@PathVariable Long id, Model model) {
        Train train = adminService.getTrainById(id);
        model.addAttribute("train", train);
        return "admin/train-form";
    }

    @PostMapping("/train/edit")
    public String editTrain(@ModelAttribute("train") Train train) {
        adminService.updateTrain(train);
        return "redirect:/admin/dashboard";
    }

    // Delete Train
    @GetMapping("/train/delete/{id}")
    public String deleteTrain(@PathVariable Long id) {
        adminService.deleteTrain(id);
        return "redirect:/admin/dashboard";
    }


    // Fetch all trains (Train Schedule)
    @GetMapping("/train-schedule")
    public List<Train> getTrainSchedule() {
        return adminService.getTrainSchedule();
    }

    // Book Ticket
    @PostMapping("/book-ticket")
    public String bookTicket(@RequestParam Long userId, @RequestParam Long trainId) {
        try {
            adminService.bookTicket(userId, trainId);
            return "Ticket booked successfully";
        } catch (RuntimeException e) {
            return e.getMessage();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    // View Ticket for the user
    @GetMapping("/my-ticket")
    public Ticket getMyTicket(@RequestParam Long userId) {
        return adminService.getTicketByUser(userId);
    }
}
