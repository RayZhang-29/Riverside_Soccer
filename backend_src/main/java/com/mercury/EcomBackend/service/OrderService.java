package com.mercury.EcomBackend.service;

import com.mercury.EcomBackend.bean.Order;
import com.mercury.EcomBackend.bean.OrderDetail;
import com.mercury.EcomBackend.bean.Product;
import com.mercury.EcomBackend.bean.Refund;
import com.mercury.EcomBackend.dao.*;
import com.mercury.EcomBackend.dto.*;
import com.mercury.EcomBackend.security.JWTUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class OrderService {
    @Autowired
    private OrderDao orderDao;
    @Autowired
    private UserDao userDao;
    @Autowired
    private JWTUtil jwtUtil;

    public List<OrderItemDto> findAllOrders() {
        List<Order> orders = orderDao.findAll();
        return orders.stream().map(order -> orderToOrderItemDto(order, order.getUserId())).collect(Collectors.toList());
    }


    public Order findOrderById(int id) {
        return orderDao.findById(id).orElse(null);
    }
    public void deleteOrderById(int id) {
        orderDao.deleteById(id);
    }

    @Autowired
    private OrderDetailDao orderDetailDao;

    @Autowired
    private ProductDao productDao;

    public Order saveOrder(OrderDto orderData) {
        String token = orderData.getUserToken().getToken();
        System.out.println("cur_token " + token);
        // Convert OrderDTO to Order and OrderDetails entities
        Order order = new Order();
        order.setUserId(jwtUtil.getUserIdFromToken(token));
        order.setOrderTime(new Date());
        order.setUsername(orderData.getPersonalInfo().getName());
        order.setPhone(orderData.getPersonalInfo().getPhoneNumber());
        order.setShippingAddress(orderData.getShippingInfo().getAddress());
        order.setCountry(orderData.getShippingInfo().getCountry());
        order.setCity(orderData.getShippingInfo().getCity());
        order.setState(orderData.getShippingInfo().getState());
        order.setZip(orderData.getShippingInfo().getZip());

        Order savedOrder = orderDao.save(order);

        List<OrderDetail> orderDetailList = orderData.getCartItems().stream()
                .map(cartItemDto -> {
                    OrderDetail orderDetail = new OrderDetail();
                    orderDetail.setSize(cartItemDto.getSize());
                    orderDetail.setQuantity(cartItemDto.getQuantity());
                    orderDetail.setOrderId(savedOrder.getId());
                    orderDetail.setProductId(cartItemDto.getId());

                    return orderDetail;
                })
                .collect(Collectors.toList());

//        savedOrder.setOrderDetail(orderDetailList);
        for (OrderDetail orderDetail : orderDetailList) {
            orderDetailDao.save(orderDetail);
        }

        return savedOrder;
    }

    public List<OrderItemDto> getOrdersByUserId(int userId) {
        List<Order> orders = orderDao.findByUserId(userId);
        return orders.stream().map(order -> orderToOrderItemDto(order, userId)).collect(Collectors.toList());
    }

    private OrderItemDto orderToOrderItemDto(Order order, int userId) {
        OrderItemDto orderItemDto = new OrderItemDto();
        orderItemDto.setOrderNumber(order.getId());
        orderItemDto.setUserId(userId);
        orderItemDto.setDate(order.getOrderTime());
        orderItemDto.setStatus("processing");

        OrderItemDto.PersonalInfo personalInfo = new OrderItemDto.PersonalInfo();
        personalInfo.setName(order.getUsername());
        personalInfo.setPhone(order.getPhone());

        orderItemDto.setPersonalInfo(personalInfo);

        OrderItemDto.ShippingInfo shippingInfo = new OrderItemDto.ShippingInfo();
        shippingInfo.setAddress(order.getShippingAddress());
        shippingInfo.setCountry(order.getCountry());
        shippingInfo.setCity(order.getCity());
        shippingInfo.setState(order.getState());
        shippingInfo.setZip(order.getZip());

        orderItemDto.setShippingInfo(shippingInfo);


        List<OrderDetail> orderDetails = orderDetailDao.findOrderDetailsByOrderId(order.getId());

        List<Product> products = orderDetails.stream()
                .map(orderDetail -> productDao.findById(orderDetail.getProductId()).orElse(null))
                .filter(Objects::nonNull)
                .collect(Collectors.toList());

        List<ProductDto> productDtos = new ArrayList<>();
        for (Product product : products) {
            List<OrderDetail> productOrderDetails = orderDetails.stream()
                    .filter(od -> od.getProductId() == product.getId())
                    .collect(Collectors.toList());

            for (OrderDetail orderDetail : productOrderDetails) {
                ProductDto productDto = new ProductDto();
                productDto.setProduct(product);
                productDto.setSize(orderDetail.getSize()); // from order details
                productDto.setQuantity(orderDetail.getQuantity()); // from order details
                String refundStatus = getRefundStatus(order.getId(), product.getId());
                productDto.setStatus(refundStatus);
                productDtos.add(productDto);
            }
        }
        orderItemDto.setProducts(productDtos);

        double total = 10;
        for (ProductDto p : productDtos) {
            total += p.getQuantity() * p.getProduct().getPrice();
        }
        orderItemDto.setTotalPrice(total);

        return orderItemDto;
    }

    @Autowired
    private RefundDao refundDao;

    public RefundDto requestRefund(RefundDto refundDto) {
        Refund refund = new Refund();
        refund.setOrderId(refundDto.getOrderItemDto().getOrderNumber());
        refund.setProductId(refundDto.getProductDto().getProduct().getId());
        refund.setRefundTime(new Date());
        refund.setUserId(refundDto.getOrderItemDto().getUserId());
        refund.setStatus("processing");
        refundDao.save(refund);

        refundDto.getProductDto().setStatus("processing");

        return refundDto;
    }

    private String getRefundStatus(int orderId, int productId) {
        List<Refund> refunds = refundDao.findByOrderIdAndProductId(orderId, productId);
        if (!refunds.isEmpty()) {
            return refunds.get(0).getStatus();
        }
        return null;
    }

    public List<RefundResopnseDto> getAllRefunds() {
        List<Refund> refunds = refundDao.findAll();
        List<RefundResopnseDto> refundResopnseDtos = refunds.stream()
                .map(refund -> {
                    RefundResopnseDto refundResopnseDto = new RefundResopnseDto();
                    refundResopnseDto.setRefund(refund);
                    refundResopnseDto.setUsername(userDao.getUserById(refund.getUserId()).getUsername());
                    refundResopnseDto.setProductName(productDao.findById(refund.getProductId()).get().getName());
                    return refundResopnseDto;
                }).collect(Collectors.toList());
        return refundResopnseDtos;

    }

    public Refund approveRefund(int refundId) {
        Refund refund = refundDao.findById(refundId)
                .orElseThrow(() -> new IllegalArgumentException("Refund not found"));;
        refund.setStatus("approved");
        return refundDao.save(refund);
    }

    public Refund refuseRefund(int refundId) {
        Refund refund = refundDao.findById(refundId)
                .orElseThrow(() -> new IllegalArgumentException("Refund not found"));;
        refund.setStatus("refused");
        return refundDao.save(refund);
    }
}







//        List<ProductDto> productDtos = products.stream()
//                        .map(product -> {
//                            ProductDto productDto = new ProductDto();
//                            productDto.setProduct(product);
//                            productDto.setSize(); //from order details
//                            productDto.setQuantity();
//                            String refundStatus = getRefundStatus(order.getId(), product.getId());
//                            productDto.setStatus(refundStatus);
//                            return productDto;
//                        }).collect(Collectors.toList());
//        orderItemDto.setProducts(productDtos);
