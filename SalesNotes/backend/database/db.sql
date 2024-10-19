
CREATE DATABASE IF NOT EXISTS notes;

USE notes;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    company_name VARCHAR(255) NOT NULL
);

CREATE TABLE clients (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE notebooks (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    client_id INT NOT NULL,
    created_date DATE NOT NULL,
    FOREIGN KEY (client_id) REFERENCES clients(id)
);

CREATE TABLE notes (
    id SERIAL PRIMARY KEY,
    quantity_items INT NOT NULL,
    description VARCHAR(255) NOT NULL,
    unit_price DECIMAL(10, 2) NOT NULL,
    subtotal_price DECIMAL(10, 2) NOT NULL,
    notebook_id INT NOT NULL,
    client_id INT NOT NULL,
    FOREIGN KEY (notebook_id) REFERENCES notebooks(id),
    FOREIGN KEY (client_id) REFERENCES clients(id)
);

ALTER TABLE clients
ADD CONSTRAINT fk_user
FOREIGN KEY (user_id)
REFERENCES users(id),
ADD CONSTRAINT fk_notebook
FOREIGN KEY (notebook_id)
REFERENCES notebooks(id);

ALTER TABLE clients
ADD CONSTRAINT fk_clients_user_id
FOREIGN KEY (user_id) REFERENCES users(id);

ALTER TABLE clients
ADD CONSTRAINT fk_clients_notebook_id
FOREIGN KEY (notebook_id) REFERENCES notebooks(id);

ALTER TABLE notebooks
ADD CONSTRAINT fk_notebooks_client_id
FOREIGN KEY (client_id) REFERENCES clients(id);

