import { expect, test } from "@playwright/test";

test('login existoso con standar_user', async ({ page }) => {
  // 1. Ir a la página
  await page.goto('https://www.saucedemo.com');
  // 2. Llenar el formulario
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  //await page.locator('#user-name').fill('standard_user');
  //await page.locator('[data-test="password"]').fill('secret_sauce');
  // 3. Hacer clic en el botón
  await page.getByRole('button', { name: 'Login' }).click();
  // 4. Verificar que entramos: la URL cambió y se ve el titulo Products
  await expect(page).toHaveURL(/.*inventory/);
  await expect(page.getByText('Products')).toBeVisible();

  // Localiza la tarjeta del producto por su nombre y busca el botón "Add to cart" dentro de ella
  const mochila = page.locator('.inventory_item').filter({ hasText: 'Sauce Labs Backpack' });
  await mochila.getByRole('button', { name: 'Add to cart' }).click();
  await expect(page.locator('.inventory_item')).toHaveCount(6);
});

