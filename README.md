# Simple JWT authentication

Simple JWT authentication allows you to authenticate user on client side based on provided JSON Web Token.

## Installation

Install with npm

Run `npm install simple-front-jwt-auth` to install the library

## Usage

- To login user use `handleLogin` method

```
import { handleLogin, setLoginCallback } from "simple-front-jwt-auth";

// optionally you can set callback after login
setLoginCallback(() => {
    // do something
});

// login user with token and set token expiration in seconds
handleLogin(token, 3600);
```

- To auto login user use `checkAutologin` method. User will be authenticated only if all the required data is available and the token has not expired. Otherwise user will be logged out

```
import { checkAutologin, setAutologinCallback } from "simple-front-jwt-auth";

// optionally you can set callback after auto login
setAutologinCallback(() => {
    // do something
});

// login user with token and set token expiration in seconds
checkAutologin();
```

- To logout user use `handleLogout` method

```
import { handleLogout, setLogoutCallback } from "simple-front-jwt-auth";

// optionally you can set callback after logout
setLogoutCallback(() => {
    // do something
});

// logout user
handleLogout();
```

- To get user use `getUser` method. This method returns `user` if user is authenticated otherwise `null`

```
import { getUser } from "simple-front-jwt-auth";

// get user
const user = getUser();
```
