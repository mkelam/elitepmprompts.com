/**
 * PayFast Integration for Static Site
 *
 * Flow:
 * 1. User clicks "Buy" → we build a form with PayFast fields
 * 2. Form POSTs to PayFast's hosted payment page
 * 3. User completes payment on PayFast
 * 4. PayFast redirects back to our return_url with payment confirmation
 * 5. We store the purchase in localStorage on the return page
 *
 * PayFast docs: https://developers.payfast.co.za/docs
 *
 * For testing, use sandbox:
 *   - URL: https://sandbox.payfast.co.za/eng/process
 *   - merchant_id: 10000100
 *   - merchant_key: 46f0cd694581a
 *
 * For production:
 *   - URL: https://www.payfast.co.za/eng/process
 *   - Use your real merchant_id and merchant_key
 */

const PAYFAST_SANDBOX_URL = "https://sandbox.payfast.co.za/eng/process";
const PAYFAST_LIVE_URL = "https://www.payfast.co.za/eng/process";

// Toggle this for production
const IS_SANDBOX = process.env.NEXT_PUBLIC_PAYFAST_SANDBOX === "true";

const PAYFAST_URL = IS_SANDBOX ? PAYFAST_SANDBOX_URL : PAYFAST_LIVE_URL;

// Merchant credentials (set via environment variables)
const MERCHANT_ID = process.env.NEXT_PUBLIC_PAYFAST_MERCHANT_ID || "10000100";
const MERCHANT_KEY = process.env.NEXT_PUBLIC_PAYFAST_MERCHANT_KEY || "46f0cd694581a";

// Site URL for return/cancel redirects
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://elitepmprompts.com";

export interface PayFastPaymentData {
  itemName: string;
  itemDescription: string;
  amount: number; // In ZAR (or USD — PayFast handles currency)
  blueprintId: string;
  email?: string;
  returnPath?: string; // Override return path (e.g., '/blueprints' for suite)
}

export function initiatePayFastPayment(data: PayFastPaymentData): void {
  // For suite purchases, return to /blueprints catalog; for singles, return to detail page
  const returnPath = data.returnPath || `/blueprints/${data.blueprintId}`;

  // Build form data
  const formData: Record<string, string> = {
    merchant_id: MERCHANT_ID,
    merchant_key: MERCHANT_KEY,
    return_url: `${SITE_URL}${returnPath}?payment=success&blueprint=${data.blueprintId}`,
    cancel_url: `${SITE_URL}/pricing?payment=cancelled`,
    item_name: data.itemName,
    item_description: data.itemDescription,
    amount: data.amount.toFixed(2),
    // Optional: pre-fill email
    ...(data.email ? { email_address: data.email } : {}),
    // Custom fields for tracking
    custom_str1: data.blueprintId,
    custom_str2: new Date().toISOString(),
  };

  // Create and submit form
  const form = document.createElement("form");
  form.method = "POST";
  form.action = PAYFAST_URL;

  for (const [key, value] of Object.entries(formData)) {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = key;
    input.value = value;
    form.appendChild(input);
  }

  document.body.appendChild(form);
  form.submit();
}

/**
 * Check URL params on return from PayFast
 * Call this on blueprint detail pages to detect successful payment redirect
 */
export function checkPayFastReturn(): {
  success: boolean;
  blueprintId: string | null;
} {
  if (typeof window === "undefined") {
    return { success: false, blueprintId: null };
  }

  const params = new URLSearchParams(window.location.search);
  const isSuccess = params.get("payment") === "success";
  const blueprintId = params.get("blueprint");

  return { success: isSuccess, blueprintId };
}
