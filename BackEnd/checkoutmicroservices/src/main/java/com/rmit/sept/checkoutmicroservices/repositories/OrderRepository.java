package com.rmit.sept.checkoutmicroservices.repositories;
import com.rmit.sept.checkoutmicroservices.model.OrderDetail;
import com.rmit.sept.checkoutmicroservices.model.OrderForSeller;
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

    @Modifying
    @Transactional
    @Query(value="UPDATE ORDER_FOR_SELLER SET STATUS = ?2 WHERE ID=?1", nativeQuery = true)
    void updateStatusForSeller(String orderId, String status);

    @Query(value = "SELECT MAX(ID) AS ID FROM ORDER_DETAIL WHERE USERNAME=?1", nativeQuery = true)
    Long getLastOrder(String username);

    @Transactional
    @Modifying
    @Query(value = "INSERT INTO ORDER_FOR_SELLER (ID, BOOK_ID, ORDER_ID, BUYER, POSTER, QUANTITY, STATUS, CREATE_AT, DATE_STRING) VALUES (?1, ?2, ?3, ?4, ?5, ?6, 'Pending', ?7, ?8)", nativeQuery = true)
    void createOrderForSeller(Long id, Long bookId, Long orderId, String buyer, String poster, int quantity, Date date, String dateString);

    @Query(value="SELECT USERNAME FROM BOOK WHERE ID=?1", nativeQuery = true)
    String getPoster(String bookId);

    @Query(value="SELECT * FROM ORDER_FOR_SELLER WHERE POSTER=?1", nativeQuery = true)
    Collection<Object> getOrderForSeller(String username);
    @Modifying
    @Transactional
    @Query(value="DELETE FROM ORDER_FOR_SELLER WHERE ID=?1", nativeQuery = true)
    void deleteOrderForSeller(Long orderForSellerId);
}
