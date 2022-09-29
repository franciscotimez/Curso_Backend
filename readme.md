## Backend eCommerce

### Local MongoDB database

```bash
$ docker run --name coder-mongodb -d \
    -e MONGO_INITDB_ROOT_USERNAME=coder-user \
    -e MONGO_INITDB_ROOT_PASSWORD=coder-pass \
    -p 27017:27017 \
    mongo:latest
```

mongodb://coder-user:coder-pass@localhost:27017/ecommerce?authSource=admin