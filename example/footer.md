# Best practices

Here we are using the footer file to add documentation on best practices while using `apidoc`.
This text is from "footer.md" and is included the same way as the "header.md" file.



## Define & use

For a better readability in the source code, it is recommended to use `@apiDefine` and `@apiUse` as much as possible.



### Naming

You should choose a consistent naming schema, which makes it easier to understand what is defined and included.

E.g. with `@apiUse LoginParam`, `@apiUse LoginError`, `@apiUse LoginSuccess` you see that parameter-, errors- and
success-fields are classified with the suffix `Param`, `Error` and `Success`.



### Example for parameter

```js
/**
 * @apiDefine LoginParam
 * @apiParam {String} username Your e-mail-address.
 * @apiParam {String} password Your password.
 */

/**
 * @apiDefine UserParam
 * @apiParam {String} firstname Your firstname.
 * @apiParam {String} lastname  Your lastname.
 * @apiParam {Date}   birthday  Your birthday.
 */

/**
 * @api {GET} /account/register Register a new user.
 * @apiUse LoginParam
 * @apiUse UserParam
 * @apiParam {Boolean} terms Checkbox to accept the terms.
 */

/**
 * @api {GET} /account/login Signin with an existing user.
 * @apiUse LoginParam
 * @apiParam {Boolean} rememberme Checkbox to auto-login on revisit.
 */
```
Block 1 defines the `LoginParam` with 2 fields, which are required for register and login.
Block 2 defines the `UserParam` with 3 fields, which are required only for register.
Block 3 is the endpoint `/account/register`, which uses parameters from `LoginParam`, `UserParam` and an extra checkbox.
Block 4 is the endpoint `/account/login`, which use only parameters from `LoginParam` and an extra checkbox.



### Example for a group

```js
/**
 * @apiDefine AccountGroup Account endpoints
 *
 * Here is the description for the "AccountGroup".
 * It can contain **markdown** syntax.
 */

/**
 * @api {GET} /account/login Signin with an existing user.
 * @apiGroup AccountGroup
 */
```
Block 1 defines the `AccountGroup` with a title and a description (the following lines).
Block 2 is the endpoint `/account/login`, which belongs to the group `AccountGroup` and inherit from there the title and
description.
`@apiGroup name` only inherit the title and description, while `@apiUse` would inherit all defined fields in a block.
