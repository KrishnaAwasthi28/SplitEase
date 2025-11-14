package com.project.ExpenseSplitter_backend.Controller;

import com.project.ExpenseSplitter_backend.Entity.Expense;
import com.project.ExpenseSplitter_backend.Service.ExpenseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/expenses")
public class ExpenseController {

    @Autowired
    private ExpenseService expenseService;

    @PostMapping("/create")
    public ResponseEntity<?> createExpense(HttpServletRequest request, @RequestBody Expense expense) {
        System.out.println("---- CONTROLLER DEBUG ----");
        System.out.println("From Filter (email attr): " + request.getAttribute("email"));
        System.out.println("Authorization header: " + request.getHeader("Authorization"));
        System.out.println("--------------------------");
        String email = (String) request.getAttribute("email");
        if (email == null) {
            return ResponseEntity.status(401).body(java.util.Map.of("error", "Unauthorized"));
        }
        expense.setCreatedBy(email);
        Expense saved = expenseService.createExpense(expense);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/user/{email}")
    public ResponseEntity<?> getExpensesByUser(HttpServletRequest request,
                                               @PathVariable String email) {

        String jwtEmail = (String) request.getAttribute("email");

        if (jwtEmail == null || !jwtEmail.equals(email)) {
            return ResponseEntity.status(401).body(
                    java.util.Map.of("error", "Unauthorized")
            );
        }

        List<Expense> list = expenseService.getExpensesByUser(email);
        return ResponseEntity.ok(list);
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteExpense(HttpServletRequest request, @PathVariable Long id) {
        String email = (String) request.getAttribute("email");

        if (email == null) {
            return ResponseEntity.status(401).body(Map.of("error", "Unauthorized"));
        }

        boolean deleted = expenseService.deleteExpense(id, email);

        if (!deleted) {
            return ResponseEntity.status(403).body(Map.of("error", "Not allowed"));
        }

        return ResponseEntity.ok(Map.of("message", "Expense deleted successfully"));
    }
}