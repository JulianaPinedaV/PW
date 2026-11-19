import { Page } from "@playwright/test";

export async function login(page: Page, usuario = 'standard_user') {
    await page.goto('https://www.saucedemo.com');
    await page.getByPlaceholder('Username').fill(usuario);
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', {name: 'Login'}).click();
}; 

