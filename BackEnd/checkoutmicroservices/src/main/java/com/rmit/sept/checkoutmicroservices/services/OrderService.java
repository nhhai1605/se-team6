package com.rmit.sept.checkoutmicroservices.services;

import com.paypal.api.payments.*;
import com.paypal.base.rest.APIContext;
import com.paypal.base.rest.PayPalRESTException;
import com.rmit.sept.checkoutmicroservices.model.OrderDetail;
import com.rmit.sept.checkoutmicroservices.repositories.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service
public class OrderService {

    @Autowired
    private APIContext context;

    @Autowired
    private OrderRepository orderRepository;

    public Payment createPayment(Double total, String currency, String method, String username,String description, String cancelUrl, String successUrl) throws PayPalRESTException {
        Amount amount = new Amount();
        amount.setCurrency(currency);
        total = new BigDecimal(total).setScale(2, RoundingMode.HALF_UP).doubleValue();
        amount.setTotal(String.format("%.2f", total));

        Transaction transaction = new Transaction();
        transaction.setDescription(description);
        transaction.setAmount(amount);

        List<Transaction> transactions = new ArrayList<>();
        transactions.add(transaction);

        Payer payer = new Payer();
        payer.setPaymentMethod(method.toString());
        Payment payment = new Payment();
        payment.setIntent("ORDER");
        payment.setPayer(payer);
        payment.setTransactions(transactions);
        RedirectUrls redirectUrls = new RedirectUrls();
        redirectUrls.setCancelUrl(cancelUrl);
        redirectUrls.setReturnUrl(successUrl);
        payment.setRedirectUrls(redirectUrls);
        return payment.create(context);
    }

    public Payment executePayment(String paymentId, String payerId) throws PayPalRESTException{
        Payment payment = new Payment();
        payment.setId(paymentId);
        PaymentExecution paymentExecute = new PaymentExecution();
        paymentExecute.setPayerId(payerId);
        return payment.execute(context, paymentExecute);
    }

    public void save(OrderDetail orderDetail) {
        orderRepository.save(orderDetail);
    }

    public void updateBookQuantity(String bookId, Integer quantity)
    {
        orderRepository.updateBookQuantity(bookId, quantity);
    }

    public Collection<OrderDetail> getOrders(String username) {
        return orderRepository.getOrders(username);
    }

    public void updateStatus(String orderId, String status)
    {
        orderRepository.updateStatus(orderId, status);
    }

    public Collection<OrderDetail> getAllOrders()
    {
        return (Collection<OrderDetail>)orderRepository.findAll();
    }

    public Long getLastOrder(String username)
    {
        return orderRepository.getLastOrder(username);
    }


    public String getPoster(String bookId)
    {
        return orderRepository.getPoster(bookId);
    }
    public float getPrice(String bookId)
    {
        return orderRepository.getPrice(bookId);
    }

    public Collection<OrderDetail> getOrdersForSeller(String username)
    {
        return orderRepository.getOrdersForSeller(username);
    }
}
