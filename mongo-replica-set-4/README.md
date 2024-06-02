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

Disclaimer this only on Linux Ubuntu 23, I don't know how are the steps on Windows or macOS.

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

## Connection string

```bash
mongodb://root:example@localhost:27017,localhost:27018,localhost:27019/?replicaSet=rs0
```

## Reference

[https://medium.com/@JosephOjo/mongodb-replica-set-with-docker-compose-5ab95c02af0d](https://medium.com/@JosephOjo/mongodb-replica-set-with-docker-compose-5ab95c02af0d)