db = db.getSiblingDB('db');

db.createUser({
	user: 'root',
	pwd: 'example',
	roles: [
		{
			role: 'readWrite',
			db: 'db'
		}
	]
});

db.createCollection('delete_me');