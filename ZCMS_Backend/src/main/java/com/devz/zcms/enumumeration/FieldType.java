package com.devz.zcms.enumumeration;

public enum FieldType {
    TEXT("TEXT"), RICH_TEXT("RICH_TEXT"), MEDIA("MEDIA"), DATE("DATE");

    private String type;

    FieldType(String type) {
        this.type = type;
    }

    public String getType(){
        return type;
    }
}
