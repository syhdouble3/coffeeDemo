package com.example.demo.service;

import com.example.demo.dto.MenuRequest;
import com.example.demo.dto.MenuResponse;
import com.example.demo.entity.Menu;
import com.example.demo.repository.MenuRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MenuService {

    private final MenuRepository menuRepository;

    /**
     * 创建菜单
     */
    @Transactional
    public MenuResponse createMenu(MenuRequest request) {
        if (menuRepository.existsByCode(request.getCode())) {
            throw new IllegalArgumentException("菜单编号已存在");
        }

        Menu menu = Menu.builder()
                .name(request.getName())
                .sort(request.getSort())
                .path(request.getPath())
                .code(request.getCode())
                .remark(request.getRemark())
                .build();

        if (request.getParentId() != null) {
            Menu parent = menuRepository.findById(request.getParentId())
                    .orElseThrow(() -> new EntityNotFoundException("父菜单不存在"));
            menu.setParent(parent);
        }

        return convertToResponse(menuRepository.save(menu));
    }

    /**
     * 更新菜单
     */
    @Transactional
    public MenuResponse updateMenu(Long id, MenuRequest request) {
        Menu menu = menuRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("菜单不存在"));

        if (!menu.getCode().equals(request.getCode()) &&
                menuRepository.existsByCodeAndIdNot(request.getCode(), id)) {
            throw new IllegalArgumentException("菜单编号已存在");
        }

        menu.setName(request.getName());
        menu.setSort(request.getSort());
        menu.setPath(request.getPath());
        menu.setCode(request.getCode());
        menu.setRemark(request.getRemark());

        if (request.getParentId() != null
                && !request.getParentId().equals(menu.getParent() != null ? menu.getParent().getId() : null)) {
            Menu parent = menuRepository.findById(request.getParentId())
                    .orElseThrow(() -> new EntityNotFoundException("父菜单不存在"));
            menu.setParent(parent);
        } else if (request.getParentId() == null) {
            menu.setParent(null);
        }

        return convertToResponse(menuRepository.save(menu));
    }

    /**
     * 删除菜单
     */
    @Transactional
    public void deleteMenu(Long id) {
        Menu menu = menuRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("菜单不存在"));
        menuRepository.delete(menu);
    }

    /**
     * 获取菜单树
     */
    @Transactional(readOnly = true)
    public List<MenuResponse> getMenuTree() {
        List<Menu> rootMenus = menuRepository.findByParentIsNullOrderBySort();
        return rootMenus.stream()
                .map(this::convertToTreeResponse)
                .collect(Collectors.toList());
    }

    /**
     * 获取菜单列表(扁平结构)
     */
    @Transactional(readOnly = true)
    public List<MenuResponse> getMenuList() {
        return menuRepository.findAllWithParent().stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    /**
     * 获取单个菜单
     */
    @Transactional(readOnly = true)
    public MenuResponse getMenu(Long id) {
        Menu menu = menuRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("菜单不存在"));
        return convertToResponse(menu);
    }

    /**
     * 转换为树形响应
     */
    private MenuResponse convertToTreeResponse(Menu menu) {
        MenuResponse response = convertToResponse(menu);
        if (!menu.getChildren().isEmpty()) {
            response.setChildren(menu.getChildren().stream()
                    .map(this::convertToTreeResponse)
                    .collect(Collectors.toList()));
        }
        return response;
    }

    /**
     * 转换为响应对象
     */
    private MenuResponse convertToResponse(Menu menu) {
        return MenuResponse.builder()
                .id(menu.getId())
                .name(menu.getName())
                .sort(menu.getSort())
                .parentId(menu.getParent() != null ? menu.getParent().getId() : null)
                .parentName(menu.getParent() != null ? menu.getParent().getName() : null)
                .path(menu.getPath())
                .code(menu.getCode())
                .remark(menu.getRemark())
                .createTime(menu.getCreateTime())
                .updateTime(menu.getUpdateTime())
                .build();
    }
}
