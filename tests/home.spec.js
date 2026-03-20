// @ts-check
import { test, expect } from "@playwright/test";

test("deve carregar a Home e verificar CTA principal", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await expect(page).toHaveTitle(/Nexus Tech/);

  // Verifica o banner principal
  const cta = page.getByRole("link", { name: "Fazer teste grátis" });
  await expect(cta).toBeVisible();
  await cta.click();
  await expect(page).toHaveURL(/\/registration|\/dashboard/);
});

test("deve validar links do footer", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  const privacyLink = page.getByRole("link", {
    name: "Política de Privacidade",
  });
  await privacyLink.click();
  await expect(page).toHaveURL(/\/privacy-policy/);
});
