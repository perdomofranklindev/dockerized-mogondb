# Instructions

Initializing the Replica Set:

1. Generate authentication key file `bash setup.sh`
2. Start the containers: `docker-compose up -d`
3. Bash into one container: `docker exec -it mongo1 bash`
4. Run `mongosh -u root -p example`
5. Initiate the replica set using:
   ```bash
    rs.initiate(
    {
        _id: "rs0",
        version: 1,
        members: [
            { _id: 0, host: "mongo1:27017" },
            { _id: 1, host: "mongo2:27018" },
            { _id: 2, host: "mongo3:27019" }
        ]
    })
   ```

## Problems with connection?

Disclaimer this only was tested on Linux Ubuntu 23, I don't know how are the steps on Windows or macOS.

1. Open a terminal window.
2. Type `sudo nano /etc/hosts` (or you can use any other text editor you prefer).
3. Add the following lines at the end of the file:
   ```bash
    111.222.32.2 mongo1
    111.222.32.3 mongo2
    111.222.32.4 mongo3
   ```
4. Save the file and exit the editor.
5. After saving the changes, try connecting again with the replica set connection string.

### Inspect the IP container

```bash
docker inspect \
  -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' container_name_or_id
```

### Why is this required?

The local machine doesn’t automatically resolve the hostnames for your MongoDB containers because Docker’s networking operates somewhat independently from your host machine’s networking. When you use localhost in your connection string, it refers to the loopback network interface of your host machine, which is why it works without additional configuration.

- **Direct Connection**: When you use `mongodb://root:example@localhost:27017/?directConnection=true`, you’re instructing the MongoDB client to connect directly to a single MongoDB instance running on your local machine’s loopback interface (localhost) on port 27017. This bypasses the need for replica set discovery and doesn’t require hostname resolution, which is why it works without modifying the `/etc/hosts` file.
- **Replica Set Connection**: When you include the replica set parameter in the URL (`mongodb://user:password@mongo1:27017,mongo2:27018,mongo3:27019/?replicaSet=rs0`), you’re telling the MongoDB client to connect to a set of MongoDB instances that are part of a replica set named rs0. The client then attempts to resolve the hostnames (mongo1, mongo2, mongo3) to their IP addresses to communicate with the other members of the replica set. If the Docker DNS service isn’t resolving these hostnames automatically, the connection will fail until you provide a way for the system to resolve them, such as editing the `/etc/hosts` file.

When you include the replica set parameter in the URL (`mongodb://user:password@mongo1:27017,mongo2:27018,mongo3:27019/?replicaSet=rs0`), you’re telling the MongoDB client to connect to a set of MongoDB instances that are part of a replica set named rs0. The client then attempts to resolve the hostnames (mongo1, mongo2, mongo3) to their IP addresses to communicate with the other members of the replica set. If the Docker DNS service isn’t resolving these hostnames automatically, the connection will fail until you provide a way for the system to resolve them, such as editing the `/etc/hosts` file.

## How would be this on production environment?

Well, you have to figure it out, probably the providers already offer this solution.

## Connection string

```bash
mongodb://root:example@localhost:27017,localhost:27018,localhost:27019/?replicaSet=rs0
```

## Reference

[https://medium.com/@JosephOjo/mongodb-replica-set-with-docker-compose-5ab95c02af0d](https://medium.com/@JosephOjo/mongodb-replica-set-with-docker-compose-5ab95c02af0d)
