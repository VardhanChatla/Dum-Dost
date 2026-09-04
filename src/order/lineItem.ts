import type { Dish, Portion } from '../data/dishes'

export function lineItemKey(dishId: string, portion: Portion): string {
  return `${dishId}__${portion}`
}

export function parseLineItemKey(key: string): { dishId: string; portion: Portion } {
  const [dishId, portion] = key.split('__')
  return { dishId, portion: portion === 'half' ? 'half' : 'full' }
}

export function portionLabel(portion: Portion): string {
  return portion === 'half' ? 'Half' : 'Full'
}

export function dishPrice(dish: Dish, portion: Portion): number {
  return portion === 'half' ? dish.priceHalf : dish.priceFull
}
