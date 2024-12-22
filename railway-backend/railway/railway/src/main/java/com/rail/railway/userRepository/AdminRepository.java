package com.rail.railway.userRepository;

import com.rail.railway.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AdminRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    List<User> findByLastLoginIsNotNull();
}