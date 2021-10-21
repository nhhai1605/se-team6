package com.rmit.sept.checkoutmicroservices.repositories;
import com.rmit.sept.checkoutmicroservices.model.OrderDetail;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;
import java.util.Date;

@Repository
public interface OrderRepository extends  CrudRepository<OrderDetail, Long>
{

    @Modifying
    @Transactional
    @Query(value="UPDATE BOOK SET QUANTITY = QUANTITY - ?2 WHERE ID=?1", nativeQuery = true)
    void updateBookQuantity(String bookId, Integer quantity);

    @Query(value = "SELECT * FROM ORDER_DETAIL WHERE USERNAME = ?1", nativeQuery = true)
    Collection<OrderDetail> getOrders(String username);

    @Modifying
    @Transactional
    @Query(value="UPDATE ORDER_DETAIL SET STATUS = ?2 WHERE ID=?1", nativeQuery = true)
    void updateStatus(String orderId, String status);

    @Query(value = "SELECT MAX(ID) AS ID FROM ORDER_DETAIL WHERE USERNAME=?1", nativeQuery = true)
    Long getLastOrder(String username);

    @Query(value="SELECT USERNAME FROM BOOK WHERE ID=?1", nativeQuery = true)
    String getPoster(String bookId);

    @Query(value="SELECT PRICE FROM BOOK WHERE ID=?1", nativeQuery = true)
    float getPrice(String bookId);

    @Query(value = "SELECT * FROM ORDER_DETAIL WHERE POSTER = ?1", nativeQuery = true)
    Collection<OrderDetail> getOrdersForSeller(String username);
}
