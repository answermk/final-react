package com.rail.railway.userRepository;


import com.rail.railway.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findByLanguage(String language);
    List<Message> findByOrderByTimestampDesc();
}