import { test, expect } from '@playwright/test';

test.describe('Страница "Конструктор"', () => {
  test.beforeEach(async ({ page }) => {
    
    await page.goto('http://localhost:5173');
    
    await page.waitForSelector('[data-testid="ingredient-card"]', { timeout: 10000 });
  });

  test.describe('Перетаскивание ингредиентов', () => {
    test('должен добавлять булку в конструктор при перетаскивании', async ({ page }) => {
      const bun = page.locator('[data-testid="ingredient-card"]').filter({ hasText: 'Краторная булка' }).first();
      
      const dropZone = page.locator('[data-testid="constructor-drop-zone-bun"]').first();
      
      await bun.dragTo(dropZone);

      await expect(dropZone).toContainText('Краторная булка');
    });

    test('должен добавлять ингредиент в конструктор при перетаскивании', async ({ page }) => {
      const ingredient = page.locator('[data-testid="ingredient-card"]').filter({ hasText: 'Соус Spicy-X' }).first();
      
      const dropZone = page.locator('[data-testid="constructor-drop-zone"]');
      
      await ingredient.dragTo(dropZone);
      
      const ingredientItem = page.locator('[data-testid="constructor-drop-zone"]').first();
      await expect(ingredientItem).toContainText('Соус Spicy-X');
    });

    test('должен обновлять общую стоимость при добавлении ингредиентов', async ({ page }) => {
      const dropZone = page.locator('[data-testid="constructor-drop-zone"]');
      
      const initialPrice = await page.locator('[data-testid="total-price"]').textContent();
      
      const ingredient = page.locator('[data-testid="ingredient-card"]').filter({ hasText: 'Соус Spicy-X' }).first();
      await ingredient.dragTo(dropZone);
      
      const newPrice = await page.locator('[data-testid="total-price"]').textContent();
      expect(newPrice).not.toBe(initialPrice);
    });

    test('должен заменять булку при добавлении новой', async ({ page }) => {
      const bun1 = page.locator('[data-testid="ingredient-card"]').filter({ hasText: 'Краторная булка' }).first();
      const dropZone = page.locator('[data-testid="constructor-drop-zone-bun"]').first();
      await bun1.dragTo(dropZone);
      
      await expect(dropZone).toContainText('Краторная булка');
      
      const bun2 = page.locator('[data-testid="ingredient-card"]').filter({ hasText: 'Флюоресцентная булка' }).first();
      await bun2.dragTo(dropZone);
      
      await expect(dropZone).toContainText('Флюоресцентная булка');
    });
  });

  test.describe('Создание заказа', () => {
    test('должен создавать заказ при нажатии на кнопку', async ({ page }) => {
      await page.addInitScript(() => {
        localStorage.setItem('accessToken', 'Bearer mock-token');
        localStorage.setItem('refreshToken', 'mock-refresh-token');
      });

      await page.route('**/auth/user', async (route) => {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            success: true,
            user: {
              email: 'test@example.com',
              name: 'Test User'
            }
          })
        });
      });

      await page.route('**/orders', async (route) => {
        console.log('✅ Order request intercepted!');
        const headers = route.request().headers();
        console.log('Order request headers:', headers);
        
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            success: true,
            order: {
              number: 12345,
            }
          })
        });
      });
      await page.goto('http://localhost:5173');
      await page.waitForSelector('[data-testid="ingredient-card"]', { timeout: 10000 });
      
      const bun = page.locator('[data-testid="ingredient-card"]').filter({ hasText: 'Краторная булка' }).first();
      const dropZone = page.locator('[data-testid="constructor-drop-zone-bun"]').first();
      await bun.dragTo(dropZone);
      
      const ingredient = page.locator('[data-testid="ingredient-card"]').filter({ hasText: 'Филе Люминесцентного тетраодонтимформа' }).first();
      const ingredientsDropZone = page.locator('[data-testid="constructor-drop-zone"]');
      await ingredient.dragTo(ingredientsDropZone);

      const orderButton = page.locator('button', { hasText: 'Оформить заказ' });
      await orderButton.click();
      
      const modal = page.locator('[data-testid="modal"]');
      await expect(modal).toBeVisible({ timeout: 10000 });

      const orderNumber = page.locator('[data-testid="h1-modal"]');
      await expect(orderNumber).toBeVisible({ timeout: 10000 });
      
      const numberText = await orderNumber.textContent();
      expect(numberText).toMatch(/^\d+$/);
    });
    test('кнопка "Оформить заказ" должна быть disabled без булки', async ({ page }) => {
      const ingredient = page.locator('[data-testid="ingredient-card"]').filter({ hasText: 'Филе Люминесцентного тетраодонтимформа' }).first();
      const ingredientsDropZone = page.locator('[data-testid="constructor-drop-zone"]');
      await ingredient.dragTo(ingredientsDropZone);
      
      const orderButton = page.locator('button', { hasText: 'Оформить заказ' });
      await expect(orderButton).toBeDisabled();
    });
  });
});