# ZNS

The ZNS storefront: an animated home page, a shop page for each category, product pages, a saved cart, members-only Exclusive drops and Stripe checkout.

## Run it on your computer

```
npm install
npm run dev
```

Then open http://localhost:3000.

## Turn on checkout

1. Create a free account at https://stripe.com.
2. Copy your secret key from https://dashboard.stripe.com/apikeys (use the `sk_test_...` one while testing).
3. Copy `.env.example` to a new file called `.env.local` and paste the key after `STRIPE_SECRET_KEY=`.
4. Restart `npm run dev`. Pay with the test card 4242 4242 4242 4242, any future date and any CVC.
5. On Vercel, add the same `STRIPE_SECRET_KEY` under Project → Settings → Environment Variables, then redeploy.

## Where things live

| What | File |
| --- | --- |
| Products, prices, categories, sizes | `lib/catalog.js` |
| Home animation | `components/hero-engine.js` |
| Header, footer, cart drawer | `components/Header.js`, `Footer.js`, `CartDrawer.js` |
| Category pages | `app/shop/[category]/...` |
| Product page | `app/products/[id]/page.js` |
| Members page | `app/exclusive/page.js`, `components/ExclusiveGate.js` |
| Checkout | `app/api/checkout/route.js` |
| Terms and support text | `components/InfoText.js` |
| Styles | `app/globals.css` |

## Still placeholder

- Product photos (grey silhouettes in `components/ProductImage.js`)
- Terms text and the support email address (`components/InfoText.js`)
- Members and the Exclusive List are saved only in each visitor's browser. Replace them with real accounts before relying on them.
