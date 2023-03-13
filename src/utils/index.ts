export function convertListFileToObjectParentTree(list: any[]) {
  const obj = {};
  
  list.forEach((item: { webkitRelativePath: string; }) => {
    const splitPath = item.webkitRelativePath.split('/');
		
    if (splitPath.length === 1) {
      obj[splitPath[0]] = splitPath[0];
    } else {
      let tempPointer = obj;
      let i = 0;
      while(i < splitPath.length - 1) {
      	if (tempPointer[splitPath[i]]) {
						tempPointer = tempPointer[splitPath[i]];
				} else {
          tempPointer[splitPath[i]] = {};
          tempPointer = tempPointer[splitPath[i]];
        }
        i++;
      }
      tempPointer[item.webkitRelativePath] = null;
    }
  });
  return obj;
};

export const readTemplate = (template, data) => {
  for (const [key, value] of Object.entries(template)) {
    data[key] = {
      index: key,
      canMove: true,
      isFolder: value !== null,
      children: value !== null ? Object.keys(value || {}) : undefined,
      data: key,
      canRename: true
    };

    if (value !== null) {
      readTemplate(value, data);
    }
  }
  return data;
};
