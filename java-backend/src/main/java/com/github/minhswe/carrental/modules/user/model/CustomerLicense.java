package com.github.minhswe.carrental.modules.user.model;

import java.time.Instant;

public class CustomerLicense {
    private String id;
    private String licenseNumber;
    private String licenseClass;
    private Instant issuedDate;
    private Instant expiryDate;
    private String ImageUrl;
    private boolean verified;
    private String verifiedBy;
    private Instant verifiedAt;
    private String customerId;
}
