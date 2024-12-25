package com.rail.railway.controller;

import com.rail.railway.model.*;
import com.rail.railway.service.AccountantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/accountant")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class AccountantController {

    @Autowired
    private AccountantService accountantService;

    // Get ticket price for a specific train
    @GetMapping("/ticket-price/{trainId}")
    public TicketPrice getTicketPrice(@PathVariable Long trainId) {
        return accountantService.getTicketPrice(trainId);
    }

    // Update ticket price for a specific train
    @PostMapping("/ticket-price")
    public String updateTicketPrice(@RequestParam Long trainId, @RequestParam Double price, @RequestParam String trainClass) {
        try {
            accountantService.updateTicketPrice(trainId, price, trainClass);
            return "Ticket price updated successfully";
        } catch (RuntimeException e) {
            return e.getMessage();
        }
    }

    // Get all transactions for a ticket
    @GetMapping("/transactions/{ticketId}")
    public List<Transaction> getTransactions(@PathVariable Long ticketId) {
        return accountantService.getTransactions(ticketId);
    }

    // Get total revenue
    @GetMapping("/revenue")
    public Double getTotalRevenue() {
        return accountantService.getTotalRevenue();
    }

    // Get revenue by train
    @GetMapping("/revenue/{trainId}")
    public Double getRevenueByTrain(@PathVariable Long trainId) {
        return accountantService.getRevenueByTrain(trainId);
    }
}
