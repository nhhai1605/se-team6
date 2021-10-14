package com.rmit.sept.checkoutmicroservices.web;

import com.rmit.sept.checkoutmicroservices.model.OrderDetail;
import com.rmit.sept.checkoutmicroservices.repositories.OrderRepository;
import com.rmit.sept.checkoutmicroservices.services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.paypal.api.payments.Links;
import com.paypal.base.rest.PayPalRESTException;

import java.util.Collection;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/checkout")
public class OrderController
{
    @Autowired
    OrderService orderService;

    public static final String SUCCESS_URL = "http://localhost:8083/api/checkout/success";
    public static final String CANCEL_URL = "http://localhost:8083/api/checkout/cancel";

    @PostMapping("/payment")
    public String payment(@RequestBody OrderDetail orderDetail) {
        try {
            com.paypal.api.payments.Payment payment = orderService.createPayment(orderDetail.getTotal(), orderDetail.getCurrency(), orderDetail.getMethod(),
                    orderDetail.getUsername(), orderDetail.getDescription(), CANCEL_URL, SUCCESS_URL + "?username=" + orderDetail.getUsername() + "&description=" + orderDetail.getDescription());
            for(Links link:payment.getLinks()) {
                if(link.getRel().equals("approval_url"))
                {
                    return link.getHref();
                }
            }

        } catch (PayPalRESTException e) {

            e.printStackTrace();
        }
        return "http://localhost:3000/checkout/fail";
    }

    @GetMapping("/cancel")
    public String cancelPay()
    {
        return "http://localhost:3000/checkout/fail";
    }

    @GetMapping("/success")
    public ResponseEntity successPay(@RequestParam("username") String username, @RequestParam("description") String description, @RequestParam("paymentId") String paymentId, @RequestParam("PayerID") String PayerID)
    {
        HttpHeaders headers = new HttpHeaders();
        try
        {
            com.paypal.api.payments.Payment payment = orderService.executePayment(paymentId, PayerID);
            OrderDetail orderDetail = new OrderDetail();
            String address = "";
            address += payment.getPayer().getPayerInfo().getShippingAddress().getLine1() + " ";
            address += payment.getPayer().getPayerInfo().getShippingAddress().getCity() + " ";
            address += payment.getPayer().getPayerInfo().getShippingAddress().getPostalCode() + " ";
            address += payment.getPayer().getPayerInfo().getShippingAddress().getState() + " ";
            address += payment.getPayer().getPayerInfo().getShippingAddress().getCountryCode();
            orderDetail.setUsername(username);
            orderDetail.setCurrency(payment.getTransactions().get(0).getAmount().getCurrency());
            orderDetail.setTotal(Double.parseDouble(payment.getTransactions().get(0).getAmount().getTotal()));
            orderDetail.setMethod("Paypal");
            orderDetail.setDescription(description);
            orderDetail.setAddress(address);
            if (payment.getState().equals("approved"))
            {
                orderService.save(orderDetail);
                String[] items = description.split("/");
                for (String item : items)
                {
                    String bookId = item.split(":")[0];
                    String quantity = item.split(":")[1];
                    orderService.updateBookQuantity(bookId, Integer.parseInt(quantity));
                }
                headers.add("Location", "http://localhost:3000/checkout/success?paymentId=" + paymentId + "&PayerID=" + PayerID);
            }
            else
            {
                headers.add("Location", "http://localhost:3000/checkout/fail/");
            }
            return new ResponseEntity(headers,HttpStatus.FOUND);
        }
        catch (PayPalRESTException e)
        {
            System.out.println(e.getMessage());
        }
        headers.add("Location", "http://localhost:3000/checkout/fail/");
        return new ResponseEntity(headers, HttpStatus.FOUND);
    }

    @GetMapping("/getOrders")
    public @ResponseBody
    Collection<OrderDetail> getReviewsForBook(@RequestParam("username") String username)
    {
        return orderService.getOrders(username);
    }
}