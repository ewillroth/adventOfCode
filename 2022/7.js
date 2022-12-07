const fs = require('fs');

const input = fs.readFileSync('./2022/7_input.txt', 'utf-8');

const testInput = `
$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k
`;

const parseCommands = (input) => {
  const dirs = {
    '~': {
      parent: null,
      childDirs: [],
      files: [],
      size: 0,
    },
  };

  const dirList = ['~'];

  const testCommands = input.trim().split('\n');

  let path = '~';

  testCommands.forEach((command) => {
    if (command === '$ cd /') {
      // move to root
      path = '~';
    } else if (command === '$ cd ..') {
      // move to parent
      if (path === '~') {
        return;
      }
      const newPath = path.split('/').slice(0, -1).join('/');
      path = newPath;
    } else if (command.includes('$ cd ')) {
      // move down to child dir
      path = `${path}/${command.split(' ')[2]}`;
    } else if (command === '$ ls') {
      // ls
      return;
    } else if (command.includes('dir ')) {
      // child dir
      const dirName = command.split(' ')[1];
      if (!dirs[`${path}/${dirName}`]) {
        dirs[`${path}/${dirName}`] = {
          childDirs: [],
          files: [],
          size: 0,
        };
        dirList.push(`${path}/${dirName}`);
        dirs[path].childDirs.push(`${path}/${dirName}`);
      } else {
        return;
      }
    } else {
      // file
      const [fileSize, fileName] = command.split(' ');
      if (dirs[path]) dirs[path].files.push({ fileName, fileSize: +fileSize });
    }
  });

  return [dirs, dirList];
};

const addSizes = (dirList, dirs) => {
  const queue = [...dirList];
  let newDirs = JSON.parse(JSON.stringify(dirs));

  while (queue.length > 0) {
    const dirPath = queue.pop();
    const { size, childDirs, files } = newDirs[dirPath];
    if (size === 0 && childDirs.length === 0) {
      // if this is a dir at the bottom level, calculate it's size
      const newSize = files
        .map((file) => file.fileSize)
        .reduce((prev, current) => prev + current, 0);
      newDirs[dirPath].size = newSize;
    } else if (size !== 0) {
      return;
    } else if (
      childDirs.filter((dir) => +newDirs[dir].size === 0).length === 0
    ) {
      // all childDirs have a size, so we can size now
      const fileSize = files
        .map((file) => file.fileSize)
        .reduce((prev, current) => prev + current, 0);
      const childDirSize = childDirs
        .map((dir) => newDirs[dir].size)
        .reduce((prev, current) => prev + current, 0);
      newDirs[dirPath].size = fileSize + childDirSize;
    } else {
      queue.unshift(dirPath);
    }
  }
  return newDirs;
};

const testCase = () => {
  const [dirs, dirList] = parseCommands(testInput);
  const withSizes = addSizes(dirList, dirs);
  const total = Object.keys(withSizes)
    .filter((dirName) => withSizes[dirName].size <= 100000)
    .map((dirName) => +withSizes[dirName].size)
    .reduce((prev, current) => prev + current, 0);
  console.log('test', total);
};

const partOne = () => {
  const [dirs, dirList] = parseCommands(input);
  const withSizes = addSizes(dirList, dirs);
  const total = Object.keys(withSizes)
    .filter((dirName) => +withSizes[dirName].size <= 100000)
    .map((dirName) => +withSizes[dirName].size)
    .reduce((prev, current) => prev + current, 0);
  console.log('part 1', total);
};

// total disk size: 70000000
// target unused space: 30000000

const partTwo = () => {
  const [dirs, dirList] = parseCommands(input);
  const withSizes = addSizes(dirList, dirs);
  const totalDiskSize = 70000000;
  const usedDiskSpace = withSizes['~'].size; // 43636666
  const currentUnused = totalDiskSize - usedDiskSpace; // 26363334
  const targetToDelete = 30000000 - currentUnused; // 3636666
  const sorted = Object.keys(withSizes)
    .filter((dir) => withSizes[dir].size > targetToDelete)
    .sort((a, b) => withSizes[a].size - withSizes[b].size)
    .map((dir) => {
      return { name: dir, size: withSizes[dir].size };
    });
  console.log('part 2', sorted[0].size);
};

testCase();
partOne();
partTwo();
