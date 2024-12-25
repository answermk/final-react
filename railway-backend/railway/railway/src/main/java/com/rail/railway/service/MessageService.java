package com.rail.railway.service;


import com.rail.railway.model.Message;
import com.rail.railway.userRepository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class MessageService {

    @Autowired
    private MessageRepository messageRepository;

    public Message saveMessage(Message message) {
        return messageRepository.save(message);
    }

    public List<Message> getAllMessages() {
        return messageRepository.findByOrderByTimestampDesc();
    }

    public List<Message> getMessagesByLanguage(String language) {
        return messageRepository.findByLanguage(language);
    }

    public Message getMessageById(Long id) {
        return messageRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Message not found with id: " + id));
    }

    public void deleteMessage(Long id) {
        messageRepository.deleteById(id);
    }
}