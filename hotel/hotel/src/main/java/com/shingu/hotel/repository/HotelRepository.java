package com.shingu.hotel.repository;

import com.shingu.hotel.entity.HotelEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface HotelRepository extends JpaRepository<HotelEntity, Long> {

    Optional<HotelEntity> findByHotelName(String hotelName);

    @Query("""
    SELECT DISTINCT h FROM HotelEntity h
    JOIN FETCH h.rooms r
""")
    List<HotelEntity> findAllWithRooms();

    @Query("""
    SELECT DISTINCT h FROM HotelEntity h
    JOIN FETCH h.rooms r
    WHERE h.region LIKE %:region%
""")
    List<HotelEntity> findByRegionWithRooms(@Param("region") String region);
}
