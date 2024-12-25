package com.rail.railway.userRepository;

import com.rail.railway.model.TicketPrice;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TicketPriceRepository extends JpaRepository<TicketPrice, Long> {
    TicketPrice findByTrainId(Long trainId);
}
