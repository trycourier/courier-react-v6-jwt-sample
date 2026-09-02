# Courier React SDK v6 + JWT auth

A minimal, working sample of the **legacy** React SDK (`@trycourier/react-inbox` /
`@trycourier/react-provider` v6.4.1) authenticating with a JWT instead of a client key.

```bash
npm install
npm run dev            # http://localhost:5273
```

`src/App.tsx` holds a hardcoded JWT (scopes and expiry documented in a comment right
under it) and renders
`<CourierProvider userId authorization={jwt}><Inbox /></CourierProvider>`. That is the
whole integration.

The token is short-lived and read/write-scoped to one demo user, so the sample runs with
no backend. **In a real app you mint the JWT on your own server** — `/auth/issue-token`
signs it with the API key you pass in the `Authorization` header, and that key must never
reach the browser:

```bash
curl -X POST https://api.courier.com/auth/issue-token \
  -H "Authorization: Bearer $COURIER_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "scope": "user_id:your-user inbox:read:messages inbox:write:events",
    "expires_in": "5 days"
  }'
```

Derive `user_id` from your server-side session, never from the request body.

## Scopes the v6 SDK needs

The v6 Inbox reads and writes through `https://inbox.courier.com/q`, which takes the
`inbox:`-prefixed scopes:

| Call | Scope |
| --- | --- |
| Message list and unread count | `inbox:read:messages` |
| Mark read/unread, archive, click tracking | `inbox:write:events` |

Every token also needs a `user_id:<id>` entry in `scope` — that is what identifies whose
inbox is being read.

Other client calls (brands, preferences, `track`) go to `https://api.courier.com/client/q`
and take the unprefixed `read:messages` / `write:events` / `read:preferences` scopes. The
two families are not interchangeable: a token scoped only for `/client/q` will be refused
by the inbox, and vice versa. Grant both sets if you use both.
