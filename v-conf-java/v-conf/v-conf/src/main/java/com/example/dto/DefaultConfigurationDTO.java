package com.example.dto;

public class DefaultConfigurationDTO {

    private Integer id;
    private String name;
    private String compName; // Component category: "Air Bags", "Transmission"
    private String compType; // S / I / E / C

    public DefaultConfigurationDTO(
            Integer id,
            String name,
            String compName,
            String compType) {
        this.id = id;
        this.name = name;
        this.compName = compName;
        this.compType = compType;
    }

    public Integer getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getCompName() {
        return compName;
    }

    public String getCompType() {
        return compType;
    }
}
