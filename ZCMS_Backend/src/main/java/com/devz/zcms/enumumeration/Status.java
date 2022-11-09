package com.devz.zcms.enumumeration;

public enum Status {
    PUBLISH("PUBLISH"), UN_PUBLISH("UN_PUBLISH");

    private String type;

    Status(String type) {
        this.type = type;
    }

    public String getType(){
        return type;
    }
}
