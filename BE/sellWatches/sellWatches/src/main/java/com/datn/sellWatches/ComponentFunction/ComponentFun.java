package com.datn.sellWatches.ComponentFunction;

import org.springframework.stereotype.Component;

@Component
public class ComponentFun {
    public String validInputToken(String token) {
        if(token.startsWith("Bearer ")) {
            token.substring(7);
        }
        return token;
    }
    public String safeToString(Object obj) {
        return obj != null ? obj.toString() : "";
    }
}
