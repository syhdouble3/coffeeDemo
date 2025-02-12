package com.example.demo.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MenuRequest {
    @NotBlank(message = "菜单名称不能为空")
    @Size(max = 100, message = "菜单名称长度不能超过100")
    private String name;

    private Integer sort;

    private Long parentId;

    @Size(max = 200, message = "路由路径长度不能超过200")
    private String path;

    @NotBlank(message = "菜单编号不能为空")
    @Size(max = 50, message = "菜单编号长度不能超过50")
    private String code;

    @Size(max = 500, message = "备注长度不能超过500")
    private String remark;
}
