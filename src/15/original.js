function getPaths(path, paths, max) {
  // Get the last point in the path, eg: '4,7'
  const point = path.slice(-1)[0];
  const pathStr = getPathStr(path);
  const pathValue = paths[pathStr];

  if (point === max) {
    console.log("STOP!!");
    return paths;
  }

  const nextPoints = getNextPoints(...point.split(",").map(toInt));

  // Remove the old path
  delete paths[pathStr];

  nextPoints.forEach((p) => {
    const pointStr = getPointStr(...p);
    const newPath = [...path, pointStr];
    const value = getPointValue(...p);
    const newPathStr = newPath.join("-");

    // Add the new path and increment the value
    paths[newPathStr] = pathValue + value;

    if (pointStr !== max) {
      paths = getPaths(newPath, paths, max);
    }
  });

  return paths;
}
