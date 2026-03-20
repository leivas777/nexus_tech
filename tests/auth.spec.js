import { test, expect } from "@playwright/test";

test("deve realizar fluco de cadastro com sucesso", async ({ page }) => {
  await page.goto("http://localhost:3000/registration");
  await page.getByRole("tab", { name: "Criar Conta" }).click();

  await page.fill('input[name="name"]', "Empresa de Teste");
  await page.fill('input[name="email"]', `teste${Date.now()}@nexus.com`);
  await page.fill('input[name="password"]', "SenhaSegura123");

  await page.click('button[type="submit"]');
  await expect(page).toHaveURL(/\/dashboard|auth-success/);

  await page.fill('input[placeholder="Ex: Barbearia Nexus"]', "Empresa Teste");
  await page.selectOption("select", { label: "Tecnologia" });
  await page.click("text=Próximo");

  const progressBar = page.locator('[aria-label="Progresso de Cadastro"]');
  await expect(progressBar).toHaveText("Passo 2 de 3");
});
