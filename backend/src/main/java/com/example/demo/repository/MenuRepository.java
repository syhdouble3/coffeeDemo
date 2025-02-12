package com.example.demo.repository;

import com.example.demo.entity.Menu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MenuRepository extends JpaRepository<Menu, Long> {

    /**
     * 查找所有顶级菜单(没有父菜单的)
     */
    List<Menu> findByParentIsNullOrderBySort();

    /**
     * 根据编号查找菜单
     */
    Optional<Menu> findByCode(String code);

    /**
     * 检查编号是否已存在(排除指定ID)
     */
    boolean existsByCodeAndIdNot(String code, Long id);

    /**
     * 检查编号是否已存在
     */
    boolean existsByCode(String code);

    /**
     * 根据父ID查找子菜单
     */
    List<Menu> findByParentIdOrderBySort(Long parentId);

    /**
     * 查找所有菜单(扁平结构,用于列表展示)
     */
    @Query("SELECT m FROM Menu m LEFT JOIN FETCH m.parent ORDER BY m.sort")
    List<Menu> findAllWithParent();
}
