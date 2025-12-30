# Security

If you discover a security vulnerability in this project, please report it by opening an issue labeled "security" or by contacting the repository maintainers directly. Do not include sensitive details in a public issue; the maintainers will request any necessary details privately.

Security best practices included in this repository:
- HTTP security headers via `vercel.json` (CSP, HSTS, X-Frame-Options, etc.)
- Dependabot configured to update npm dependencies weekly
- GitHub Actions running CodeQL analysis and `npm audit`

For critical vulnerabilities, please add details including steps to reproduce and affected versions.
