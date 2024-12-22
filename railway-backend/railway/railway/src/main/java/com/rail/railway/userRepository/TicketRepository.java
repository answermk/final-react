package com.rail.railway.userRepository;

import com.rail.railway.model.Ticket;
import com.rail.railway.model.Train;
import com.rail.railway.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TicketRepository extends JpaRepository<Ticket, Long> {
    List<Ticket> findByUser(User user);
    Ticket findByUserAndTrain(User user, Train train);

    List<Ticket> findByTrainId(Long trainId);
}
