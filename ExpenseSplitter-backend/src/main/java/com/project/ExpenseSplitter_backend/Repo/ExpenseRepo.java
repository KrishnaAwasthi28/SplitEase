package com.project.ExpenseSplitter_backend.Repo;

import com.project.ExpenseSplitter_backend.Entity.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExpenseRepo extends JpaRepository<Expense, Long> {
    List<Expense> findByPaidBy(String paidBy);
    List<Expense> findByCreatedBy(String createdBy);
}