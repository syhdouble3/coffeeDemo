package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MenuResponse {
    private Long id;
    private String name;
    private Integer sort;
    private Long parentId;
    private String parentName;
    private List<MenuResponse> children;
    private String path;
    private String code;
    private String remark;
    private LocalDateTime createTime;
    private LocalDateTime updateTime;
}
