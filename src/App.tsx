import { CourierProvider } from "@trycourier/react-provider";
import { Inbox } from "@trycourier/react-inbox";

/**
 * A JWT from POST https://api.courier.com/auth/issue-token, hardcoded here so the
 * sample runs with no backend. In a real app you mint this on your own server and
 * hand the browser only the token — the API key that signs it never ships to the client.
 */
const COURIER_JWT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZSI6InVzZXJfaWQ6bWlrZSBpbmJveDpyZWFkOm1lc3NhZ2VzIGluYm94OndyaXRlOmV2ZW50cyIsInRlbmFudF9zY29wZSI6InB1Ymxpc2hlZC9lbnZfMDFtMWhmMXc3ZmZlcnRwNzJ5MWc2Z2dqd2YiLCJ0ZW5hbnRfaWQiOiJ3cmtfMDFtMWhmMXYxM2U4bWFyY3NudzJqYW53cnEvZW52XzAxbTFoZjF3N2ZmZXJ0cDcyeTFnNmdnandmIiwiaWF0IjoxNzg4MzY3MDY3LCJleHAiOjE3ODg3OTkwNjcsImp0aSI6IjIyMWU4N2U2LWI0YTgtNGM5Mi1iYjhmLWY2ZDIxMjYyZDFlYyJ9.kPFC1BZMk0DMq3K_3qfn-bhcigjLV4eT9CxVHX4NPDM";

// Scopes baked into the token above:
//   user_id:mike            — whose inbox this is; every token needs a user_id: entry
//   inbox:read:messages     — read the message list and unread count
//   inbox:write:events      — mark read/unread, archive, click tracking
// Expires 2026-09-07 (issued with "expires_in": "5 days").

const USER_ID = "mike";

export default function App() {
  return (
    <CourierProvider userId={USER_ID} authorization={COURIER_JWT}>
      <div className="page">
        <div className="bar">
          <strong>Courier React SDK v6</strong>
          <Inbox />
        </div>
        <p className="status">
          Authenticated as <code>{USER_ID}</code> with a hardcoded JWT.
        </p>
      </div>
    </CourierProvider>
  );
}
