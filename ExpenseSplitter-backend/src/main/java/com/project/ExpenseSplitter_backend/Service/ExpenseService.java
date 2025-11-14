package com.project.ExpenseSplitter_backend.Service;

import com.project.ExpenseSplitter_backend.Entity.Expense;
import com.project.ExpenseSplitter_backend.Entity.Participant;
import com.project.ExpenseSplitter_backend.Repo.ExpenseRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ExpenseService {

    @Autowired
    private ExpenseRepo expenseRepository;

    public Expense createExpense(Expense expense) {

        if (expense.getParticipants() == null || expense.getParticipants().isEmpty()) {
            throw new IllegalArgumentException("At least one participant required");
        }

        int totalParticipants = expense.getParticipants().size() + 1;
        double splitAmount = expense.getAmount() / totalParticipants;

        for (Participant p : expense.getParticipants()) {
            p.setShare(splitAmount);
        }

        Expense saved = expenseRepository.save(expense);

        sendWhatsAppNotifications(saved);

        return saved;
    }

    private void sendWhatsAppNotifications(Expense expense) {
        StringBuilder message = new StringBuilder();
        int totalParticipants = expense.getParticipants().size() + 1;
        double eachShare = expense.getAmount() / totalParticipants;

        message.append("💰 *Expense Split Notification*\n\n")
                .append("Expense: ").append(expense.getTitle()).append("\n")
                .append("Total Amount: ₹").append(expense.getAmount()).append("\n")
                .append("Paid By: ").append(expense.getPaidBy()).append("\n")
                .append("Date: ").append(expense.getDate()).append("\n\n")
                .append("🧾 *Split Details:*\n");

        for (Participant p : expense.getParticipants()) {
            message.append(p.getName())
                    .append(" → ₹")
                    .append(String.format("%.2f", eachShare))
                    .append("\n");
        }

        // include payer in list too
        message.append(expense.getPaidBy())
                .append(" → ₹")
                .append(String.format("%.2f", eachShare))
                .append(" (Paid)\n");

        message.append("\nEveryone owes ₹")
                .append(String.format("%.2f", eachShare))
                .append(" including ")
                .append(expense.getPaidBy())
                .append(".\n\n- Sent via *Expense Splitter 💡*");

        System.out.println("WhatsApp message to send:\n" + message);
    }

    public List<Expense> findByPaidBy(String username) {
        return expenseRepository.findByPaidBy(username);
    }
    public List<Expense> getExpensesByUser(String email) {
        return expenseRepository.findByCreatedBy(email);
    }
    public boolean deleteExpense(Long id, String email) {
        Optional<Expense> expenseOpt = expenseRepository.findById(id);

        if (expenseOpt.isEmpty()) return false;

        Expense expense = expenseOpt.get();

        // ❗ Ensure user can delete only their own expenses
        if (!expense.getCreatedBy().equals(email)) {
            return false;
        }

        expenseRepository.delete(expense);
        return true;
    }
}


