CREATE USER beer_alerts WITH ENCRYPTED PASSWORD 'beer_alerts';
CREATE DATABASE beer_alerts;
\connect beer_alerts
CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;
GRANT ALL PRIVILEGES ON DATABASE beer_alerts TO beer_alerts;