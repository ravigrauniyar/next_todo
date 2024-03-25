#!/bin/bash

PG_IMAGE_NAME="next_pg_db"
PG_CONTAINER_NAME="todo_pg_container"

# Build the PostgreSQL Docker image
echo "Building PostgreSQL image $PG_IMAGE_NAME..."
docker build -t "$PG_IMAGE_NAME" ./app/database
echo "PostgreSQL image built."

# Run the Todo PG container
echo "Running container $PG_CONTAINER_NAME from image $PG_IMAGE_NAME..."
sudo docker run -d -p 5432:5432 --name "$PG_CONTAINER_NAME" "$PG_IMAGE_NAME"
