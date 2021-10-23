package com.rmit.sept.checkoutmicroservices.web;

import com.paypal.api.payments.Order;
import com.rmit.sept.checkoutmicroservices.model.OrderDetail;
import com.rmit.sept.checkoutmicroservices.services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.paypal.api.payments.Links;
import com.paypal.base.rest.PayPalRESTException;

import java.text.Format;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collection;


@RestController
@CrossOrigin(origins = { "http://sept-team6.us-east-1.elasticbeanstalk.com", "http://localhost" })
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
        return "http://sept-team6.us-east-1.elasticbeanstalk.com/checkout/fail";
    }

    @GetMapping("/cancel")
    public String cancelPay()
    {
        return "http://sept-team6.us-east-1.elasticbeanstalk.com/checkout/fail";
    }

    @GetMapping("/success")
    public ResponseEntity successPay(@RequestParam("username") String username, @RequestParam("description") String description, @RequestParam("paymentId") String paymentId, @RequestParam("PayerID") String PayerID)
    {
        HttpHeaders headers = new HttpHeaders();
        try
        {
            com.paypal.api.payments.Payment payment = orderService.executePayment(paymentId, PayerID);
            if (payment.getState().equals("approved"))
            {
                Collection <OrderDetail> orders = new ArrayList<OrderDetail>();
                String[] items = description.split("/");
                for (String item : items)
                {
                    String bookId = item.split(":")[0];
                    String quantity = item.split(":")[1];
                    String poster = orderService.getPoster(bookId);
                    Boolean added = false;
                    for (int i = 0; i < orders.size(); i++)
                    {
                        if(((OrderDetail)orders.toArray()[i]).getPoster().equals(poster))
                        {
                            added = true;
                            ((OrderDetail)orders.toArray()[i]).setDescription(((OrderDetail)orders.toArray()[i]).getDescription() + "/" + item);
                            float price = orderService.getPrice(bookId) * Integer.parseInt(quantity);
                            ((OrderDetail)orders.toArray()[i]).setTotal(((OrderDetail)orders.toArray()[i]).getTotal() + price);
                            break;
                        }
                    }
                    if(added == false)
                    {
                        OrderDetail order = new OrderDetail ();
                        String address = "";
                        address += payment.getPayer().getPayerInfo().getShippingAddress().getLine1() + " ";
                        address += payment.getPayer().getPayerInfo().getShippingAddress().getCity() + " ";
                        address += payment.getPayer().getPayerInfo().getShippingAddress().getPostalCode() + " ";
                        address += payment.getPayer().getPayerInfo().getShippingAddress().getState() + " ";
                        address += payment.getPayer().getPayerInfo().getShippingAddress().getCountryCode();
                        order.setUsername(username);
                        order.setCurrency(payment.getTransactions().get(0).getAmount().getCurrency());
                        float price = orderService.getPrice(bookId) * Integer.parseInt(quantity);
                        order.setTotal(price);
                        order.setMethod("Paypal");
                        order.setStatus("Pending");
                        order.setDescription(item);
                        order.setAddress(address);
                        order.setPoster(poster);
                        orders.add(order);
                    }
                    orderService.updateBookQuantity(bookId, Integer.parseInt(quantity));
                }
                for(OrderDetail order : orders)
                {
                    orderService.save(order);
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
    public @ResponseBody Collection<OrderDetail> getOrders(@RequestParam("username") String username)
    {
        return orderService.getOrders(username);
    }
    @GetMapping("/getOrdersForSeller")
    public @ResponseBody Collection<OrderDetail> getOrdersForSeller(@RequestParam("username") String username)
    {
        return orderService.getOrdersForSeller(username);
    }
    @GetMapping("/all")
    public @ResponseBody Collection<OrderDetail> getAllOrders()
    {
        Collection<OrderDetail> orders = orderService.getAllOrders();
        return orders;
    }
    @PutMapping("/updateStatus/{orderId}/{status}")
    public void updateStatus(@PathVariable String orderId, @PathVariable String status)
    {
        orderService.updateStatus(orderId, status);
    }
}
