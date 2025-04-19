package com.datn.sellWatches.Exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

@Getter
public enum ErrorCode {
    UNCATEGORIZED_EXCEPTION(9999, "Lỗi chưa xác định", HttpStatus.INTERNAL_SERVER_ERROR),
    PRODUCT_NOT_EXIT(1001, "Không tìm thấy sản phẩm", HttpStatus.BAD_REQUEST),
    ORDER_NOT_EXIT(1002, "Không tìm thấy đơn hàng", HttpStatus.BAD_REQUEST),
    CUSTOMER_NOT_EXIT(1003, "Không tìm thấy khách hàng", HttpStatus.BAD_REQUEST),
    ROLE_NOT_EXIT(1004, "Không tìm thấy quyền", HttpStatus.BAD_REQUEST),
    UNAUTHENTICATED(1005, "Tài khoản chưa được xác thực", HttpStatus.UNAUTHORIZED),
    UNAUTHORIZED(1006, "Bạn không có quyền sử dụng", HttpStatus.FORBIDDEN),
    INVALID_KEY(1007, "Key không hợp lệ", HttpStatus.BAD_REQUEST),
    ACCOUNT_NOT_EXISTED(1008, "Không tìm thấy tài khoản", HttpStatus.BAD_REQUEST),
    TYPE_NOT_EXIT(1004, "Không tìm thấy loại sản phẩm", HttpStatus.BAD_REQUEST),
    ;
    private int code = 100;
    private String message;
    private HttpStatusCode statusCode;

    private ErrorCode(int code, String message, HttpStatusCode statusCode) {
        this.code = code;
        this.message = message;
        this.statusCode = statusCode;
    }

}
