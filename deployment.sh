#!/bin/bash

# Set the image name and container name
IMAGE_NAME="next_todo"
CONTAINER_NAME="todo_container"

# Check if the Docker image exists
if ! sudo docker image inspect "$IMAGE_NAME" &> /dev/null; then
    echo "Docker image $IMAGE_NAME not found. Building..."
    sudo docker build -t "$IMAGE_NAME" .
fi

# Check if the Docker container is already running
if sudo docker ps -a --format '{{.Names}}' | grep -Eq "^$CONTAINER_NAME$"; then
    echo "Container $CONTAINER_NAME is already running."
    exit 1
fi

# Check if the Docker container exists but stopped
if sudo docker ps -a --format '{{.Names}}' | grep -Eq "^$CONTAINER_NAME$"; then
    echo "Container $CONTAINER_NAME exists but stopped. Starting..."
    sudo docker start "$CONTAINER_NAME"
    exit 0
fi

# Run the Docker container
echo "Running container $CONTAINER_NAME from image $IMAGE_NAME..."
sudo docker run -d -p 3000:3000 --name "$CONTAINER_NAME" "$IMAGE_NAME"

