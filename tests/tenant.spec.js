import { test, expect } from "@playwright/test";

test("deve completar o wizard de criação de negócio", async ({ page }) => {
  await page.goto("http://localhost:3000/dashboard");

  await page.fill('input[placeholder="Ex.: Maria Silva"', "João Dono");
  await page.selectOption("select", { label: "Tecnologia" });
  await page.click("text=Avançar");

  const progressBar = page.locator('[aria-label="Progesso de cadastro"]');
  await expect(progressBar).toHaveAttribute("aria-valuenow", /[0-9]+/);
});
