package com.example.demo.controller;

import com.example.demo.dto.MenuRequest;
import com.example.demo.dto.MenuResponse;
import com.example.demo.service.MenuService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/menus")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", maxAge = 3600)
public class MenuController {

    private final MenuService menuService;

    /**
     * 创建菜单
     */
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<MenuResponse> createMenu(@Valid @RequestBody MenuRequest request) {
        return ResponseEntity.ok(menuService.createMenu(request));
    }

    /**
     * 更新菜单
     */
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<MenuResponse> updateMenu(
            @PathVariable Long id,
            @Valid @RequestBody MenuRequest request) {
        return ResponseEntity.ok(menuService.updateMenu(id, request));
    }

    /**
     * 删除菜单
     */
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteMenu(@PathVariable Long id) {
        menuService.deleteMenu(id);
        return ResponseEntity.ok().build();
    }

    /**
     * 获取菜单树
     */
    @GetMapping("/tree")
    public ResponseEntity<List<MenuResponse>> getMenuTree() {
        return ResponseEntity.ok(menuService.getMenuTree());
    }

    /**
     * 获取菜单列表
     */
    @GetMapping
    public ResponseEntity<List<MenuResponse>> getMenuList() {
        return ResponseEntity.ok(menuService.getMenuList());
    }

    /**
     * 获取单个菜单
     */
    @GetMapping("/{id}")
    public ResponseEntity<MenuResponse> getMenu(@PathVariable Long id) {
        return ResponseEntity.ok(menuService.getMenu(id));
    }
}
