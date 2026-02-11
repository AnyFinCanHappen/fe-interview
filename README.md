# Front End Interview

### Concepts

#### Tracker

A **Tracker** represents a single object being tracked in a 2D space. Each tracker contains:

- `trackedObjectId`: A unique identifier (string) for the object.
- `x`: The horizontal coordinate (number).
- `y`: The vertical coordinate (number).

#### Trackframe

A **Trackframe** is a data packet that represents a snapshot of all active trackers at a specific point in time. It consists of:

- `tracks`: An array of `Tracker` objects currently detected.
- `timestamp`: An ISO 8601 string indicating when the data was captured.

### WebSocket Integration

The application establishes a persistent connection to the following WebSocket endpoint:
`wss://interview-trackframe-service-1055952109740.us-west1.run.app/v4/trackframes`

#### Message Format

The server streams messages in the following JSON format:

```json
{
  "tracks": [
    {
      "trackedObjectId": "2309112215040011002",
      "x": -54.62782287597656,
      "y": 33.053688049316406
    }
  ],
  "timestamp": "2023-09-11T22:15:04.001Z"
}
```

### Problem 1: Render All Trackers

The goal of this first task is to visualize the data received from the WebSocket.

**Requirements:**

1. **Real-time Rendering**: As each `Trackframe` is received, render all the `Tracker` objects it contains.
2. **SVG Visualization**:
   - Use an SVG element to draw the trackers.
   - Each tracker should be represented by a **circle**.
   - The `x` and `y` coordinates of the tracker should determine the circle's position.
3. **Dynamic Updates**: Ensure the view updates instantly when new data arrives, reflecting the most recent positions of all tracked objects.
4. **Coordinate Normalization**: Scale the raw coordinates from the WebSocket to fit within a 0 to 50 range in the SVG.

### Problem 2: Highlight Trackers in Box

In this second task, you will implement logic to detect if a tracker is within a specific region (the box) and provide visual feedback.

**Requirements:**

1. **Box Detection**: Implement an algorithm to check if a tracker's `(x, y)` coordinates are inside the boundaries of the provided box.
2. **Visual Feedback**:
   - If a tracker is **inside** the box, its color should change to **red**.
   - If a tracker is **outside** the box, its color should be **green**.
3. **Real-time Updates**: The color should change dynamically as trackers move in and out of the box during the live stream.
