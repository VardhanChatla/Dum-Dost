import { useEffect, useRef, useState } from "react";
import { dishes, freebies } from "../data/dishes";
import { useOrder } from "../order/useOrder";
import { dishPrice, parseLineItemKey, portionLabel } from "../order/lineItem";
import {
  getMinDeliveryDate,
  toDatetimeLocalValue,
  MIN_LEAD_MINUTES,
  formatLeadTime,
} from "../lib/deliveryTime";
import { FREE_DELIVERY_THRESHOLD } from "../lib/deliveryFee";
import { useRipple } from "../hooks/useRipple";
import AddOns from "./AddOns";

export default function OrderSummaryModal() {
  const {
    quantities,
    freebieQuantities,
    totalCount,
    totalPrice,
    deliveryFee,
    grandTotal,
    addItem,
    removeItem,
    deliveryTime,
    setDeliveryTime,
    isDeliveryTimeValid,
    whatsAppLink,
    summaryOpen,
    closeSummary,
  } = useOrder();
  const onRipple = useRipple();
  const [showTimeError, setShowTimeError] = useState(false);
  const deliveryInputRef = useRef<HTMLInputElement>(null);

  const minDeliveryValue = toDatetimeLocalValue(getMinDeliveryDate());
  const minLeadLabel = formatLeadTime(MIN_LEAD_MINUTES);

  useEffect(() => {
    if (!summaryOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeSummary();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [summaryOpen, closeSummary]);

  useEffect(() => {
    if (summaryOpen && !deliveryTime) {
      setDeliveryTime(toDatetimeLocalValue(getMinDeliveryDate()));
    }
  }, [summaryOpen, deliveryTime, setDeliveryTime]);

  if (!summaryOpen) return null;

  const lineItems = Object.entries(quantities)
    .filter(([, qty]) => qty > 0)
    .map(([key, qty]) => {
      const { dishId, portion } = parseLineItemKey(key);
      const dish = dishes.find((d) => d.id === dishId);
      return dish ? { key, dish, portion, qty } : null;
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  const freebieItems = Object.entries(freebieQuantities)
    .filter(([, qty]) => qty > 0)
    .map(([key, qty]) => {
      const freebie = freebies.find((f) => f.id === key);
      return freebie ? { key, freebie, qty } : null;
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  return (
    <div className="summary-overlay" onClick={closeSummary}>
      <div
        className="summary-card"
        role="dialog"
        aria-modal="true"
        aria-label="Your order"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="summary-card__header">
          <h2>Your Order</h2>
          <button
            type="button"
            className="summary-card__close"
            aria-label="Close order summary"
            onClick={closeSummary}
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="summary-card__scroll">
          {lineItems.length === 0 ? (
            <div className="summary-card__empty">
              <span className="material-symbols-outlined">ramen_dining</span>
              <p>Your order is empty. Add a biryani to get started!</p>
            </div>
          ) : (
            <>
              <div className="delivery-section">
                <h3 className="delivery-section__title">Delivery time</h3>
                <p className="delivery-section__hint">
                  We need at least {minLeadLabel} to prep & deliver — pick a
                  time that works.
                </p>
                <input
                  ref={deliveryInputRef}
                  type="datetime-local"
                  className={`delivery-input ${showTimeError && !isDeliveryTimeValid ? "is-invalid" : ""}`}
                  value={deliveryTime}
                  min={minDeliveryValue}
                  aria-label="Delivery date and time"
                  onChange={(e) => {
                    setDeliveryTime(e.target.value);
                    setShowTimeError(false);
                  }}
                />
                {showTimeError && !isDeliveryTimeValid && (
                  <p className="delivery-section__error">
                    Please choose a delivery time at least {minLeadLabel} from
                    now.
                  </p>
                )}
              </div>

              <div className="summary-card__list">
                {lineItems.map(({ key, dish, portion, qty }) => {
                  const unitPrice = dishPrice(dish, portion);
                  return (
                    <div className="summary-item" key={key}>
                      <img
                        src={dish.image}
                        alt={dish.name}
                        className="summary-item__image"
                      />
                      <div className="summary-item__info">
                        <strong>{dish.name}</strong>
                        <span className="summary-item__portion">
                          {portionLabel(portion)} · ₹{unitPrice} each
                        </span>
                      </div>
                      <div className="summary-item__controls">
                        <div className="order-bar__stepper">
                          <button
                            type="button"
                            aria-label={`Remove one ${dish.name} ${portionLabel(portion)}`}
                            onClick={() => removeItem(key)}
                          >
                            <span className="material-symbols-outlined">
                              remove
                            </span>
                          </button>
                          <span>{qty}</span>
                          <button
                            type="button"
                            aria-label={`Add one ${dish.name} ${portionLabel(portion)}`}
                            onClick={() => addItem(dish.id, portion)}
                          >
                            <span className="material-symbols-outlined">
                              add
                            </span>
                          </button>
                        </div>
                        <span className="summary-item__line-price">
                          ₹{unitPrice * qty}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {freebieItems.length > 0 && (
                <div className="freebie-section">
                  <h3 className="freebie-section__title">
                    <span className="material-symbols-outlined" aria-hidden="true">
                      redeem
                    </span>
                    Freebies
                  </h3>
                  <div className="freebie-list">
                    {freebieItems.map(({ key, freebie, qty }) => (
                      <div className="freebie-card" key={key}>
                        <span className="freebie-card__name">
                          {freebie.name} ×{qty}
                        </span>
                        <span className="freebie-card__tag">FREE</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <AddOns />

              <div
                className={`delivery-fee-note ${deliveryFee === 0 ? "is-free" : ""}`}
              >
                <span className="material-symbols-outlined" aria-hidden="true">
                  local_shipping
                </span>
                <p>
                  {deliveryFee > 0 ? (
                    <>
                      A <strong>₹{deliveryFee}</strong> delivery fee applies on
                      orders under ₹{FREE_DELIVERY_THRESHOLD}. Add{" "}
                      <strong>₹{FREE_DELIVERY_THRESHOLD - totalPrice}</strong>{" "}
                      more for free delivery.
                    </>
                  ) : (
                    <>
                      You've unlocked <strong>free delivery</strong> on this
                      order!
                    </>
                  )}
                </p>
              </div>
            </>
          )}
        </div>

        <div className="summary-card__footer">
          <div className="summary-card__total">
            <div className="summary-card__total-row">
              <span>
                {totalCount} item{totalCount === 1 ? "" : "s"}
              </span>
              <span>₹{totalPrice}</span>
            </div>
            <div className="summary-card__total-row">
              <span>Delivery charges</span>
              <span>{deliveryFee > 0 ? `₹${deliveryFee}` : "Free"}</span>
            </div>
            <div className="summary-card__total-row summary-card__total-row--grand">
              <span>Overall total</span>
              <strong>₹{grandTotal}</strong>
            </div>
          </div>
          <a
            className={`btn btn--primary btn--large ripple-btn ${lineItems.length === 0 ? "is-disabled" : ""}`}
            href={whatsAppLink}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => {
              if (lineItems.length === 0) {
                e.preventDefault();
                return;
              }
              if (!isDeliveryTimeValid) {
                e.preventDefault();
                setShowTimeError(true);
                deliveryInputRef.current?.focus();
                return;
              }
              onRipple(e);
            }}
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              chat
            </span>
            Send Order on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
