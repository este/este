## Workflow

1. Update `/graphcool`
2. `yarn graphcool deploy`
3. `cd ..``
4. `yarn scheme`
5. `yarn relay`

## Tips

* `yarn graphcool invoke-local --function createWeb --json some.json`
* `yarn graphcool playground` In URL, replace `simple` with `relay`.
* To set HTTP HEADERS authorization, use cookie este_auth_token value.

## Links

* [email-password](https://github.com/graphcool/templates/tree/master/auth/email-password)
