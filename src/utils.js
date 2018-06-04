import path from 'path';

function getStoryshotFile(fileName) {
  const { dir, name } = path.parse(fileName);
  return path.format({ dir: path.join(dir, '__snapshots__'), name, ext: '.storyshot' });
}

export function getPossibleStoriesFiles(storyshotFile) {
  const { dir, name } = path.parse(storyshotFile);

  return [
    path.format({ dir: path.dirname(dir), name, ext: '.js' }),
    path.format({ dir: path.dirname(dir), name, ext: '.jsx' }),
    path.format({ dir: path.dirname(dir), name, ext: '.ts' }),
    path.format({ dir: path.dirname(dir), name, ext: '.tsx' }),
  ];
}

export function getSnapshotFileName(context) {
  const { fileName } = context;

  if (!fileName) {
    return null;
  }

  return getStoryshotFile(fileName);
}
