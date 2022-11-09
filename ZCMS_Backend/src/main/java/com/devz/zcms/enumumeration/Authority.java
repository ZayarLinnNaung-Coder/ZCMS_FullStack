package com.devz.zcms.enumumeration;

public enum Authority {

    READ("READ"), WRITE("WRITE"), UPDATE("UPDATE"), DELETE("DELETE");

    private String permissionType;

    Authority(String permissionType) {
        this.permissionType = permissionType;
    }

    public String getPermissionType(){
        return permissionType;
    }
}
