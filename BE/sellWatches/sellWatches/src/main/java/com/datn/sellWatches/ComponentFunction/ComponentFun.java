package com.datn.sellWatches.ComponentFunction;

public class ComponentFun {
    public String validInputToken(String token) {
        if(token.startsWith("Bearer ")) {
            token.substring(7);
        }
        return token;
    }
}
