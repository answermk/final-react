package com.rail.railway.userRepository;


import com.rail.railway.model.Train;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TrainRepository extends JpaRepository<Train, Long> {
    List<Train> findAll();
}

