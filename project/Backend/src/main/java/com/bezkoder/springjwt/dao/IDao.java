package com.bezkoder.springjwt.dao;

import java.util.List;

public interface IDao<T> {
    T save (T o);
    void update(T o);

    void delete(T o);


    List<T> findAll();
}