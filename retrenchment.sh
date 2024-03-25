#!/bin/bash

# Set the container name
TODO_IMAGE_NAME="next_todo"
TODO_CONTAINER_NAME="todo_container"

# Print message indicating the container is being stopped
echo "Stopping container $TODO_CONTAINER_NAME..."

# Stop the Docker container
sudo docker stop "$TODO_CONTAINER_NAME"

# Print message indicating the container is being removed
echo "Removing container $TODO_CONTAINER_NAME..."

# Remove the Docker container
sudo docker rm "$TODO_CONTAINER_NAME"

# Remove the Docker image
sudo docker rmi "$TODO_IMAGE_NAME"
