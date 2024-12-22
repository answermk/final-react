package com.rail.railway.service;

import com.rail.railway.model.*;
import com.rail.railway.userRepository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AccountantService {

    @Autowired
    private TicketPriceRepository ticketPriceRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private TicketRepository ticketRepository;

    @Autowired
    private TrainRepository trainRepository;

    // Update ticket price for a train
    public void updateTicketPrice(Long trainId, Double price, String trainClass) {
        TicketPrice ticketPrice = ticketPriceRepository.findByTrainId(trainId);
        if (ticketPrice == null) {
            ticketPrice = new TicketPrice();
            ticketPrice.setTrain(trainRepository.findById(trainId).orElseThrow(() -> new RuntimeException("Train not found")));
            ticketPrice.setTrainClass(trainClass);
        }
        ticketPrice.setPrice(price);
        ticketPriceRepository.save(ticketPrice);
    }

    // Get ticket price for a specific train
    public TicketPrice getTicketPrice(Long trainId) {
        return ticketPriceRepository.findByTrainId(trainId);
    }

    // Get all transactions for a ticket
    public List<Transaction> getTransactions(Long ticketId) {
        return transactionRepository.findByTicketId(ticketId);
    }

    // Get the total revenue
    public Double getTotalRevenue() {
        List<Ticket> tickets = ticketRepository.findAll();
        double totalRevenue = 0;
        for (Ticket ticket : tickets) {
            TicketPrice ticketPrice = ticketPriceRepository.findByTrainId(ticket.getTrain().getId());
            if (ticketPrice != null) {
                totalRevenue += ticketPrice.getPrice();
            }
        }
        return totalRevenue;
    }

    // Get revenue by train
    public Double getRevenueByTrain(Long trainId) {
        List<Ticket> tickets = ticketRepository.findByTrainId(trainId);
        double totalRevenue = 0;
        for (Ticket ticket : tickets) {
            TicketPrice ticketPrice = ticketPriceRepository.findByTrainId(ticket.getTrain().getId());
            if (ticketPrice != null) {
                totalRevenue += ticketPrice.getPrice();
            }
        }
        return totalRevenue;
    }
}
