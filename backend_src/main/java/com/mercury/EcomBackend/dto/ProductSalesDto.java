package com.mercury.EcomBackend.dto;

public class ProductSalesDto {
    private String productName;
    private Long sales;

    public ProductSalesDto(String productName, Long sales) {
        this.productName = productName;
        this.sales = sales;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public Long getSales() {
        return sales;
    }

    public void setSales(Long sales) {
        this.sales = sales;
    }
}
