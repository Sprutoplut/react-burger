import { test, expect } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const INGREDIENTS = {
  BUN_CRATOR: 'Краторная булка',
  BUN_FLUORESCENT: 'Флюоресцентная булка',
  SAUCE_SPICY_X: 'Соус Spicy-X',
  FILLET_TETRAODON: 'Филе Люминесцентного тетраодонтимформа',
} as const;

const SELECTORS = {
  INGREDIENT_CARD: '[data-testid="ingredient-card"]',
  CONSTRUCTOR_DROP_ZONE: '[data-testid="constructor-drop-zone"]',
  CONSTRUCTOR_DROP_ZONE_BUN: '[data-testid="constructor-drop-zone-bun"]',
  TOTAL_PRICE: '[data-testid="total-price"]',
  MODAL: '[data-testid="modal"]',
  MODAL_TITLE: '[data-testid="h1-modal"]',
} as const;

const BUTTONS = {
  ORDER: 'Оформить заказ',
} as const;

const getIngredientByText = (page: any, text: string) => {
  return page.locator(SELECTORS.INGREDIENT_CARD).filter({ hasText: text }).first();
};

test.describe('Страница "Конструктор"', () => {
  test.beforeEach(async ({ page }) => {

    await page.goto('/');
    await page.waitForSelector(SELECTORS.INGREDIENT_CARD, { timeout: 10000 });
  });

  test.describe('Перетаскивание ингредиентов', () => {
    test('должен добавлять булку в конструктор при перетаскивании', async ({ page }) => {
      const bun = getIngredientByText(page, INGREDIENTS.BUN_CRATOR);
      const dropZone = page.locator(SELECTORS.CONSTRUCTOR_DROP_ZONE_BUN).first();
      
      await bun.dragTo(dropZone);
      await expect(dropZone).toContainText(INGREDIENTS.BUN_CRATOR);
    });

    test('должен добавлять ингредиент в конструктор при перетаскивании', async ({ page }) => {
      const ingredient = getIngredientByText(page, INGREDIENTS.SAUCE_SPICY_X);
      const dropZone = page.locator(SELECTORS.CONSTRUCTOR_DROP_ZONE);
      
      await ingredient.dragTo(dropZone);
      
      const ingredientItem = dropZone.first();
      await expect(ingredientItem).toContainText(INGREDIENTS.SAUCE_SPICY_X);
    });

    test('должен обновлять общую стоимость при добавлении ингредиентов', async ({ page }) => {
      const dropZone = page.locator(SELECTORS.CONSTRUCTOR_DROP_ZONE);
      const initialPrice = await page.locator(SELECTORS.TOTAL_PRICE).textContent();
      
      const ingredient = getIngredientByText(page, INGREDIENTS.SAUCE_SPICY_X);
      await ingredient.dragTo(dropZone);

      
      
      const newPrice = await page.locator(SELECTORS.TOTAL_PRICE).textContent();
      expect(newPrice).not.toBe(initialPrice);
    });

    test('должен заменять булку при добавлении новой', async ({ page }) => {
      const bun1 = getIngredientByText(page, INGREDIENTS.BUN_CRATOR);
      const dropZone = page.locator(SELECTORS.CONSTRUCTOR_DROP_ZONE_BUN).first();
      
      await bun1.dragTo(dropZone);
      await expect(dropZone).toContainText(INGREDIENTS.BUN_CRATOR);
      
      const bun2 = getIngredientByText(page, INGREDIENTS.BUN_FLUORESCENT);
      await bun2.dragTo(dropZone);
      
      await expect(dropZone).toContainText(INGREDIENTS.BUN_FLUORESCENT);
    });
  });

  test.describe('Создание заказа', () => {
    test('должен создавать заказ при нажатии на кнопку', async ({ page }) => {

      await page.addInitScript(() => {
        localStorage.setItem('accessToken', 'Bearer mock-token');
        localStorage.setItem('refreshToken', 'mock-refresh-token');
      });

      const authHarPath = path.join(__dirname, 'fixtures', 'auth-user.har');
      await page.routeFromHAR(authHarPath, {
          url: '**/auth/user',
          update: false,
      });

      const ordersHarPath = path.join(__dirname, 'fixtures', 'orders.har');
      await page.routeFromHAR(ordersHarPath, {
          url: '**/orders',
          update: false,
      });
      await page.goto('/');
      await page.waitForSelector(SELECTORS.INGREDIENT_CARD, { timeout: 10000 });
      
      const bun = getIngredientByText(page, INGREDIENTS.BUN_CRATOR);
      const dropZone = page.locator(SELECTORS.CONSTRUCTOR_DROP_ZONE_BUN).first();
      await bun.dragTo(dropZone);
      
      const ingredient = getIngredientByText(page, INGREDIENTS.FILLET_TETRAODON);
      const ingredientsDropZone = page.locator(SELECTORS.CONSTRUCTOR_DROP_ZONE);
      await ingredient.dragTo(ingredientsDropZone);

      const orderButton = page.locator('button', { hasText: BUTTONS.ORDER });

      await orderButton.click();
      const afterClickUrl = page.url();
      console.log('📍 URL после клика:', afterClickUrl);
      
      const modal = page.locator(SELECTORS.MODAL);
      await expect(modal).toBeVisible({ timeout: 10000 });

      const orderNumber = page.locator(SELECTORS.MODAL_TITLE);
      await expect(orderNumber).toBeVisible({ timeout: 10000 });
      
      const numberText = await orderNumber.textContent();
      expect(numberText).toMatch(/^\d+$/);
    });

    test('кнопка "Оформить заказ" должна быть disabled без булки', async ({ page }) => {
      const ingredient = getIngredientByText(page, INGREDIENTS.FILLET_TETRAODON);
      const ingredientsDropZone = page.locator(SELECTORS.CONSTRUCTOR_DROP_ZONE);
      await ingredient.dragTo(ingredientsDropZone);
      
      const orderButton = page.locator('button', { hasText: BUTTONS.ORDER });
      await expect(orderButton).toBeDisabled();
    });
  });
});