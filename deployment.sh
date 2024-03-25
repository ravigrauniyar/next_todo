#!/bin/bash

# Set the image and container names
TODO_IMAGE_NAME="next_todo"
TODO_CONTAINER_NAME="todo_container"

# Check if the Todo Docker image exists
if ! sudo docker image inspect "$TODO_IMAGE_NAME" &> /dev/null; then
    echo "Docker image $TODO_IMAGE_NAME not found. Building..."
    sudo docker build -t "$TODO_IMAGE_NAME" .
fi

# Check if the Todo Docker container is already running
if sudo docker ps -a --format '{{.Names}}' | grep -Eq "^$TODO_CONTAINER_NAME$"; then
    echo "Container $TODO_CONTAINER_NAME is already running."
else
    # Check if the Todo Docker container exists but is stopped
    if sudo docker ps -a --format '{{.Names}}' | grep -Eq "^$TODO_CONTAINER_NAME$"; then
        echo "Container $TODO_CONTAINER_NAME exists but stopped. Starting..."
        sudo docker start "$TODO_CONTAINER_NAME"
    fi
fi

# Run the Todo Docker container
echo "Running container $TODO_CONTAINER_NAME from image $TODO_IMAGE_NAME..."
sudo docker run -d -p 3000:3000 --name "$TODO_CONTAINER_NAME" "$TODO_IMAGE_NAME"
