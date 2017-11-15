package com.hopefully.repository;

import com.hopefully.domain.Questionair;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import java.util.List;

/**
 * Spring Data JPA repository for the Questionair entity.
 */
@SuppressWarnings("unused")
@Repository
public interface QuestionairRepository extends JpaRepository<Questionair, Long> {

    @Query("select questionair from Questionair questionair where questionair.user.login = ?#{principal.username}")
    List<Questionair> findByUserIsCurrentUser();

}
