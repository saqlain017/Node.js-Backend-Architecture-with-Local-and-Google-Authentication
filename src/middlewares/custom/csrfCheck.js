export const csrfCheck = (req, res, next) => {
    const tokenFromBody = req.body.csrfToken;
    const tokenFromSession = req.session?.csrfToken;
  
    if (!tokenFromSession || tokenFromBody !== tokenFromSession) {
      return res.status(403).json({
        errors: [
          {
            title: 'CSRF Token Mismatch',
            detail: 'CSRF token validation failed.',
          },
        ],
      });
    }
    next();
  };
  