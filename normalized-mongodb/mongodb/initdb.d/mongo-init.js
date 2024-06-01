db = db.getSiblingDB('db');

db.createUser({
	user: 'root',
	pwd: 'password',
	roles: [
		{
			role: 'readWrite',
			db: 'db'
		}
	]
});

db.createCollection('delete_me');