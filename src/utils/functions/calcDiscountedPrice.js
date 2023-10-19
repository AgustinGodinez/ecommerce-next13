import React from 'react'

export function calcDiscountedPrice(price, discount) {
  if (!discount) return price.toFixed(2);

  const discountAmount = (price * discount) / 100;
  const finalPrice = price - discountAmount
  const result = finalPrice.toFixed(2)
  return result

}
