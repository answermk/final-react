package com.rail.railway.model;

import jakarta.persistence.*;

//import javax.*;

@Entity
public class TicketPrice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "train_id")
    private Train train;

    private Double price; // Price of the ticket

    private String trainClass; // e.g., "Economy", "First Class"

    // Getters and setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Train getTrain() {
        return train;
    }

    public void setTrain(Train train) {
        this.train = train;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getTrainClass() {
        return trainClass;
    }

    public void setTrainClass(String trainClass) {
        this.trainClass = trainClass;
    }
}
