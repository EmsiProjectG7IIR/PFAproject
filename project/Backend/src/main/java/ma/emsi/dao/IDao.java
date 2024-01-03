package ma.emsi.dao;

import java.util.List;
import java.util.Optional;

public interface IDao<T> {
    T save (T o);
    void update(T o);

    void delete(T o);


    List<T> findAll();
}