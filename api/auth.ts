import { withErrors, readBody } from '../server/http.ts';
import {
  assertNotThrottled,
  checkPassword,
  clearSessionCookie,
  clientKey,
  createSessionToken,
  isAuthConfigured,
  isAuthenticated,
  registerFailure,
  setSessionCookie,
} from '../server/auth.ts';

export default withErrors(async (req, res) => {
  if (req.method === 'GET') {
    res.status(200).json({
      authenticated: isAuthenticated(req),
      configured: isAuthConfigured(),
    });
    return;
  }

  if (req.method === 'POST') {
    const { password } = readBody<{ password?: string }>(req);
    const key = clientKey(req);

    assertNotThrottled(key);

    if (!checkPassword(password ?? '')) {
      registerFailure(key);
      res.status(401).json({ error: 'Incorrect password.' });
      return;
    }

    setSessionCookie(res, createSessionToken());
    res.status(200).json({ authenticated: true });
    return;
  }

  if (req.method === 'DELETE') {
    clearSessionCookie(res);
    res.status(200).json({ authenticated: false });
    return;
  }

  res.status(405).json({ error: 'Method not allowed.' });
});
