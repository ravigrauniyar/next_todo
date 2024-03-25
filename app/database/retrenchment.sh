#!/bin/bash

# Define variables for PostgreSQL image and container names
PG_IMAGE_NAME="next_pg_db"
PG_CONTAINER_NAME="todo_pg_container"

# Print message indicating the container is being stopped
echo "Stopping container $PG_CONTAINER_NAME..."

# Stop the PostgreSQL container
sudo docker stop "$PG_CONTAINER_NAME"

# Remove the stopped PostgreSQL container
sudo docker rm "$PG_CONTAINER_NAME"

# Remove the PostgreSQL Docker image
sudo docker rmi "$PG_IMAGE_NAME"