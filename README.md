# Installation
Run this on terminal to install all the packages
```
yarn install
```

# Migration

Run this on terminal to migrate database
```
sequelize-auto -h <hostname> -d <dbname> -u <user> -x [pw] -p [port] --dialect mysql -l esm -c -o src/models
```

Add this config to users.js file

```
toJSON () {
    const PROTECTED_ATTRIBUTES = ['password'];

    // Hide protected fields
    let attributes = Object.assign({}, this.get())
    for (let a of PROTECTED_ATTRIBUTES) {
        delete attributes[a]
    }
    return attributes
}
```
below this line to hide protected information
```
export default class users extends Model {
```