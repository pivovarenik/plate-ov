package by.tarasovna.modules.deals.repository;

import by.tarasovna.common.enums.DealStatus;
import by.tarasovna.modules.deals.entity.Deal;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface DealRepository extends JpaRepository<Deal, Long> {

    Page<Deal> findByStatus(DealStatus status, Pageable pageable);

    Page<Deal> findByCustomerId(Long customerId, Pageable pageable);

    @Query("SELECT d FROM Deal d WHERE d.status = :status AND (LOWER(d.title) LIKE LOWER(CONCAT('%', :search, '%')))")
    Page<Deal> searchDealsByStatus(@Param("search") String search, @Param("status") DealStatus status, Pageable pageable);
}
